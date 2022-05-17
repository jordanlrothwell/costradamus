import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MATTER } from '../../utils/mutations';
import { QUERY_MATTERS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const MatterForm = () => {
  const [reference, setReference] = useState('');

  const [addMatter, { error }] = useMutation(ADD_MATTER, {
    update(cache, { data: { addMatter } }) {
      try {
        const { matters } = cache.readQuery({ query: QUERY_MATTERS });

        cache.writeQuery({
          query: QUERY_MATTERS,
          data: { matters: [addMatter, ...matters] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, matters: [...me.matters, addMatter] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMatter({
        variables: {
          reference,
          matterAuthor: Auth.getProfile().data.username,
        },
      });

      setReference('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'reference') {
      setReference(value);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="reference"
                placeholder="Here's a new matter..."
                value={reference}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Matter
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your matters. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default MatterForm;

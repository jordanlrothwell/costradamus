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
      
    </div>
  )
};

export default MatterForm;

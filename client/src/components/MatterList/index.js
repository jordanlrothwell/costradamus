import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MATTERS } from "../../utils/queries";
import { Link } from "react-router-dom";
import { ADD_MATTER } from "../../utils/mutations";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
// auth middleware
import Auth from "../../utils/auth";

// icons
import referenceIcon from "../../assets/svg/referenceIcon.svg";

const GridsContainer = styled.div`
  margin-top: 10rem;
  margin-left: 5rem;
  display: grid;
  grid-template-columns: 3fr 3fr 2fr;
  grid-gap: 1rem;
`;

const GridContainer = styled.div`
  inline-size: 90%;
  margin-inline: auto;
  max-inline-size: 30rem;
`;

const Form = styled.form`
display: flex;
flex-direction: column;

`;

const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  padding: 1rem;
  padding-left: 2rem;
  background-color: #7cc4eb;
`;

const EmailIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: -0.5rem;
`;

const EmailInput = styled.input`
  background-image: none;
  border: 0;
  color: #ffffff;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.25rem;
  outline: 0;
  padding: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0487c4;
  }
  &:focus {
    background-color: #0487c4;
  }
  &:active {
    background-color: #0487c4;
  }
  background-color: #7cc4eb;
`;

const SubmitInput = styled.input`
  text-align: center;
  height: 5rem;
  background-image: none;
  border: 0;
  color: #ffffff;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.25rem;
  outline: 0;
  padding: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #dc5c04;
  }
  &:focus {
    background-color: #dc5c04;
  }
  &:active {
    background-color: #dc5c04;
  }
  background-color: #f9b15b;
  cursor: pointer;
`;

const MatterLink = styled.input`
  background-image: none;
  margin-bottom: 1rem;
  border: 0;
  color: #ffffff;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.25rem;
  outline: 0;
  padding: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #006198;
  }
  &:focus {
    background-color: #006198;
  }
  &:active {
    background-color: #006198;
  }
  background-color: #0487c4;
  cursor: pointer;
`;

const ColumnTitle = styled.h2`
margin-bottom: -1rem;
color: #dc5c04;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  font-family: "Lalezar", cursive;
`;

const ColumnHeader = styled.div`
  border-radius: 3px;
  background-color: #FACB84;
  padding: 1rem;
  margin-bottom: 1rem;
`;

function MatterList(props) {
  const [formState, setFormState] = useState({ reference: "" });
  const [addMatter, { error, data }] = useMutation(ADD_MATTER);

  const handleFormSubmit = async (event) => {

    try {
      const { data } = await addMatter({
        variables: { ...formState },
      });

      console.log(data?.addMatter);

      Navigate(`/matters/${data.addMatter.id}`);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      reference: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const {
    loading,
    err,
    data: matterList,
  } = useQuery(QUERY_MATTERS, {
    variables: {
      username: props.username,
    },
  });

  if (loading) return (
  <ColumnTitle>Loading...</ColumnTitle>);
  if (err) return <p>Error :(</p>;

  const matters = matterList.matters;

  return (
    <GridsContainer>
      <GridContainer>
        <ColumnHeader className="noselect">
        <ColumnTitle className="noselect" >Create A New Matter</ColumnTitle>
        </ColumnHeader>
        <Form onSubmit={handleFormSubmit}>
          <Field>
            <Label>
              <EmailIcon className="noselect" src={referenceIcon}></EmailIcon>
            </Label>
            <EmailInput
              placeholder="Reference"
              name="reference"
              type="reference"
              value={formState.reference}
              onChange={handleChange}
            />
          </Field>
          <SubmitInput type="submit" value="Create" />
        </Form>
      </GridContainer>
      <Form>
      <ColumnHeader className="noselect">
        <ColumnTitle>Existing Matters</ColumnTitle>
      </ColumnHeader>
        {matters.map((matter) => (
          <Link to={`/matter/${matter._id}`}>
            <Form>
              <MatterLink className="noselect"  type="submit" value={matter.reference}></MatterLink>
            </Form>
          </Link>
        ))}
      </Form>
    </GridsContainer>
  );
}

export default MatterList;

import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

import { QUERY_MATTERS, QUERY_ME } from "../../utils/queries";
import { ADD_MATTER } from "../../utils/mutations";

export default function LoginForm() {
  const [reference, setReference] = useState("");

  const [addMatter, { error }] = useMutation(ADD_MATTER, {
    update(cache, { data: { addMatter } }) {
      try {
        const { matters } = cache.readQuery({ query: QUERY_MATTERS });

        cache.writeQuery({
          query: QUERY_MATTERS,
          data: { matters: [addMatter, ...matters] },
        });
      } catch (err) {
        console.error(err);
      }

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
        },
      });

      setReference("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;

    if (name === "reference") {
      setReference(value);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <textarea name="reference" value={reference} onchange={handleChange}></textarea>
      <button></button>
    </form>
  );
}

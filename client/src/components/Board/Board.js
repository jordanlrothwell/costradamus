import React from "react";
import styled from "styled-components";

import BoardColumn from "./BoardColumn";
import BoardColumn2 from "../Builder/BoardColumn2";

const BoardStyled = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 100px 0 50px;
`;

export default function Board() {
  return (
    <section>
      <BoardStyled>
        <BoardColumn/>
        <BoardColumn2/>
      </BoardStyled>
    </section>
  );
}
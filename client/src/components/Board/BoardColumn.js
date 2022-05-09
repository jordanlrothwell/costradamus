import React from "react";
import styled from "styled-components";

import BoardHeader from "./BoardHeader";
import BoardArea from "./BoardArea";

const BoardColumnStyled = styled.div`
  margin-bottom: 50px;
`;

export default function BoardColumn() {
  return (
    <BoardColumnStyled>
      <BoardHeader />
      <BoardArea />
    </BoardColumnStyled>
  );
}

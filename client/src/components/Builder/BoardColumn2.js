import React from "react";
import styled from "styled-components";

import BoardHeader from "./BoardHeader";
import BoardArea from "./BoardArea";

const BoardColumnStyled = styled.div`
  margin-bottom: 50px;
`;

export default function BoardColumn2() {
  return (
    <BoardColumnStyled>
      <BoardHeader />
      <BoardArea />
    </BoardColumnStyled>
  );
}

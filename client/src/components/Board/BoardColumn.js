import React from "react";
import styled from "styled-components";

import BoardHeader from "./BoardHeader";
import BoardArea from "./BoardArea";

import { DragDropContext } from "react-beautiful-dnd";

const BoardColumnStyled = styled.div`
  margin-bottom: 50px;
`;

export default function BoardColumn() {
  return (
    <DragDropContext>
      <BoardColumnStyled>
        <BoardHeader />
        <BoardArea />
      </BoardColumnStyled>
    </DragDropContext>
  );
}

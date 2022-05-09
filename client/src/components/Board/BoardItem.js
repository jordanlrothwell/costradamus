import React from "react";

import styled from "styled-components";

const BoardItemStyled = styled.div`
  width: 100%;
  padding: 10px 10px;
  background: #fff;
  border-radius: 5px;
  cursor: -webkit-grab;
  cursor: grab;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &active {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  display: ${(props) => (props.hidden ? "none" : "")};
`;

export default function BoardItem(props) {
  return (
    <BoardItemStyled>
      {props.itemNumber}: {props.description}
    </BoardItemStyled>
  );
}

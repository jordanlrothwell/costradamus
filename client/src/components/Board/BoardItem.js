import React from "react";
import { useState } from 'react';

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
  const [hidden, setHidden] = useState(false);

  const dragStart = (e) => {
    setTimeout(() => setHidden(true), 0);
    e.dataTransfer.setData("column", )
  };

  const dragEnd = () => {
    setHidden(false)
  };

  return (
    <BoardItemStyled
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      hidden={hidden}
    >
      {props.itemID}: {props.description}
    </BoardItemStyled>
  );
}

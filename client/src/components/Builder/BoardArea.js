import React from "react";
import { useState } from "react";

import styled from "styled-components";

const BoardAreaStyled = styled.div`
  max-width: 600px;
  min-height: 150px;
  transition: 0.3s;

  background: ${(props) => (props.hovered ? "#ffffff33" : "")};
  border-radius: ${(props) => (props.hovered ? "5px" : "")};
`;

export default function BoardArea() {
  const [hovered, setHovered] = useState(false);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = () => {
    setHovered(true);
  };

  const dragLeave = () => {
    setHovered(false);
  };

  const drop = (e) => {
    setHovered(false);
    e.target.append();
  };

  return (
    <BoardAreaStyled
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={drop}
      hovered={hovered}
    >
     
    </BoardAreaStyled>
  );
}

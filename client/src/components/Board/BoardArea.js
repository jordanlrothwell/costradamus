import React from "react";
import styled from "styled-components";

import BoardItem from "./BoardItem";

import costData from "../../data/costData.json"

const BoardAreaStyled = styled.div`
  max-width: 600px;
  min-height: 150px;
  transition: 0.3s;

  background: ${(props) => (props.hovered ? "#ffffff33" : "")};
  border-radius: ${(props) => (props.hovered ? "5px" : "")};
`;

export default function BoardArea() {
  return (
    <BoardAreaStyled>
      {costData.map((obj) => (
        <BoardItem
          key={obj.itemNumber}
          itemNumber={obj.itemNumber}
          description={obj.description}
        />
      ))}
    </BoardAreaStyled>
  );
}

import React from "react";
import styled from "styled-components";

const BoardHeaderStyled = styled.div`
  width: 600px;
  margin-bottom: 20px;
  padding: 15px 0;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background: #5c6bc0;

  &:not(:last-child) {
    margin-right: 20px;
  }
`;

export default function BoardHeader() {
  return <BoardHeaderStyled>Items</BoardHeaderStyled>;
}

import React from "react";
import styled from "styled-components";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BoardItem from "./BoardItem";

import costData from "../../data/costData.json"

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
    <DragDropContext>
      <Droppable droppableId="droppable">
        {(provided) => (
          <BoardStyled {...provided.droppableProps} ref={provided.innerRef}>
            {costData.map((item, index) => (
              <Draggable draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <BoardItem item={item} />
                  </div>
                )}
              </Draggable>
            ))}
          </BoardStyled>
        )}
      </Droppable>
    </DragDropContext>
  );
}

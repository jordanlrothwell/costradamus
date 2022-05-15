import React, { useCallback, useReducer } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import produce from "immer";
import { useMutation } from "@apollo/client";
import { ADD_MATTER, UPDATE_MATTER } from "../../utils/mutations";

import tinyLogo from "../../assets/images/tiny-logo.png";

import costData from "../../data/costData.json";

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: grid;
`;

const Column = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.25);
  margin: 3rem auto;
  position: relative;
  margin-top: 3rem;
  margin-left: 1rem;
  margin-right: 1rem;
  min-width: 34.5rem;
`;

const ColumnHeader = styled.div`
  border-radius: 3px;
`;

const ColumnTitle = styled.h2`
  color: #dc5c04;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  font-family: "Lalezar", cursive;
`;

const Holder = styled.div`
  padding: 1rem 1.5rem;
  min-height: 34.5rem;
`;

const Adjacent = styled.div`
  && {
    margin-top: 0.5rem;
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 6fr;
  background-color: #0487c4;
  background-image: linear-gradient(320deg, #7cc4eb, #0487c4);
  border-radius: 8px;
  cursor: pointer;
  color: hsl(228, 19%, 98%);
  padding: 0.66rem 1rem;
  position: relative;
  font-size: 0.9rem;
  align-items: center;
  text-align: left;
`;

const TinyLogo = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-left: -0.5rem;
`;

const ItemNumber = styled.span`
  font-weight: bold;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.2rem;
  margin-left: -0.5rem;
`

const ItemDescription = styled.span`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.2rem;
`

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
    }
  }
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#ffdfc9" : "white",
  borderRadius: "10px",
  padding: "1rem",
});

export default function Builder() {
  const [state, dispatch] = useReducer(dragReducer, {
    // return the entire costData array without the sixth item
    items: costData
  });
  
  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      });
    }
  }, []);

  return (
    <ColumnContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column>
          <ColumnHeader>
            <ColumnTitle className="noselect">costs</ColumnTitle>
          </ColumnHeader>
          <Holder>
            <Droppable droppableId="items" type="COST">
              {(provided, snapshot) => {
                return (
                  <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                    {state.items?.map((cost, index) => {
                      return (
                        <Adjacent>
                          <Draggable
                            key={cost.description}
                            draggableId={cost.description}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                    <TinyLogo className="noselect" src={tinyLogo} alt="tiny logo" />
                                    <ItemNumber className="noselect">{cost.itemNumber}</ItemNumber>
                                    <ItemDescription className="noselect">
                                      {cost.description}
                                    </ItemDescription>
                                </Card>
                              );
                            }}
                          </Draggable>
                        </Adjacent>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </Holder>
        </Column>
        <Column>
          <ColumnHeader>
            <ColumnTitle className="noselect">builder</ColumnTitle>
          </ColumnHeader>
          <Holder>
            <Droppable droppableId="items2" type="COST">
              {(provided, snapshot) => {
                return (
                  <div style={getListStyle(snapshot.isDraggingOver)} ref={provided.innerRef} {...provided.droppableProps}>
                    {state.items2?.map((cost, index) => {
                      return (
                        <Adjacent>
                          <Draggable
                            key={cost.description}
                            draggableId={cost.description}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TinyLogo className="noselect" src={tinyLogo} alt="tiny logo" />
                                  <ItemNumber className="noselect">{cost.itemNumber}</ItemNumber>
                                  <ItemDescription className="noselect">
                                      {cost.description}
                                    </ItemDescription>
                                </Card>
                              );
                            }}
                          </Draggable>
                        </Adjacent>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </Holder>
        </Column>
      </DragDropContext>
      <iframe></iframe>
    </ColumnContainer>
  );
}

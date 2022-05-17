import React, { useCallback, useEffect, useReducer } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MATTER, QUERY_COSTS } from "../../utils/queries";
import { ADD_COST, REMOVE_COST } from "../../utils/mutations";
import styled from "styled-components";
import produce from "immer";
import PDF from "../../assets/docs/output.pdf";
import Viewer from "../Viewer";

import tinyLogo from "../../assets/tiny-logo.png";

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
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
  min-width: 8rem;
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
`;

const ItemDescription = styled.span`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.2rem;
`;

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
      break;
    }
    case "FETCH": {
      return { ...draft, items: action.items };
    }
  }
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#ffdfc9" : "white",
  borderRadius: "10px",
  padding: "1rem",
});

function Builder() {
  const [addCost] = useMutation(ADD_COST);
  const [removeCost] = useMutation(REMOVE_COST);

  const { data } = useQuery(QUERY_MATTER, {
    variables: {
      matterId: "62836efb92c0ab7b156af3ce",
    },
  });

  console.log(data);

  const { data: costData } = useQuery(QUERY_COSTS);

  console.log(costData)
  
  useEffect(() => {
    dispatch({
      type: "FETCH",
      items: costData?.costs ?? [],
    });
    
  }, [costData]);

  // set initial state
  const [state, dispatch] = useReducer(dragReducer, {
    items: costData?.costs ?? [],
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
      // add the cost to this matter
      addCost({
        variables: {
          matterId: "62836efb92c0ab7b156af3ce",
          costId: result.draggableId,
        },
      });
      // remove the cost from the other matter
      removeCost({
        variables: {
          matterId: "62836efb92c0ab7b156af3ce",
          costId: result.draggableId,
        },
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
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {state.items?.map((cost, index) => {
                      return (
                        <Adjacent>
                          <Draggable
                            key={cost._id}
                            draggableId={cost._id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TinyLogo
                                    className="noselect"
                                    src={tinyLogo}
                                    alt="tiny logo"
                                  />
                                  <ItemNumber className="noselect">
                                    {cost.itemNumber}
                                  </ItemNumber>
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
                  <div
                    style={getListStyle(snapshot.isDraggingOver)}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {state.items2?.map((cost, index) => {
                      return (
                        <Adjacent>
                          <Draggable
                            key={cost._id}
                            draggableId={cost._id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TinyLogo
                                    className="noselect"
                                    src={tinyLogo}
                                    alt="tiny logo"
                                  />
                                  <ItemNumber className="noselect">
                                    {cost.itemNumber}
                                  </ItemNumber>
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
        <Viewer pdf={PDF} />
      </DragDropContext>
    </ColumnContainer>
  );
}

export default Builder;

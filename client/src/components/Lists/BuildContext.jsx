import { useCallback, useReducer } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import produce from "immer";

import costData from "../../data/costData.json";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  background-image: linear-gradient(
    0deg,
    hsl(215, 14%, 16%) 0%,
    hsl(215, 19%, 29%) 100%
  );
  border-radius: 3px;
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.25);
  margin: 3rem auto;
  max-width: 370px;
`;

const ColumnHeader = styled.div`
  border-radius: 3px;
`;

const ColumnTitle = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
`;

const Holder = styled.div`
  padding: 1rem 1.5rem;
`;

const Adjacent = styled.div`
  && {
    margin-top: 0.5rem;
  }
`;

const Card = styled.div`
  background-color: hsl(215, 14%, 37.5%);
  border-radius: 8px;
  cursor: pointer;
  color: hsl(228, 19%, 98%);
  padding: 0.66rem 1rem;
  position: relative;
`;

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

export default function BuildContext() {
  const [state, dispatch] = useReducer(dragReducer, {
    items: costData,
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
            <ColumnTitle>Costs</ColumnTitle>
          </ColumnHeader>
          <Holder>
            <Droppable droppableId="items" type="COST">
              {(provided, snapshot) => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
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
                                  <div>
                                    <span className="noselect">
                                      {cost.description}
                                    </span>
                                  </div>
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
            <ColumnTitle>Matter</ColumnTitle>
          </ColumnHeader>
          <Holder>
            <Droppable droppableId="items2" type="COST">
              {(provided, snapshot) => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
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
                                  <div>
                                    <span className="noselect">
                                      {cost.description}
                                    </span>
                                  </div>
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
    </ColumnContainer>
  );
}

import React, { useEffect, useReducer, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_MATTER } from "../../utils/queries";
import { ADD_COST, REMOVE_COST, MOVE_COST } from "../../utils/mutations";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import styled from "styled-components";
import tinyLogo from "../../assets/tiny-logo.png";
import { PDFViewer } from "@react-pdf/renderer";
import invoice from "./data/invoice";
import dateFormat from "../../utils/dateFormat";

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

const ColumnTitle = styled.h2`
color: #0487c4;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  font-family: "Lalezar", cursive;
`;

const ColumnHeader = styled.div`
  border-radius: 3px;
  background-color: #F9BE65;
  padding: 1rem;
`;
const Holder = styled.div`
  padding: 1rem;
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

const PDFAdjust = styled.span`
margin-top: 3rem;
`;

const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  padding: 1rem;
  padding-left: 2rem;
  background-color: #7cc4eb;
`;

const EmailIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: -0.5rem;
`;

const EmailInput = styled.input`
  background-image: none;
  border: 0;
  color: #ffffff;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.25rem;
  outline: 0;
  padding: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0487c4;
  }
  &:focus {
    background-color: #0487c4;
  }
  &:active {
    background-color: #0487c4;
  }
  background-color: #7cc4eb;
`;

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize: 12,
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
  titleContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  reportTitle: {
    color: "#61dafb",
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
  invoiceNoContainer: {
    flexDirection: "column",
    marginTop: 36,
    marginLeft: "auto",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    marginLeft: "20",
    position: "right",
  },
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    border: "none",
  },
  container: {
    flexDirection: "row",
    borderBottom: 4,
    alignItems: "left",
    textAlign: "left",
    fontStyle: "bold",
    flexGrow: 1,
    border: "none",
  },
  costContainer: {
    flexDirection: "row",
    borderBottom: 4,
    alignItems: "left",
    textAlign: "left",
    fontStyle: "bold",
    flexGrow: 1,
    border: "none",
    paddingBottom: 10,
  },
  description: {
    width: "60%",
    flexWrap: "wrap",
    border: "none",
  },
  rate: {
    width: "15%",
  },
  amount: {
    width: "15%",
    marginLeft: "auto",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    border: "none",
  },
  rwDescription: {
    width: "60%",
    textAlign: "left",
    paddingLeft: 8,
  },
  rwQty: {
    width: "10%",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rwRate: {
    width: "15%",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rwAmount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
  tyContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  tyTitle: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
  footerContainer: {
    flexDirection: "column",
    justifyContent: "right",
    marginTop: 60,
    marginLeft: "360px",
  }
});

function getScale(item, quantum) {
  if (quantum < 500) {
    return item.scale.A;
  }
  if (500 < quantum && quantum < 5000) {
    return item.scale.B;
  }
  if (5000 <= quantum && quantum < 7500) {
    return item.scale.C;
  }
  if (7500 <= quantum && quantum < 20000) {
    return item.scale.D;
  }
  if (20000 <= quantum && quantum < 40000) {
    return item.scale.E;
  }
  if (40000 <= quantum && quantum < 70000) {
    return item.scale.F;
  }
  if (70000 <= quantum) {
    return item.scale.G;
  }
}

function currencyFormatter(value) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(value);
}

function GST(value) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(value * 0.1);
}

function totalPlusGST(value) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(value * 1.1);
}

const dragReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const items = [...state.items];
      items.splice(action.index, 0, action.item);
      return {
        ...state,
        items,
      };
    }
    case "REMOVE": {
      return {
        ...state,
        items: state.items.filter((i) => i._id !== action.id),
      };
    }
    case "MOVE": {
      const items = [...state.items];
      const item = items.find((i) => i._id === action.id);
      items.splice(action.index, 1);
      items.splice(action.newIndex, 0, item);
      return {
        ...state,
        items,
      };
    }
    case "FETCH": {
      return {
        ...state,
        items: action.items,
      };
    }
  }
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#ffdfc9" : "white",
  borderRadius: "10px",
  padding: "1rem",
});

function Builder() {
  const paramId = useParams().reference;

  const [addCost] = useMutation(ADD_COST);
  const [removeCost] = useMutation(REMOVE_COST);
  const [moveCost] = useMutation(MOVE_COST);
  const shouldUpdate = useRef(true);

  const { data: costData } = useQuery(QUERY_MATTER, {
    variables: {
      matterId: paramId,
    },
  });

  console.log(costData?.matter?.quantum);

  useEffect(() => {
    if (costData && shouldUpdate.current) {
      shouldUpdate.current = false;
      itemDispatch({
        type: "FETCH",
        items: costData?.matter?.costPool ?? [],
      });
      item2Dispatch({
        type: "FETCH",
        items: costData?.matter?.costs ?? [],
      });
    }
  }, [costData]);

  // set initial state
  const [itemState, itemDispatch] = useReducer(dragReducer, {
    items: costData?.costPool ?? [],
  });

  const [item2State, item2Dispatch] = useReducer(dragReducer, {
    items: costData?.costs ?? [],
  });

  useEffect(() => {
    console.log(item2State);
  }, [item2State]);

  const onDragEnd = (result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      if (
        result.source.droppableId === "items" &&
        result.destination.droppableId === "items2"
      ) {
        const itemID = result.draggableId;
        addCost({
          variables: {
            costId: itemID,
            matterId: paramId,
            index: result.destination.index,
          },
        });

        const item = itemState.items.find((i) => i._id === result.draggableId);

        itemDispatch({
          type: "REMOVE",
          id: result.draggableId,
        });

        item2Dispatch({
          type: "ADD",
          index: result.destination.index,
          item,
        });
      } else if (
        result.source.droppableId === "items2" &&
        result.destination.droppableId === "items"
      ) {
        const item2ID = result.draggableId;
        removeCost({
          variables: {
            costId: item2ID,
            matterId: paramId,
            index: result.destination.index,
          },
        });

        const item = item2State.items.find((i) => i._id === result.draggableId);

        item2Dispatch({
          type: "REMOVE",
          id: result.draggableId,
        });

        itemDispatch({
          type: "ADD",
          index: result.destination.index,
          item,
        });
      }
      // handle moving within the same list
      else if (
        result.source.droppableId === "items" &&
        result.destination === "items" &&
        result.source.index !== result.destination.index
      ) {
        const itemID = result.draggableId;

        moveCost({
          variables: {
            costId: itemID,
            matterId: paramId,
            index: result.destination.index,
            sourceId: "items",
          },
        });

        itemDispatch({
          type: "MOVE",
          id: result.draggableId,
          index: result.destination.index,
        });
      } else if (
        result.source.droppableId === "items2" &&
        result.destination === "items2" &&
        result.source.index !== result.destination.index
      ) {
        const item2ID = result.draggableId;

        moveCost({
          variables: {
            costId: item2ID,
            matterId: paramId,
            index: result.destination.index,
            sourceId: "items2",
          },
        });

        item2Dispatch({
          type: "MOVE",
          id: result.draggableId,
          index: result.destination.index,
          newIndex: result.source.index,
        });
      }
    }
    console.log(item2State);
  };

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
                    {itemState.items?.map((cost, index) => {
                      return (
                        <Adjacent key={cost._id}>
                          <Draggable draggableId={cost._id} index={index}>
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
                    {item2State.items?.map((cost, index) => {
                      return (
                        <Adjacent key={cost._id}>
                          <Draggable draggableId={cost._id} index={index}>
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
        <PDFAdjust>
        <PDFViewer
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.titleContainer}>
                <Text style={styles.reportTitle}>TAX INVOICE</Text>
              </View>

              <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Reference:</Text>
                <Text style={styles.label}>{costData?.matter?.reference}</Text>

                <Text style={styles.label}>Date:</Text>
                <Text style={styles.label}>{dateFormat(Date())}</Text>
              </View>

              <View style={styles.headerContainer}>
                <Text style={styles.billTo}>Bill To:</Text>
                <Text>{invoice.company}</Text>
                <Text>{invoice.address}</Text>
                <Text>{invoice.phone}</Text>
                <Text>{invoice.email}</Text>
              </View>
              <View style={styles.tableContainer}>
                <View style={styles.container}>
                  <Text style={styles.rate}>Item</Text>
                  <Text style={styles.description}>Description</Text>
                  <Text style={styles.amount}>Amount</Text>
                </View>
                {item2State?.items?.map((item) => {
                  const currentQuantum = costData?.quantum;

                  const scaledAmount = getScale(item, 5000);

                  const formattedAmount = currencyFormatter(scaledAmount);

                  return (
                    <View style={styles.costContainer}>
                      <Text style={styles.rate}>{item.itemNumber}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                      <Text style={styles.amount}>{formattedAmount}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.footerContainer}>
                <Text style={styles.label}>
                  GST:   {" "}
                  {GST(
                    item2State?.items?.reduce((acc, item) => {
                      const scaledAmount = getScale(item, 5000);
                      return acc + scaledAmount;
                    }, 0)
                  )}
                </Text>
                <Text style={styles.label}></Text>
                <Text style={styles.label}>
                  Total:   {" "}
                  {totalPlusGST(
                    item2State?.items?.reduce((acc, item) => {
                      const scaledAmount = getScale(item, 5000);
                      return acc + scaledAmount;
                    }, 0)
                  )}
                </Text>
                <Text style={styles.label}></Text>
              </View>
              <View style={styles.tyContainer}>
                <Text style={styles.tyTitle}>Thank you for your business</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
        </PDFAdjust>
      </DragDropContext>
    </ColumnContainer>
  );
}

export default Builder;

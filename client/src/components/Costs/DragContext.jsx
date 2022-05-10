import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function DragContext({ id, items, label, tint }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className={`holder holder--tint-${tint}`}>
            <div className="holder__title">{label}</div>
            <div className="holder__content">
              <ul className="list">
                {items.map((item, index) => (
                  <li className="list__item" key={item.description}>
                    <Draggable draggableId={item.description} index={index}>
                      {(provided) => (
                        <div
                          className="card"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {item.description}
                        </div>
                      )}
                    </Draggable>
                  </li>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

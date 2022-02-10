import React, { useCallback, useReducer } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import produce from "immer";
import classes from "./DragNDrop.module.css";

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

const DragNDrop = (props) => {
  const [state, dispatch] = useReducer(dragReducer, {
    items: props.finalSpaceCharacters,
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
    <div style={{ display: "flex" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items">
          {(provided, snapshot) => {
            return (
              <ul
                className={classes.characters}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.items?.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={classes.charactersthumb}>
                              <img
                                src={item.thumb}
                                alt={`${item.name} Thumb`}
                              />
                            </div>
                            <p>{item.name}</p>
                          </li>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
        <Droppable droppableId="items2">
          {(provided, snapshot) => {
            return (
              <ul  className={classes.characters} ref={provided.innerRef} {...provided.droppableProps}>
                {state.items2?.map((items, index) => {
                  return (
                    <Draggable
                      key={items.id}
                      draggableId={items.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                           <div className={classes.charactersthumb}>
                              <img
                                src={items.thumb}
                                alt={`${items.name} Thumb`}
                              />
                            </div>
                            <p>{items.name}</p>
                          </li>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default DragNDrop;

import React, { useEffect,  useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import classes from "./DragNDrop.module.css";
import PlayersItem from "../Players/PlayersItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { allPlayerState, selectedPlayerState, unSelectedPlayerState } from "../../store/globalState";

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const isDropLimit = (value) => value.length >= 10;

const DragNDrop = (props) => {
  const allPlayers = useRecoilValue(allPlayerState);
  const [players, setUpdatePlayers] = useState(allPlayers);
  const [selectedPlayers, setUpdateSelectedPlayers] = useRecoilState(selectedPlayerState);
  const [unSelectedPlayers, setUnselectedPlayers] = useRecoilState(unSelectedPlayerState);


  useEffect(() => {
    if(unSelectedPlayers.length > 0){
      setUpdatePlayers(unSelectedPlayers);
    }
  }, [unSelectedPlayers]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.droppableId === result.destination.droppableId) {
      if (result.source.droppableId === "items") {
        const list = reorder(
          players,
          result.source.index,
          result.destination.index
        );
        setUpdatePlayers(list);
      } else {
        const list = reorder(
          selectedPlayers,
          result.source.index,
          result.destination.index
        );
        setUpdateSelectedPlayers(list);
      }
    } else {
      const r = move(
        result.source.droppableId === "players" ? players : selectedPlayers,
        result.destination.droppableId === "players" ? players : selectedPlayers,
        result.source,
        result.destination
      );
      setUpdatePlayers(r.players);
      setUpdateSelectedPlayers(r.selectedPlayers);
      setUnselectedPlayers(r.players);
      props.selectablePlayerLimitReached(isDropLimit(r.selectedPlayers));
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="players">
          {(provided, snapshot) => {
            return (
              <ul
                className={classes.players}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {players?.map((item, index) => {
                  return (
                    <Draggable
                      key={item?.id}
                      draggableId={item?.id}
                      index={index}
                      isDragDisabled={
                        (item?.isGoalkeeper &&
                        selectedPlayers?.filter((x) => {
                          return x?.isGoalkeeper;
                        }).length >= 2)
                      }
                    >
                      {(provided, snapshot) => {
                        return (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <PlayersItem player={item} />
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
        <Droppable droppableId="selectedPlayers" isDropDisabled={isDropLimit(selectedPlayers)}>
          {(provided, snapshot) => {
            return (
              <ul
                className={classes.players}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {selectedPlayers?.map((items, index) => {
                  return (
                    <Draggable
                      key={items?.id}
                      draggableId={items?.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <PlayersItem player={items} />
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

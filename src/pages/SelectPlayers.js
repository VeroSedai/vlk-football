import { Grid } from "@mui/material";
import React, { Fragment, useCallback, useReducer } from "react";
import { NavLink } from "react-router-dom";
import DragNDrop from "../components/UI/DragNDrop";

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary",
    power:4,
    isGoalkeeper: true
  },
  {
    id: "cato",
    name: "Little Cato",
    power:4,
    isGoalkeeper: true
  },
  {
    id: "kvn",
    name: "KVN",
    power:4,
    isGoalkeeper: true
  },
  {
    id: "mooncake",
    name: "Mooncake",
    power:4,
    isGoalkeeper: true
  },
  {
    id: "quinn",
    name: "Quinn Ergon",
    power:4,
    isGoalkeeper: true
  },
  {
    id: "pepe",
    name: "Pepe",
    power:4,
    isGoalkeeper: true
  },
  {
    id: "kermit",
    name: "Kermit",
    power:4,
    isGoalkeeper: true
  },
  {
    id: "paperino",
    name: "Paperino",
    power:4,
    isGoalkeeper: true
  },
  {
    id: "topolino",
    name: "Topolino",
    power:4,
    isGoalkeeper: true
  },
  {
    id: "pippo",
    name: "Pippo",
    power:4,
    isGoalkeeper: true
  },
];

const SelectPlayers = () => {
 
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "100vh" }}
  >
      <Grid item xs={3}>
      <DragNDrop finalSpaceCharacters={finalSpaceCharacters}/>
    </Grid>
    <Grid item xs={3}>
      <NavLink to="/creatematch">Crea Squadre</NavLink>
    </Grid>
  </Grid> 
   
  );
};
export default SelectPlayers;

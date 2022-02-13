import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddPlayerButton from "../components/Players/AddPlayerButton";
import NewPlayer from "../components/Players/NewPlayer";
import DragNDrop from "../components/UI/DragNDrop";
import useHttp from "../hooks/use-http";
import { getAllPlayers } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useRecoilState } from "recoil";
import { allPlayerState } from "../store/globalState";

const SelectPlayers = () => {
  const [addPlayerIsShown, setAddPlayerIsShown] = useState(false);
  const [loadedPlayers, setLoadedPlayers] = useRecoilState(allPlayerState);

  const {
    sendRequest,
    status,
    data: playersFromDb,
    error,
  } = useHttp(getAllPlayers, true);

  if(status === "completed"){
      setLoadedPlayers(playersFromDb);
  }

  useEffect(() => {
    sendRequest();
  }, [sendRequest, addPlayerIsShown]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  const showAddPlayerHandler = () => {
    setAddPlayerIsShown(true);
  };

  const hideAddPlayerHandler = () => {
    setAddPlayerIsShown(false);
  };

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
        {addPlayerIsShown && <NewPlayer onClose={hideAddPlayerHandler} />}
        <AddPlayerButton onShowAddPlayer={showAddPlayerHandler} />
      </Grid>
      <Grid item xs={3}>
        {status === "completed" && <DragNDrop />}
      </Grid>
      <Grid item xs={3}>
        <NavLink className="btn btn-primary" to="/creatematch">
          Crea Squadre
        </NavLink>
      </Grid>
    </Grid>
  );
};
export default SelectPlayers;

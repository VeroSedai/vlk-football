
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddPlayerButton from "../components/Players/AddPlayerButton";
import NewPlayer from "../components/Players/NewPlayer";
import DragNDrop from "../components/UI/DragNDrop";
import useHttp from "../hooks/use-http";
import { getAllPlayers } from "../lib/api";
import { useSetRecoilState } from "recoil";
import { allPlayerState } from "../store/globalState";
import { Container, Row, Spinner } from "reactstrap";

const SelectPlayers = () => {
  const [addPlayerIsShown, setAddPlayerIsShown] = useState(false);
  const [isSelectablePlayerLimitReached, setIsSelectablePlayerLimitReached] =
    useState(false);
  const setLoadedPlayers = useSetRecoilState(allPlayerState);

  const {
    sendRequest,
    status,
    data: playersFromDb,
  } = useHttp(getAllPlayers, true);

  if (status === "completed") {
    setLoadedPlayers(playersFromDb);
  }

  const isSelectablePlayerLimitReachedHandler = (data) => {
    setIsSelectablePlayerLimitReached(data);
  };

  useEffect(() => {
    console.log(
      `is limit reached changed to ${isSelectablePlayerLimitReached}`
    );
  }, [isSelectablePlayerLimitReachedHandler]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest, addPlayerIsShown]);

  if (status === "pending") {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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
    <Container>
      {addPlayerIsShown && <NewPlayer onClose={hideAddPlayerHandler} />}
      <AddPlayerButton onShowAddPlayer={showAddPlayerHandler} />
      <Row>
        {status === "completed" && (
          <DragNDrop
            selectablePlayerLimitReached={isSelectablePlayerLimitReachedHandler}
          />
        )}
      </Row>
      <div class="col-md-12 text-center">
        {isSelectablePlayerLimitReached && <NavLink className="btn btn-primary" to="/creatematch">
          Crea Squadre
        </NavLink>}
      </div>
    </Container>
  );
};
export default SelectPlayers;

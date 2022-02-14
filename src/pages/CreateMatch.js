import { NavLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PlayerItem from "../components/Players/PlayersItem";
import {
  firstTeamState,
  matchDateAndPlace,
  secondTeamState,
  selectedPlayerState,
} from "../store/globalState";
import MatchDetailsForm from "../components/Match/MatchDetailsFrom";
import { useEffect } from "react";
import { Badge, Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import useHttp from "../hooks/use-http";
import { addMatch } from "../lib/api";

const CreateMatch = () => {
  const selectedPlayers = useRecoilValue(selectedPlayerState);
  const setEnteredDatePlace = useSetRecoilState(matchDateAndPlace);
  const setFirstTeam = useSetRecoilState(firstTeamState);
  const setSecondTeam = useSetRecoilState(secondTeamState);
  const {
    sendRequest,
    status
  } = useHttp(addMatch);

  const playersFiltered = selectedPlayers.filter(
    (x) => x?.isGoalkeeper === false
  );
  const goalkeepersFiltered = selectedPlayers.filter(
    (x) => x?.isGoalkeeper === true
  );

  const sortByStrengthPlayersList = playersFiltered.sort((x, y) => {
    return x.strength - y.strength;
  });

  let firstTeamFiltered = sortByStrengthPlayersList.filter(
    (player, i) => i % 2 === 1
  );
  let secondTeamFiltered = sortByStrengthPlayersList.filter(
    (player, i) => i % 2 === 0
  );

  const sumFirstTeamStrength = firstTeamFiltered.reduce(
    (n, { strength }) => n + strength,
    0
  );
  const sumSecondTeamStrength = secondTeamFiltered.reduce(
    (n, { strength }) => n + strength,
    0
  );

  if (sumFirstTeamStrength >= sumSecondTeamStrength) {
    if (
      goalkeepersFiltered.length > 0 &&
      goalkeepersFiltered.reduce((n, m) => n.strength >= m.strength)
    ) {
      firstTeamFiltered = firstTeamFiltered.concat(goalkeepersFiltered[0]);
      secondTeamFiltered = secondTeamFiltered.concat(goalkeepersFiltered[1]);
    } else {
      firstTeamFiltered = firstTeamFiltered.concat(goalkeepersFiltered[1]);
      secondTeamFiltered = secondTeamFiltered.concat(goalkeepersFiltered[0]);
    }
  }

  const submitMatchDetailsHandler = (enteredDetails) => {
    setEnteredDatePlace(enteredDetails);
    sendRequest(enteredDetails);
  };

  useEffect(() => {
    setFirstTeam(firstTeamFiltered);
    setSecondTeam(secondTeamFiltered);
  }, [firstTeamFiltered, secondTeamFiltered, setFirstTeam, setSecondTeam]);

  return (
    <div>
      <NavLink className="btn btn-primary" to="/selectplayers">
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </NavLink>
      <div className="pt-2" style={{ display: "flex" }}>
        <Card>
          <CardHeader><h5>VLK TEAM</h5></CardHeader>
          {firstTeamFiltered.map((item, i) => {
            return (
              <ListGroup key={i}>
                <ListGroupItem>
                  <PlayerItem player={item} />
                </ListGroupItem>
              </ListGroup>
            );
          })}
          <Badge bg="info" className="bg-info">
            {sumFirstTeamStrength}
          </Badge>
        </Card>
        <Card>
          <CardHeader><h5>KLV TEAM</h5></CardHeader>
          {secondTeamFiltered.map((item, i) => {
            return (
              <ListGroup key={i}>
                <ListGroupItem>
                  <PlayerItem player={item} />
                </ListGroupItem>
              </ListGroup>
            );
          })}
          <Badge bg="info" className="bg-info">
            {sumSecondTeamStrength}
          </Badge>
        </Card>
      </div>
      <MatchDetailsForm onConfirm={submitMatchDetailsHandler} />
      <div class="col-md-12 text-center">
        <NavLink
          className="btn btn-primary"
          to="/matchdetails"
        >
          Dettaglio Partita
        </NavLink>
      </div>
    </div>
  );
};

export default CreateMatch;

import { useRecoilState } from "recoil";
import PlayerItem from "../components/Players/PlayersItem";
import {
  firstTeamState,
  matchDateAndPlace,
  secondTeamState,
} from "../store/globalState";
import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const MatchDetails = () => {
  const firstTeamFromState = useRecoilState(firstTeamState);
  const secondTeamFromState = useRecoilState(secondTeamState);
  const matchDateAndPlaceFromState = useRecoilState(matchDateAndPlace);
  const { gamePlace, gameDate } = matchDateAndPlaceFromState[0];

  return (
    <div>
      <Card className="text-center">
        <h4>{gameDate}</h4>
        <h4>{gamePlace}</h4>
      </Card>
      <div className="pt-2" style={{ display: "flex" }}>
        <Card>
          <CardHeader><h5>VLK TEAM</h5></CardHeader>
          {firstTeamFromState[0].map((item, i) => {
            return (
              <ListGroup key={i}>
                <ListGroupItem>
                  <PlayerItem player={item} />
                </ListGroupItem>
              </ListGroup>
            );
          })}
        </Card>
        <Card>
          <CardHeader><h5>KLV TEAM</h5></CardHeader>
          {secondTeamFromState[0].map((item, i) => {
            return (
              <ListGroup key={i}>
                <ListGroupItem>
                  <PlayerItem player={item} />
                </ListGroupItem>
              </ListGroup>
            );
          })}
        </Card>
      </div>
      <div class="mt-2 col-md-12 text-center">
        <NavLink className="btn btn-lg btn-primary" to="/">
          Home
        </NavLink>
      </div>
    </div>
  );
};

export default MatchDetails;

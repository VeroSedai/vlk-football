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
        <p>{gameDate}</p>
        <p>{gamePlace}</p>
      </Card>
      <div className="pt-2" style={{ display: "flex" }}>
        <Card>
          <CardHeader>VLK TEAM</CardHeader>
          {firstTeamFromState[0].map((item, i) => {
            return (
              <ListGroup key={item.id}>
                <ListGroupItem>
                  <PlayerItem player={item} />
                </ListGroupItem>
              </ListGroup>
            );
          })}
        </Card>
        <Card>
          <CardHeader>KVL TEAM</CardHeader>
          {secondTeamFromState[0].map((item, i) => {
            return (
              <ListGroup key={item.id}>
                <ListGroupItem>
                  <PlayerItem player={item} />
                </ListGroupItem>
              </ListGroup>
            );
          })}
        </Card>
      </div>
      <div class="col-md-12 text-center">
        <NavLink className="btn btn-primary" to="/">
          Home
        </NavLink>
      </div>
    </div>
  );
};

export default MatchDetails;

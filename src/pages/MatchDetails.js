import { useRecoilState, useRecoilValue } from "recoil";
import PlayerItem from "../components/Players/PlayersItem";
import {
  firstTeamState,
  matchDateAndPlace,
  secondTeamState,
} from "../store/globalState";
import classes from "../components/UI/DragNDrop.module.css";
import { useEffect, useState } from "react";
import { Card } from "reactstrap";

const MatchDetails = () => {
  const firstTeamFromState = useRecoilState(firstTeamState);
  const secondTeamFromState = useRecoilState(secondTeamState);
  const matchDateAndPlaceFromState = useRecoilState(matchDateAndPlace);
  const { gamePlace: gamePlace, gameDate: gameDate } =
    matchDateAndPlaceFromState[0];

  return (
    <div>
      <Card className="text-center">
        <p>{gameDate}</p>
        <p>{gamePlace}</p>
      </Card>
      <div style={{ display: "flex" }}>
        <div>
          <p className={classes.players}>VLK TEAM</p>
          {firstTeamFromState[0].map((item, i) => {
            return (
              <div>
                <ul className={classes.players}>
                  <li>
                    <PlayerItem player={item} />
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
        <div>
          <p>KVL TEAM</p>
          {secondTeamFromState[0].map((item, i) => {
            return (
              <div>
                <ul className={classes.players}>
                  <li>
                    <PlayerItem player={item} />
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;

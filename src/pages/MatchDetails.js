import { useRecoilState, useRecoilValue } from "recoil";
import PlayerItem from "../components/Players/PlayersItem";
import { firstTeamState, secondTeamState } from "../store/globalState";
import classes from "../components/UI/DragNDrop.module.css";
import { useState } from "react";

const MatchDetails = () => {
  const FirstTeamFromState = useRecoilState(firstTeamState);
  const setSecondTeamFromState = useRecoilState(secondTeamState);
  const [firstTeam, setFirstTeam] = useState(FirstTeamFromState);
  const [secondTeam, setSecondTeam] = useState(setSecondTeamFromState);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <p className={classes.players}>VLK TEAM</p>
          {firstTeam.map((item, i) => {
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
          {secondTeam.map((item, i) => {
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

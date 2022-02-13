import { NavLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PlayerItem from "../components/Players/PlayersItem";
import { firstTeamState, matchDateAndPlace, secondTeamState, selectedPlayerState } from "../store/globalState";
import classes from "../components/UI/DragNDrop.module.css";
import GameDetailsForm from "../components/UI/GameDetailsFrom";
import { useEffect, useState } from "react";

const CreateMatch = () => {
    const selectedPlayers = useRecoilValue(selectedPlayerState);
    const setEnteredDatePlace = useSetRecoilState(matchDateAndPlace);
    const setFirstTeam = useSetRecoilState(firstTeamState);
  const setSecondTeam = useSetRecoilState(secondTeamState);


  const playersFiltered = selectedPlayers.filter((x) => x.isGoalkeeper === false);
  const goalkeepersFiltered = selectedPlayers.filter((x) => x.isGoalkeeper === true);
  
  const sortByStrengthPlayersList = playersFiltered.sort((x, y) => {
    return x.strength - y.strength;
  });

  let firstTeamFiltered = sortByStrengthPlayersList.filter((player, i) => i % 2 === 1);
  let secondTeamFiltered = sortByStrengthPlayersList.filter((player, i) => i % 2 === 0);

  const sumFirstTeamStrength = firstTeamFiltered.reduce((n, {strength}) => n + strength, 0);
  const sumSecondTeamStrength = secondTeamFiltered.reduce((n, {strength}) => n + strength, 0);

  if(sumFirstTeamStrength >= sumSecondTeamStrength){
      if(goalkeepersFiltered.reduce((n,m) => n.strength >= m.strength ))
      {
        firstTeamFiltered = firstTeamFiltered.concat(goalkeepersFiltered[0]);
        secondTeamFiltered =secondTeamFiltered.concat(goalkeepersFiltered[1]);
      }else{
        firstTeamFiltered = firstTeamFiltered.concat(goalkeepersFiltered[1]);
        secondTeamFiltered =secondTeamFiltered.concat(goalkeepersFiltered[0]);
      }
    }

    useEffect(() => {
        setFirstTeam(firstTeamFiltered);
        setSecondTeam(secondTeamFiltered);
    }, [])
    
    const submitGameDetailsHandler = (enteredDetails) => {
        setEnteredDatePlace(enteredDetails);
    };


  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <p className={classes.players}>VLK TEAM</p>
          {firstTeamFiltered.map((item, i) => {
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
          {sumFirstTeamStrength}
        </div>
        <div>
          <p>KVL TEAM</p>
          {secondTeamFiltered.map((item, i) => {
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
          {sumSecondTeamStrength}
        </div>
      </div>
      <GameDetailsForm onConfirm={submitGameDetailsHandler} />
      <NavLink className="btn btn-primary" to='/matchdetails'>
          Dettaglio Partita
        </NavLink>
    </div>
  );
};

export default CreateMatch;

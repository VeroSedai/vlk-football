import { faHandSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./PlayerItem.module.css";

const PlayerItem = (props) => {
  return (
    <div key={props.player?.id} className={classes.item}>
      <div>
        <h3>{props.player?.name}</h3>
        <div className={classes.description}>{props.player?.power}</div>
        <div className={classes.price}>
          {props.player?.isGoalkeeper && <FontAwesomeIcon icon={faHandSparkles} />} 
        </div>
      </div>
    </div>
  );
};

export default PlayerItem;

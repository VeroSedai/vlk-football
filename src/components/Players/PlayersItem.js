import { faHandSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const PlayerItem = (props) => {
  let mapStrength = new Map();

  mapStrength.set(4, "DEBOLE");
  mapStrength.set(8, "MEDIO");
  mapStrength.set(12, "FORTE");
  mapStrength.set(16, "PAUROSO");

  return (
    
    <Card className="block-example border border-primary" style={{ width: "18rem"}}>
      <CardBody>
        <CardTitle>{props.player?.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted">
          ({mapStrength.get(props.player?.strength)})
        </CardSubtitle>
        <CardText>
          {props.player?.isGoalkeeper && (
            <FontAwesomeIcon style={{ color: "#ad5502" }} icon={faHandSparkles} />
          )}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default PlayerItem;

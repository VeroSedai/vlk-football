import { useRef, useState } from "react";
import { Button, Card, Input, Label } from "reactstrap";

const isEmpty = (value) => value.trim() === "";

const currentDate = findDate();

function findDate() {
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const MatchDetailsForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    place: true,
  });
  const [enteredPlaceState, setEnteredPlace] = useState("");
  const [enteredDate, setEnteredDate] = useState(currentDate);
  const [isSaved, setIsSaved] = useState(false);

  const dateInputRef = useRef();
  const placeInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredPlace = placeInputRef.current.value;
    const enteredDateFormat = new Date(
      dateInputRef.current.value
    ).toLocaleDateString("IT-it", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const enteredPlaceIsValid = !isEmpty(enteredPlace);

    setFormInputsValidity({
      place: enteredPlaceIsValid,
    });

    if (!enteredPlaceIsValid) {
      return;
    }

    setIsSaved(true);

    props.onConfirm({
      id: Math.random().toString(16).slice(2),
      gamePlace: enteredPlace,
      gameDate: enteredDateFormat,
    });
  };

  return (
    <Card className="m-2 p-2">
      {isSaved && (
        <div class="alert alert-success" role="alert">
          Salvataggio riuscito
        </div>
      )}
      <form onSubmit={confirmHandler}>
        <div className="form-group">
          <Label htmlFor="example2">Data</Label>
          <Input
            className="mt-2 mb-4"
            type="datetime-local"
            innerRef={dateInputRef}
            value={enteredDate}
            onChange={(e) => {
              setEnteredDate(e.target.value);
              console.log(typeof e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <Label htmlFor="example2">Luogo</Label>
          <Input
            className="my-2 mb-4"
            type="text"
            value={enteredPlaceState}
            innerRef={placeInputRef}
            onChange={(e) => {
              setEnteredPlace(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <div className="p-3 pull-right">
          <Button color="btn btn-outline-primary">Conferma</Button>
        </div>
      </form>
    </Card>
  );
};

export default MatchDetailsForm;

import { useRef, useState } from "react";
import { Button, Card, Input, Label } from "reactstrap";

const isEmpty = (value) => value.trim() === "";

const MatchDetailsForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    place: true,
  });

  const dateInputRef = useRef();
  const placeInputRef = useRef();

  const confirmHandler = (event) => { 
    event.preventDefault();

    const enteredPlace = placeInputRef.current.value;
    const enteredDateFormat = new Date(dateInputRef.current.value).toLocaleDateString("IT-it",
    { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
    
    const enteredPlaceIsValid = !isEmpty(enteredPlace);

    setFormInputsValidity({
      place: enteredPlaceIsValid,
    });

    if (!enteredPlaceIsValid) {
      return;
    }

    props.onConfirm({
      id: Math.random().toString(16).slice(2),
      gamePlace: enteredPlace,
      gameDate: enteredDateFormat,
    });
  };

  return (
    <Card className="m-2 p-2">
      <form onSubmit={confirmHandler}>
        <div className="form-group">
          <Label htmlFor="example2">Data</Label>
          <Input
            id="form-calendar-from-timestamp"
            type="datetime-local"
            innerRef={dateInputRef}
          />
        </div>
        <div className="form-group">
          <Label htmlFor="example2">Luogo</Label>
          <Input
            innerRef={placeInputRef}
            invalid={!formInputsValidity.place} 
            type="text"
            className="form-control form-control-md"
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

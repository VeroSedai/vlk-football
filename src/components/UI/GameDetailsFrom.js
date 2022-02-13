import { Fragment, useRef, useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";

const isEmpty = (value) => value.trim() === "";

const GameDetailsForm = (props) => {
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
      name: enteredPlaceIsValid,
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

  //   const nameControlClasses = `${classes.control} ${
  //     formInputsValidity.name ? "" : classes.invalid
  // }`;

  return (
    <Fragment>
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
            type="text"
            className="form-control form-control-md"
          />
        </div>
        <Button className="btn btn-primary">Confirm</Button>
      </form>
    </Fragment>
  );
};

export default GameDetailsForm;

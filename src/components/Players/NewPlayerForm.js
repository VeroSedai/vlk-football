import { useRef, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";

const isEmpty = (value) => value.trim() === "";

const NewPlayerForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
  });

  const nameInputRef = useRef();
  const selectRef = useRef();
  const checkboxRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredIsGoalkeeper = checkboxRef.current.checked;
    const enteredStrength = selectRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);

    setFormInputsValidity({
      name: enteredNameIsValid, 
    });

    if (!enteredNameIsValid) {
      return;
    }

    props.onConfirm({
      id: Math.random().toString(16).slice(2),
      name: enteredName,
      strength: +enteredStrength,
      isGoalkeeper: enteredIsGoalkeeper,
    });
  };

  return (
    <form onSubmit={confirmHandler}>
      <FormGroup>
        <Label for="name">Nome</Label>
        <Input type="text" id="name" innerRef={nameInputRef} invalid={!formInputsValidity.name} />
        {!formInputsValidity.name && <p className="text-danger">Il nome non può essere vuoto</p>}
      </FormGroup>
      <FormGroup>
        <Input type="select" innerRef={selectRef}>
          <option value="4">DEBOLE</option>
          <option value="8">MEDIO</option>
          <option value="12">FORTE</option>
          <option value="16">PAUROSO</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label check>
          <Input type="checkbox" innerRef={checkboxRef} /> Portiere
        </Label>
      </FormGroup>
      <div>
        <button className="btn btn-light pull-right" type="button" onClick={props.onCancel}>
          Cancella
        </button>
        <button className="btn btn-primary pull-right">Conferma</button>
      </div>
    </form>
  );
};

export default NewPlayerForm;

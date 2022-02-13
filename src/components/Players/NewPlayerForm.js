import { useRef, useState } from "react";
import classes from "./NewPlayerForm.module.css";

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

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div>
        <select ref={selectRef}>
          <option value="4">DEBOLE</option>
          <option value="8">MEDIO</option>
          <option value="12">FORTE</option>
          <option value="16">PAUROSO</option>
        </select>
      </div>
      <div>
        <label>
          <input type="checkbox" ref={checkboxRef} /> Portiere
        </label>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default NewPlayerForm;

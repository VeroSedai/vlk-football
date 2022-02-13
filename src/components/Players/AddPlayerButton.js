import classes from './AddPlayerButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const AddPlayerButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onShowAddPlayer}>
      <span className={classes.icon}>
      <FontAwesomeIcon icon={faCirclePlus} />
      </span>
      <span>Aggiungi Giocatore</span>
    </button>
  );
};

export default AddPlayerButton;
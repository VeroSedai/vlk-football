import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

const AddPlayerButton = (props) => {
  return (
    <Button color="primary" onClick={props.onShowAddPlayer}>
      <FontAwesomeIcon icon={faCirclePlus} />{' '}
      <span>Aggiungi Giocatore</span>
    </Button>
  );
};

export default AddPlayerButton;
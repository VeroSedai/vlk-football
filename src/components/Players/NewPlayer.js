import Modal from "../UI/Modal";
import NewPlayerForm from "./NewPlayerForm";
import useHttp from "../../hooks/use-http";
import { addPlayer } from "../../lib/api";

const NewPlayer = (props) => {
  const { sendRequest, status } = useHttp(addPlayer);

  const submitPlayerHandler = (playerData) => {
    sendRequest(playerData);
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div>
        <span>Add New Player</span>
      </div>
      <NewPlayerForm onConfirm={submitPlayerHandler} onCancel={props.onClose} />
    </Modal>
  );
};

export default NewPlayer;

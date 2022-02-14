import Modal from "../UI/Modal";
import NewPlayerForm from "./NewPlayerForm";
import useHttp from "../../hooks/use-http";
import { addPlayer } from "../../lib/api";
import { ModalBody, ModalHeader } from "reactstrap";

const NewPlayer = (props) => {
  const { sendRequest } = useHttp(addPlayer);

  const submitPlayerHandler = (playerData) => {
    sendRequest(playerData);
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <ModalHeader>Add New Player</ModalHeader>
      <ModalBody>
        <NewPlayerForm
          onConfirm={submitPlayerHandler}
          onCancel={props.onClose}
        />
      </ModalBody>
    </Modal>
  );
};

export default NewPlayer;

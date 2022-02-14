import { NavLink } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const MainPage = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <p className="lead">Benvenuto su Soccer Team Creator</p>
          <hr className="my-2" />
          <p>
            Clicca su Crea Partita per iniziare a configurare le tue squadre.
          </p>
          <p className="lead">
            <NavLink className="btn btn-lg btn-primary" to="/selectplayers">
              Crea Partita
            </NavLink>
          </p>
        </CardBody> 
      </Card>
    </div>
  );
};

export default MainPage;

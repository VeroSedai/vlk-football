import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

const MainPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <NavLink to="/selectplayers">Crea Partita</NavLink>
      </Grid>
    </Grid>
  );
};

export default MainPage;

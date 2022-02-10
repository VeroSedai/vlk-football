import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CreateMatch from "./pages/CreateMatch";
import MainPage from "./pages/MainPage";
import MatchDetails from "./pages/MatchDetails";
import SelectPlayers from "./pages/SelectPlayers";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/selectplayers' element={<SelectPlayers />} />
        <Route path='/creatematch' element={<CreateMatch />} />
        <Route path='/matchdetails' element={<MatchDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;

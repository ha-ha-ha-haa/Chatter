import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routes/Router";

const App = () => {
  if (localStorage.getItem("user") === null)
    localStorage.setItem("user","null");
  if (localStorage.getItem("room") === null)
    localStorage.setItem("room","null");
  return ( 
  <Router>
    <Routing/>
  </Router>
    );
};

export default App;

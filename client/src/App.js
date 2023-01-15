import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const user = false;
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

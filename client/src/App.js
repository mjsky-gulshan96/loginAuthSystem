import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  var user = sessionStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
  }
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/profile'>
            {user ? <Profile user ={user} /> : <Login />}
          </Route>
          <Route exact path='/login'>
            {user ? <Profile user ={user}/> : <Login />}
          </Route>
          <Route exact path='/register'>
            {user ? <Profile user ={user}/> : <Register />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

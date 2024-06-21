
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import AuthProvider from './Context/AuthProvider/AuthProvider';

import PrivateRoute from './Pages/Login/Login/PrivateRoute/PrivateRoute';
import AllServices from './Pages/AllServices/AllServices';

import ProcessOrder from './Pages/ProcessOrder/ProcessOrder';
import Dashboard from './Dashboard/Dashboard';
import NotFound from './Pages/NotFound/NotFound';






function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>

            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>

            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/bikes">
              <AllServices></AllServices>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <PrivateRoute path="/processorder/:id">
              <ProcessOrder></ProcessOrder>
            </PrivateRoute>
          </Switch>
          
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

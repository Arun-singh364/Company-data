import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/Login"
import {Route,Switch} from "react-router-dom";
import ShowData from './components/ShowData';
function App() {
  return (
    <div>
      
      <Switch>
      <Route exact path='/' component={Login}/>
      <Route  path='/showdata' component={ShowData}/>
    </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './app';
import AddReservation from './components/AddReservation';
import ViewReservations from './components/ViewReservations';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/reservations/add" component={AddReservation}/>
      <Route path="/reservations/view" component={ViewReservations}/>
    </div>
  </Router>
);

export default Routes;

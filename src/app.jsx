import React from 'react';
import {Link} from 'react-router-dom';
import 'normalize.css';

import "styles/base/_main.sass"  // Global styles
import "styles/base/_common.sass"  // Global styles
import styles from "./app.sass"  // Css-module styles

const App = () => (
  <div className='App'>
    <div>
      <h1>Hotel Reservations</h1>
      <div className={styles.link}>
        <Link to="/reservations/view">View Reservations</Link>
      </div>
      <div className={styles.link}>
        <Link to="/reservations/add">Add Reservation</Link>
      </div>
    </div>

    {/* <div className={styles.blueButton}>button</div> */}
  </div>
);

export default App;

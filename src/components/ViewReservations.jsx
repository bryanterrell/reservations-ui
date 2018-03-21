import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import ReservationsList from './ReservationsList';

const styles = {
  container: {
    margin: 20
  },
  form: {
    border: 'solid 1px grey',
    padding: '5px 10px',
    borderRadius: 10,
    backgroundColor: 'lightgrey'
  },
  formFields: {
    display: 'flex'
  },
  field: {
    marginRight: 5
  },
  label: {
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 5
  },
  button: {
    marginBottom: 20
  }
}

class ViewReservations extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false,
      hotel: '',
      arrival: null,
      departure: null
    };
  }
 
  onChangeHotel(data) {
    this.setState({ hotel: data.value });
  }

  onChangeArrival(arrival) {
    this.setState({ arrival });
  }

  onChangeDepature(departure) {
    this.setState({ departure });
  }

  onGoBack() {
    this.setState({ redirect: true })    
  }

  render () {
    const { hotel, arrival, departure, redirect } = this.state
    
    if (redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div style={styles.container}>
        <h1>View Reservations</h1>

        <div>
            <Button primary 
              style={styles.button}
              onClick={() => this.onGoBack()}>Go Back</Button>
          
          <Form style={styles.form}>
            <h3>Filter Reservations:</h3>
            <Form.Input label='Hotel' type='text' value={hotel} onChange={(e, v) => this.onChangeHotel(v)} />

            <div style={styles.formFields}>
              <Form.Field style={styles.field}>
                <label>Arrival</label>
                <DatePicker
                  selected={arrival}
                  onChange={(v) => this.onChangeArrival(v)} />
              </Form.Field>
              
              <Form.Field style={styles.field}>
                <label>Depature</label>
                <DatePicker
                  selected={departure}
                  onChange={(v) => this.onChangeDepature(v)} />
              </Form.Field>                  
            </div>
          </Form>

          <ReservationsList
            hotel={hotel}
            arrival={arrival}
            departure={departure} />
        </div>
      </div>
    )
  }
}

export default ViewReservations;

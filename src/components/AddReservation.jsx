import React from 'react';
import { Redirect } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Button, Form } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

const styles = {
  container: {
    margin: 20
  },
  label: {
    marginTop: 20,
    marginBottom: 5
  },
  button: {
    marginTop: 20
  }
}

const postNewReservation = gql`
  mutation addReservation(
    $name: String,
    $hotel: String,
    $arrival: DateTime,
    $departure: DateTime
  ) {
    addReservation(
      name: $name, hotelName: $hotel, arrivalDate: $arrival, departureDate: $departure
    ) {
      id
    }
  }
`;

class AddReservationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false,
      name: '',
      hotel: '',
      arrival: moment(),
      departure: moment().add(1, 'days')
    };
  }
 
  onChangeName(data) {
    this.setState({ name: data.value });
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

  onCancel() {
    this.setState({ redirect: true })    
  }

  onCreate() {
    const { name, hotel, arrival, departure } = this.state
    this.props.mutate({
      variables: { name, hotel, arrival, departure }
    })
      .then(({ data }) => {
        console.log('got data', data);
        this.setState({ redirect: true })
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }
 
  render() {
    const { name, hotel, arrival, departure, redirect } = this.state

    if (redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <Form style={styles.container}>
        <h1>Add Reservation</h1>
      
        <Form.Input label='Name' type='text' value={name} onChange={(e, v) => this.onChangeName(v)} />
        <Form.Input label='Hotel' type='text' value={hotel} onChange={(e, v) => this.onChangeHotel(v)} />

        <div style={styles.label}>Arrival</div>
        <DatePicker
          selected={arrival}
          onChange={(v) => this.onChangeArrival(v)} />

        <div style={styles.label}>Depature</div>
        <DatePicker
          selected={departure}
          onChange={(v) => this.onChangeDepature(v)} />

        <Button
          style={styles.button}
          onClick={() => this.onCancel()}>Cancel</Button>
        <Button primary 
          style={styles.button}
          onClick={() => this.onCreate()}>Create Reservation</Button>
      </Form>
    )
  }
}

const AddReservationWithData = graphql(postNewReservation)(AddReservationForm)
export default AddReservationWithData

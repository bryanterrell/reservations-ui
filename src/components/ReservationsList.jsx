import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import { List } from 'semantic-ui-react';

const styles = {
  container: {
    display: 'flex',
    marginTop: 10
  },
  left: {
    flexDirection: 'column'
  },
  right: {
    marginLeft: 'auto'
  },
  hotel: {
    fontSize: 16,
    fontWeight: 700
  }
}

class ReservationsListWithoutData extends Component {
  render () {
    const { data } = this.props
    const array = data && data.getReservations
    // console.log('ReservationsList', data)
    
    if (!data || data.loading) {
      return null
    }

    if (data.error) {
      return <div>An unexpected error has occurred</div>
    }

    if (!Array.isArray(array) || array.length <= 0) {
      return <div>No reservations were found</div>
    }
    
    const fmt = 'MMM D';

    return (
      <List>
        {
          array.map(i => {
            return <List.Item key={i.id} style={styles.container}>
                <div style={styles.left}>
                  <div style={styles.hotel}>{i.hotelName}</div>
                  {i.name}
                </div>
                <div style={styles.right}>
                  {moment(i.arrivalDate).format(fmt)} - {moment(i.departureDate).format(fmt)}
                </div>
            </List.Item>
          })
        }        
      </List>
    )
  }
}

// We use the gql tag to parse our query string into a query document
const getAllReservations = gql`
  query getReservations(
    $hotelName: String,
    $arrivalDate: DateTime,
    $departureDate: DateTime
  ) {
    getReservations(
      hotelName: $hotelName,
      arrivalDate: $arrivalDate,
      departureDate: $departureDate
    ) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

const ReservationsList = graphql(getAllReservations, {
  options: ({ hotel, arrival, departure }) => {
    let variables = { hotelName: hotel }
    variables.arrivalDate = arrival || null
    variables.departureDate = departure || null
    return { variables, fetchPolicy: 'network-only' }
  }
})(ReservationsListWithoutData);

export default ReservationsList;

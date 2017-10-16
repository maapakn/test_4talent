import React, { Component } from 'react';
import _ from 'lodash';
import { getTemps } from './actions';

export default class CityIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {cities: []};
    this.renderCities = this.renderCities.bind(this);
    this.handleGetTemps = this.handleGetTemps.bind(this);
  }

  componentDidMount() {
  }


  handleGetTemps(city_id){
    getTemps(city_id, (response) => {
      console.log(response.data);
    });
  }

  renderHistory(){

  }

  renderCities() {
    if (this.props.cities) {
      const {
        cities
      } = this.props;

      console.log(this.props.cities)

      return _.map(cities, (city, index) => {
        return (
          <tbody key={city.id}>
            <tr>
              <td>{city.name}</td>
              <td>{city.temp}</td>
              <td>
                <button onClick={this.handleGetTemps.bind(this, city.id)}>Actualizar</button>
                <button>Historial</button>
              </td>
            </tr>
          </tbody>
        )
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Temperatura</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              {this.renderCities()}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

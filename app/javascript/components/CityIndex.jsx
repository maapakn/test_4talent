import React, { Component } from 'react';
import _ from 'lodash';
import { getTemps } from './actions';

export default class CityIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      current_city: {}
    };

    this.handleGetTemps = this.handleGetTemps.bind(this);
    this.renderHistory = this.renderHistory.bind(this);
    this.renderCities = this.renderCities.bind(this);
  }

  componentDidMount() {
  }

  handleGetTemps(city_id){
    getTemps(city_id, (response) => {
      console.log(response.data);
    });
  setCityForShow(city){
    this.setState({current_city: city});
  }

  renderCityName(){
    var city = this.state.current_city
    return(
      <b>{city.name}</b>
    )
  }

  renderHistory(){

    var city = this.state.current_city
    console.log(city);

    if (city.temperatures) {

      console.log(city.temperatures);

      return _.map(city.temperatures, (temperature, index) => {
        return (
          <table className="table table-condensed table-striped">
            <thead>
              <tr>
                <th>Temperatura</th>
                <th>Presión</th>
                <th>Humedad</th>
                <th>TempMin</th>
                <th>TempMax</th>
              </tr>
            </thead>
            <tbody >
              <tr key={temperature.city_id}>
                <td>{temperature.temp}°</td>
                <td>{temperature.pressure}</td>
                <td>{temperature.humidity}%</td>
                <td>{temperature.temp_min}°</td>
                <td>{temperature.temp_max}°</td>
              </tr>
            </tbody>
          </table>
        )
      });
    }
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
              <td>{city.temp}°</td>
              <td>
                <button className="btn btn-success" onClick={this.handleGetTemps.bind(this, city.id)}>Actualizar</button>
                <button className="btn btn-info" onClick={this.setCityForShow.bind(this, city)}>Historial</button>
              </td>
            </tr>
          </tbody>
        )
      });
    }
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="table-responsive">
            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Temperatura</th>
                  <th colSpan={2}>Acciones</th>
                </tr>
              </thead>
              {this.renderCities()}
            </table>
            {this.renderCityName()}
            {this.renderHistory()}
          </div>
        </div>
      </div>
    );
  }
}

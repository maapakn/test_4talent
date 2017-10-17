import axios from 'axios';

export function getTemps(id, callback) {
  const promise = axios.get(`/cities/${id}/get_temps`);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log('caught an error', error);
    });
}

export function refreshData(callback){
  const promise = axios.get(`/cities/refresh_data`);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log('caught an error', error);
    });
}

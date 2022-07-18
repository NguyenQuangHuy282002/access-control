import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const LOCALSTORAGE = {
  TOKEN: 'access_token',
  USER: 'user',
};
export class Http {
  // constructor() { }

  static _getHeader() {
    return {
      Authorization: `Bearer ${localStorage.getItem(LOCALSTORAGE.TOKEN) || ''}`,
    };
  }
  static get = (endPoint, params) => {
    const options = {
      headers: this._getHeader(),
    };
    if (params && Object.keys(params).length) {
      options.params = params;
    }
    return axios.get(BASE_URL + endPoint, options);
  };
  static post = (endPoint, payload) => {
    return axios.post(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static put = (endPoint, payload) => {
    return axios.put(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static patch = (endPoint, payload) => {
    return axios.patch(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static delete = (endPoint, id) => {
    return axios.delete(BASE_URL + endPoint + '/' + id, {
      headers: this._getHeader(),
    });
  };
}

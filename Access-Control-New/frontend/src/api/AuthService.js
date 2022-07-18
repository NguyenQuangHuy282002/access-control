import { Http } from './http';
const API_ENDPOINT = {
  LOGIN: '/auth/login',
  REGISTER: '/customer/customer/create',
  ME: '/auth/me',
  SET_PASSWORD: '/auth/customer/set_password',
};

class AuthService {
  constructor() {
    if (AuthService._instance) {
      return AuthService._instance;
    }
    AuthService._instance = this;
  }
  login(username, password) {
    return Http.post(API_ENDPOINT.LOGIN, { username, password });
  }

  register(data){
    return Http.post(API_ENDPOINT.REGISTER, data)
  }

  setPassword(data) {
    return Http.post(API_ENDPOINT.SET_PASSWORD, data);
  }

  getUserInfo() {
    return Http.get(API_ENDPOINT.ME);
  }
}

const instance = new AuthService();
export default instance;

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const THUMBNAIL_PLACEHOLDER = 'https://via.placeholder.com/220';

const LOCALSTORAGE = {
  TOKEN: 'token',
  USER: 'user',
};

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};
const ROLE = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};

export { MODE, ROLE, LOCALSTORAGE };

import leaflet from 'leaflet';

const PLACES_OPTIONS = [
  {
    value: 'popular',
    label: 'Popular',
  },
  {
    value: 'inexpensive',
    label: 'Price: low to high',
  },
  {
    value: 'expensive',
    label: 'Price: high to low',
  },
  {
    value: 'top',
    label: 'Top rated first',
  },
];

const DEFAULT_SORTING = 'popular';

const NEAREST_OFFERS_COUNT = 3;

const DEFAULT_CITY = 'Paris';

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const RATING_OFFER = [
  { value: 5, label: 'perfect' },
  { value: 4, label: 'good' },
  { value: 3, label: 'not bad' },
  { value: 2, label: 'badly' },
  { value: 1, label: 'terribly' },

];

const REVIEW_OFFER = {
  MIN_COMMENT_LENGTH: 50,
  MAX_COMMENT_LENGTH: 300,
  MIN_RATING_OFFER: 1,
  MAX_RATING_OFFER: 5,
  MAX_COMMENTS_COUNT: 10,
};

const MAP_MARKER_DEFAULT: leaflet.IconOptions = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const MAP_MARKER_ACTIVE: leaflet.IconOptions = {
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const CONFIGURATION_API = {
  BASE_URL: 'https://15.design.htmlacademy.pro/six-cities',
  TIME_OUT: 5000,
};

const APIRoute = {
  'Offers': '/offers',
  'Login': '/login',
  'Logout': '/logout',
  'Offer': '/offers/',
  'Comments': '/comments/',
  'Favorite': '/favorite',
};

const TYPE_OF_ERROR = {
  ERROR_EMPTY_OFFERS: 'ERROR_EMPTY_OFFERS',
  ERROR_LOADING_OFFERS: 'ERROR_LOADING_OFFERS',
  ERROR_LOADING_OFFER: 'ERROR_LOADING_OFFER',
  ERROR_LOADING_COMMENTS: 'ERROR_LOADING_COMMENT',
  ERROR_LOADING_NEAR_OFFERS: 'ERROR_LOADING_NEAR_OFFERS',
  ERROR_LOGIN: 'ERROR_LOGIN',
  ERROR_LOGIN_EMAIL: 'ERROR_LOGIN_EMAIL',
  ERROR_LOGIN_PASSWORD: 'ERROR_LOGIN_PASSWORD',
};

const SYSTEM_MESSAGE = {
  ERROR_LOADING_OFFERS: 'Error loading offers',
  ERROR_LOADING_OFFER: 'Error loading offer',
  ERROR_LOADING_COMMENTS: 'Error loading comments',
  ERROR_LOADING_NEAR_OFFERS: 'Error loading similar offers',
  ERROR_LOGIN: 'Error login, please try again',
  ERROR_LOGIN_EMAIL: 'Enter a valid email address, please try again;  example: 0u7YI@example.com',
  ERROR_LOGIN_PASSWORD: 'Enter a valid password, please try again; example: Password123456',
};

const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export enum AppRoute {
  Main = '/',
  Offer = '/offer',
  Favorites = '/favorites',
  Login = '/login',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Offers = 'OFFERS',
  City = 'CITY',
  Sorting = 'SORTING',
  User = 'USER',
  Offer = 'OFFER',
  Error = 'ERROR',
}

export {
  DEFAULT_CITY,
  PLACES_OPTIONS,
  DEFAULT_SORTING,
  NEAREST_OFFERS_COUNT,
  CITIES,
  RATING_OFFER,
  REVIEW_OFFER,
  SYSTEM_MESSAGE,
  MAP_MARKER_DEFAULT,
  MAP_MARKER_ACTIVE,
  CONFIGURATION_API,
  APIRoute,
  TYPE_OF_ERROR,
  EMAIL_REGEXP,
  PASSWORD_REGEXP
};


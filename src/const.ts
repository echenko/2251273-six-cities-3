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

const DEFAULT_CITY = 'Amsterdam';

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
};

const PAGE_NOT_FOUND_MESSAGE = {
  PAGE: 'Page not found',
};

const SYSTEM_MESSAGE = {
  UPLOADING_OFFERS: 'Loading offers, please wait...',
  ERROR_LOADING_OFFERS: 'Error loading offers',
  UPLOADING_OFFER: 'Loading offer, please wait...',
  ERROR_LOADING_OFFER: 'Error loading offer',
  DEFAULT: 'Default'
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

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Offer = '/offers/',
  Comments = '/comments/',
  Favorite = '/favorite',
}

export enum NameSpace {
  Offers = 'OFFERS',
  City = 'CITY',
  Sorting = 'SORTING',
}

export {
  DEFAULT_CITY,
  PLACES_OPTIONS,
  DEFAULT_SORTING,
  NEAREST_OFFERS_COUNT,
  CITIES,
  RATING_OFFER,
  REVIEW_OFFER,
  PAGE_NOT_FOUND_MESSAGE,
  SYSTEM_MESSAGE,
  MAP_MARKER_DEFAULT,
  MAP_MARKER_ACTIVE,
  CONFIGURATION_API,
};

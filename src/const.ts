import leaflet from 'leaflet';

const PLACES_OPTIONS = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

const TEST_COUNT_CARD = 5;

const DEFAULT_CITY = 'Amsterdam';

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
  OFFER: 'Offer not found',
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

export {
  DEFAULT_CITY,
  PLACES_OPTIONS,
  TEST_COUNT_CARD,
  RATING_OFFER,
  REVIEW_OFFER,
  PAGE_NOT_FOUND_MESSAGE,
  MAP_MARKER_DEFAULT,
  MAP_MARKER_ACTIVE,
};

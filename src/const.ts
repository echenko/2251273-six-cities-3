const PLACES_OPTIONS = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

const OFFER_RATING = {
  MAX_STARS: 5,
};

const TEST_COUNT_CARD = 5;

export enum AppRoute {
  Main = '/',
  Offer = '/offer/:id',
  Favorites = '/favorites',
  Login = '/login',
  NotFound = '*',
}

export {
  PLACES_OPTIONS,
  OFFER_RATING,
  TEST_COUNT_CARD
};

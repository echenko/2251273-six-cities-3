import {OffersElementType} from './mocks/offers-mocks';

import {OFFER_RATING} from './const';

/**
 * Returns the number of favorite offers in the given array of offers.
 * @param {OffersElementType[]} offers - An array of offers.
 * @returns {number} - The number of favorite offers.
 */
function countFavoritesOffers(offers: OffersElementType[]): number {
  const favoritesCount: number = offers.reduce((acc: number, offer: OffersElementType) => {
    if (offer.isFavorite) {
      acc++;
    }
    return acc;
  }, 0);

  return favoritesCount;
}

/**
 * Returns an array of all city names from the given offers.
 *
 * @returns {string[]} - An array of city names.
 */
function getArrayAllCities(offers: OffersElementType[]): string[] {
  const cities: string[] = offers.reduce((acc: string[], offer: OffersElementType) => {
    if (!acc.includes(offer.city.name)) {
      acc.push(offer.city.name);
    }
    return acc;
  }, []);

  return cities;
}

function convertRatingToStars(rating: number): number {
  return 100 / OFFER_RATING.MAX_STARS * rating;
}

export {
  countFavoritesOffers,
  getArrayAllCities,
  convertRatingToStars,
};

import {OffersElementType} from './mocks/offers-mocks';
import {OfferType} from './mocks/offer-mock';
import {CommentElementType} from './mocks/comments-mocks';

import {OFFER_RATING, TEST_COUNT_CARD} from './const';

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

function convertRatingToStars(rating: number): string {
  return `${Number(100 / OFFER_RATING.MAX_STARS * rating)}%`;
}

function checkGoodOffer(offer: OfferType): boolean {
  return offer.goods.length > 0;
}

function getFirstName(name: string): string {
  return name.split(' ')[0];
}

function getCommentLength(comments: CommentElementType[]): number {
  return comments.length;
}

function getTestOffers(offers: OffersElementType[]): OffersElementType[] {
  return offers.slice(0, TEST_COUNT_CARD);
}

export {
  countFavoritesOffers,
  getArrayAllCities,
  convertRatingToStars,
  checkGoodOffer,
  getFirstName,
  getCommentLength,
  getTestOffers
};

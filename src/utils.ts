import { OffersElementType } from './types/offers';
import { OfferType } from './mocks/offer-mock';
import { CommentElementType } from './mocks/comments-mocks';
import { FavoriteType } from './mocks/favorite-mocks';

import { REVIEW_OFFER, NEAREST_OFFERS_COUNT, PLACES_OPTIONS } from './const';
import { AuthorizationStatus } from './const';

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
  return `${Number(100 / REVIEW_OFFER.MAX_RATING_OFFER * rating)}%`;
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
  return offers.slice(0, NEAREST_OFFERS_COUNT);
}

function getStatusAuth(): AuthorizationStatus {
  return AuthorizationStatus.Auth;
}

function getFavoriteOffers(offers: FavoriteType[]): FavoriteType[] {
  return offers.filter((offer) => offer.isFavorite);
}

function getNearestOffers(offers: OffersElementType[], offer: OffersElementType): OffersElementType[] {
  return offers.filter((item) => item.city.name === offer.city.name && item.id !== offer.id).slice(0, NEAREST_OFFERS_COUNT);
}

// TODO: РАЗОБРАТЬ!
function getFavoriteOffersCities(offers: FavoriteType[]): Record<string, FavoriteType[]> {
  const ANSWER: Record<string, FavoriteType[]> = {};

  offers.forEach((offer) => {
    if (ANSWER[offer.city.name]) {
      ANSWER[offer.city.name].push(offer);
    } else {
      ANSWER[offer.city.name] = [offer];
    }
  });

  return ANSWER;
}

function checkOfferId(offers: OffersElementType[], offerID: string): boolean {
  return offers.some((offer) => offer.id === offerID);
}

function filterOffersByCity(offers: OffersElementType[], city: string): OffersElementType[] {
  return offers.filter((offer) => offer.city.name.toLowerCase() === city.toLowerCase());
}

function getCounterOffers(offers: OffersElementType[]): number {
  return offers.length;
}

function getLocation(offer: OffersElementType): OffersElementType['location'] {
  const location: OffersElementType['location'] = {
    latitude: offer?.city?.location.latitude || 0,
    longitude: offer?.city?.location.longitude || 0,
    zoom: offer?.city?.location.zoom || 0,
  };

  return location;
}

function getSortedOffersByType(offers: OffersElementType[], type: string): OffersElementType[] {
  switch (type) {
    case 'inexpensive':
      return offers.sort((a, b) => a.price - b.price);
    case 'expensive':
      return offers.sort((a, b) => b.price - a.price);
    case 'top':
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

function getPlacesOptionsLabel(value: string): string {
  return PLACES_OPTIONS.find((option) => option.value === value)?.label || '';
}

export {
  countFavoritesOffers,
  getArrayAllCities,
  convertRatingToStars,
  checkGoodOffer,
  getFirstName,
  getCommentLength,
  getTestOffers,
  getStatusAuth,
  getFavoriteOffers,
  getNearestOffers,
  getFavoriteOffersCities,
  checkOfferId,
  filterOffersByCity,
  getCounterOffers,
  getLocation,
  getSortedOffersByType,
  getPlacesOptionsLabel,
};

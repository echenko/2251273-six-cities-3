import { OffersElementType } from './types/offers';
import { OfferType } from './types/offer';
import { CommentElementType } from './types/comments';
import { FavoriteType } from './types/favorite';
import { REVIEW_OFFER, NEAREST_OFFERS_COUNT, PLACES_OPTIONS, CITIES } from './const';

function convertRatingToStars(rating: number): string {
  return `${Number(100 / REVIEW_OFFER.MAX_RATING_OFFER * rating)}%`;
}

function checkGoodOffer(offer: OfferType): boolean {
  return offer.goods.length > 0;
}

function getFirstName(name: string): string {
  return name.split(' ')[0];
}

function getFavoriteOffersCities(offers: FavoriteType[]): Record<string, FavoriteType[]> {
  const ANSWER: Record<string, FavoriteType[]> = {};

  const citiesForOffers = CITIES.filter((city) => offers.some((offer) => offer.city.name === city));

  citiesForOffers.forEach((city) => {
    offers.forEach((offer) => {
      if (offer.city.name === city) {
        ANSWER[city] = [...(ANSWER[city] || []), offer];
      }
    });
  });

  return ANSWER;
}

function filterOffersByCity(offers: OffersElementType[], city: string): OffersElementType[] {
  return offers.filter((offer) => offer.city.name.toLowerCase() === city.toLowerCase());
}

function getCounterOffers(offers: OffersElementType[]): number {
  return offers.length;
}

function getLocation(offer: OffersElementType | OfferType | null): OffersElementType['location'] {
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

function getRandomNearsOffers(offers: OffersElementType[]): OffersElementType[] {
  return [...offers].sort(() => Math.random() - 0.5).slice(0, NEAREST_OFFERS_COUNT);
}

function switchButton(button: HTMLButtonElement | null, isDisabled: boolean): void {
  if (button !== null) {
    button.disabled = isDisabled;
  }
}

function sortCommentsByDate(commentsSorting: CommentElementType[]): CommentElementType[] {
  if (!commentsSorting) {
    return [];
  }

  return commentsSorting
    .toSorted((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateA - dateB;
    });
}

export {
  convertRatingToStars,
  checkGoodOffer,
  getFirstName,
  getFavoriteOffersCities,
  filterOffersByCity,
  getCounterOffers,
  getLocation,
  getSortedOffersByType,
  getPlacesOptionsLabel,
  getRandomNearsOffers,
  switchButton,
  sortCommentsByDate
};

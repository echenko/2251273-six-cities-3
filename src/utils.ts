import { OffersElementType } from './types/offers';
import { OfferType } from './types/offer';
import { FavoriteType } from './types/favorite';
import { REVIEW_OFFER, NEAREST_OFFERS_COUNT, PLACES_OPTIONS } from './const';

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

  offers.forEach((offer) => {
    if (ANSWER[offer.city.name]) {
      ANSWER[offer.city.name].push(offer);
    } else {
      ANSWER[offer.city.name] = [offer];
    }
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
  return offers.sort(() => Math.random() - 0.5).slice(0, NEAREST_OFFERS_COUNT);
}

function switchButton(button: HTMLButtonElement | null, isDisabled: boolean): void {
  if (button !== null) {
    button.disabled = isDisabled;
  }
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
};

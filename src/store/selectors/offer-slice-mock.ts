import { OfferType } from '../../types/offer';
import { CommentElementType } from '../../types/comments';

export const selectedOfferMock: OfferType = {
  id: 'offer-id',
  title: 'offer-title',
  type: 'offer-type',
  price: Math.random() * 100,
  city: {
    name: 'city-name',
    location: {
      latitude: Math.random() * 10,
      longitude: Math.random() * 10,
      zoom: Math.random() * 10,
    },
  },
  location: {
    latitude: Math.random() * 10,
    longitude: Math.random() * 10,
    zoom: Math.random() * 10,
  },
  isFavorite: [true, false][Math.floor(Math.random() * 2)],
  isPremium: [true, false][Math.floor(Math.random() * 2)],
  rating: Math.random() * 5,
  description: 'offer-description',
  bedrooms: Math.floor(Math.random() * 5),
  goods: [
    'offer-good-1',
    'offer-good-2',
    'offer-good-3',
  ],
  host: {
    name: 'host-name',
    avatarUrl: 'host-avatar-url',
    isPro: [true, false][Math.floor(Math.random() * 2)],
  },
  images: [
    'offer-image-1',
    'offer-image-2',
    'offer-image-3',
  ],
  maxAdults: 0,
};

export const selectedOfferCommentsMock: CommentElementType[] = [
  {
    id: 'comment-id-1',
    date: 'comment-date-1',
    user: {
      name: 'comment-user-1',
      avatarUrl: 'comment-avatar-url-1',
      isPro: [true, false][Math.floor(Math.random() * 2)],
    },
    comment: 'comment-1',
    rating: 0,
  },
  {
    id: 'comment-id-2',
    date: 'comment-date-2',
    user: {
      name: 'comment-user-2',
      avatarUrl: 'comment-avatar-url-2',
      isPro: [true, false][Math.floor(Math.random() * 2)],
    },
    comment: 'comment-2',
    rating: 0,
  },
];

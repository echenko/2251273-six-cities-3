const OFFER = {
  'id': '831162e9-478b-4df9-9432-85be2bb5f531',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 777,
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    }
  },
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8
  },
  'isFavorite': true,
  'isPremium': true,
  'rating': 4,
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'bedrooms': 7,
  'goods': [
    'Heating',
    'Wifi',
    'Dishwasher',
    'Conditioner',
    'Fridge',
    'Washing machine'
  ],
  'host': {
    'name': 'Oliver Conner',
    'avatarUrl': 'img/avatar-angelina.jpg',
    'isPro': true
  },
  'images': [
    'img/apartment-01.jpg',
    'img/apartment-02.jpg',
    'img/apartment-03.jpg',
    'img/apartment-02.jpg',
    'img/apartment-01.jpg',
    'img/apartment-03.jpg',
  ],
  'maxAdults': 7
};

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
}

const COMMENTS = [
  {
    'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    'date': '2019-05-08T14:13:56.569Z',
    'user': {
      'name': 'Oliver Conner',
      'avatarUrl': 'img/avatar-angelina.jpg',
      'isPro': false
    },
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'rating': 4
  },
  {
    'id': 'b67ddfd5-b956-4a30-8c8d-bd083cd6b68a',
    'date': '2020-05-08T14:13:56.569Z',
    'user': {
      'name': 'Oliver2 Conner1',
      'avatarUrl': 'img/avatar-angelina.jpg',
      'isPro': true
    },
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'rating': 5
  }
];

export {
  OFFER,
  COMMENTS
};

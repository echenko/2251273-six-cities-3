const FAVORITES = [
  {
    'id': '51c8695f-a2d7-462a-853b-15477cb583c9',
    'title': 'Beautiful',
    'type': 'apartment',
    'price': 120,
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
    'rating': 2,
    'previewImage': 'img/room-small.jpg'
  },
  {
    'id': '6993dc1a-4932-41ea-a0f7-5f8bfbf6080e',
    'title': 'Luxurious studio at great location',
    'type': 'apartment',
    'price': 120,
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
    'isPremium': false,
    'rating': 3,
    'previewImage': 'img/room-small.jpg'
  },
  {
    'id': '1e7d5e43-9cc3-4420-897f-acc83825c675',
    'title': 'Studio at great location',
    'type': 'house',
    'price': 120,
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
    'rating': 5,
    'previewImage': 'img/apartment-small-04.jpg'
  },
  {
    'id': '57c9ea60-2b60-43d9-a136-7e5b19f20698',
    'title': 'Great location',
    'type': 'room',
    'price': 120,
    'city': {
      'name': 'Paris',
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
    'isPremium': false,
    'rating': 1,
    'previewImage': 'img/apartment-small-04.jpg'
  },
  {
    'id': '6af5f711-c28d-4121-85cd-e0b462a27f7045',
    'title': 'Beautiful & luxurious',
    'type': 'apartment',
    'price': 120,
    'city': {
      'name': 'Paris',
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
    'previewImage': 'img/apartment-small-03.jpg'
  }
];

export type FavoriteType = {
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
  previewImage: string;
};

export { FAVORITES };

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

export type CommentElementType = {
  'id': string;
  'date': string;
  'user': {
    'name': string;
    'avatarUrl': string;
    'isPro': boolean;
  };
  'comment': string;
  'rating': number;
};

export {
  COMMENTS,
};

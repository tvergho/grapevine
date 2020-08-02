export const BUSINESSES = [
  {
    id: 0,
    name: 'Wicked Bikes',
    imageURL: 'https://cyclingindustry.news/wp-content/uploads/2016/07/bike-shop-lead.jpg',
    category: ['Transportation', 'Bike Shops'],
    address: 'Wicked Bikes, Kingfisher Way, Sunnyvale, CA 94087',
    recommendations: [
      {
        fromUser: {
          name: 'Rishi',
          color: '#B5EAD7',
        },
        message: 'Bikes were cool - great customer service. Would definitely come here again!',
      },
      {
        fromUser: {
          name: 'Abhi',
          color: '#FFDAC1',
        },
        message: 'This bike shop was awesome! Really quick service, super friendly – def come here for your bike repairs.',
      },
    ],
  },
  {
    id: 1,
    name: 'Smitten Ice Cream',
    imageURL: 'https://minimalistbaker.com/wp-content/uploads/2016/05/THE-BEST-Vegan-Chocolate-Ice-Cream-SO-creamy-rich-and-easy-to-make-vegan-glutenfree-icecream-dessert-chocolate-recipe-summer.jpg',
    category: ['Food', 'Dessert'],
    address: 'SANTANA ROW, 3055 Olin Ave #1055, San Jose, CA 95128',
    recommendations: [
      {
        fromUser: {
          name: 'Abhi',
          color: '#FFDAC1',
        },
        message: 'Great ice cream.',
      },
      {
        fromUser: {
          name: 'Tyler',
          color: '#C7CEEA',
        },
        message: 'We should get this the next time we\'re at Santana Row.',
      },
    ],
  },
  {
    id: 2,
    name: 'Cindy\'s Deli',
    imageURL: 'https://s3-media0.fl.yelpcdn.com/tphoto/m38mscenPY51L1JUk5B8EA/o.jpg',
    category: ['Food', 'Sandwiches'],
    address: '890 Emory St, San Jose, CA 95126',
    recommendations: [
      {
        fromUser: {
          name: 'Luke',
          color: '#E2F0CB',
        },
        message: 'Dope sandwiches - hella good.',
      },
    ],
  },
  {
    id: 3,
    name: 'Kumon\'s Tutoring',
    imageURL: 'https://ileadexploration.org/wp-content/uploads/2017/10/kumon-white-2.jpg',
    category: ['Tutoring'],
    address: '1991 Park Ave, San Jose, CA 95126',
    recommendations: [
      {
        fromUser: {
          name: 'Rishab',
          color: '#B5EAD7',
        },
        message: 'The tutors here are even better than me.',
      },
    ],
  },
];

export const RECOMMENDATIONS = [
  {
    id: 0,
    business: {
      id: 0,
      name: 'Wicked Bikes',
      imageURL: 'https://cyclingindustry.news/wp-content/uploads/2016/07/bike-shop-lead.jpg',
    },
    fromUser: {
      name: 'Rishi',
      color: '#B5EAD7',
    },
    commission: '5% back',
    message: 'Bikes were cool - great customer service. Would definitely come here again!',
    likes: 2,
    timestamp: 1591912800000,
    personal: true,
  },
  {
    id: 1,
    business: {
      id: 1,
      name: 'Smitten Ice Cream',
      imageURL: 'https://minimalistbaker.com/wp-content/uploads/2016/05/THE-BEST-Vegan-Chocolate-Ice-Cream-SO-creamy-rich-and-easy-to-make-vegan-glutenfree-icecream-dessert-chocolate-recipe-summer.jpg',
    },
    fromUser: {
      name: 'Abhi',
      color: '#FFDAC1',
    },
    commission: '10% back',
    message: 'Great ice cream.',
    likes: 6,
    timestamp: 1591815600000,
    personal: false,
  },
  {
    id: 2,
    business: {
      id: 2,
      name: 'Cindy\'s Deli',
      imageURL: 'https://s3-media0.fl.yelpcdn.com/tphoto/m38mscenPY51L1JUk5B8EA/o.jpg',
    },
    fromUser: {
      name: 'Luke',
      color: '#E2F0CB',
    },
    commission: '3% back',
    message: 'Dope sandwiches - hella good.',
    likes: 2,
    timestamp: 1591653600000,
    personal: false,
  },
  {
    id: 3,
    business: {
      id: 3,
      name: 'Kumon\'s Tutoring',
      imageURL: 'https://ileadexploration.org/wp-content/uploads/2017/10/kumon-white-2.jpg',
    },
    fromUser: {
      name: 'Tyler',
      color: '#C7CEEA',
    },
    commission: '1% back',
    message: 'Incredibly knowledgeable and qualified tutors.',
    likes: 7,
    timestamp: 1591394400000,
    personal: false,
  },
];

export const TRANSACTIONS = [
  {
    id: 0,
    type: 'earning',
    user: {
      name: 'Tyler',
      color: '#C7CEEA',
    },
    business: 'Chaat Cafe',
    amount: 2.34,
  },
  {
    id: 1,
    type: 'earning',
    user: {
      name: 'Luke',
      color: '#E2F0CB',
    },
    business: 'Ike\'s',
    amount: 3.50,
  },
  {
    id: 2,
    type: 'saving',
    business: 'Kumon',
    amount: 1.20,
  },
  {
    id: 3,
    type: 'earning',
    user: {
      name: 'Abhi',
      color: '#FFDAC1',
    },
    business: 'Starbucks',
    amount: 4.01,
  },
  {
    id: 4,
    type: 'saving',
    business: 'Pekoe',
    amount: 5.20,
  },
  {
    id: 5,
    type: 'earning',
    user: {
      name: 'Rishi',
      color: '#B5EAD7',
    },
    business: 'Old Navy',
    amount: 0.45,
  },
  {
    id: 6,
    type: 'saving',
    business: 'Barnes & Noble',
    amount: 3.00,
  },
  {
    id: 7,
    type: 'saving',
    business: 'Sharetea',
    amount: 2.30,
  },
  {
    id: 8,
    type: 'earning',
    user: {
      name: 'Tyler',
      color: '#C7CEEA',
    },
    business: 'Panda Express',
    amount: 1.03,
  },
];

export const FRIENDS = [
  {
    full_name: 'Ronan MacRunnels',
    username: 'rmac',
    picture: 'https://ui-avatars.com/api/?name=Ronan+MacRunnels&size=300&bold=true&background=FFB7B2&color=FFFFFF',
  },
  {
    full_name: 'Rishi Balakrishnan',
    username: 'rishi-balakrishnan',
    picture: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/p480x480/81777819_1236359996753385_7717989787767930880_o.jpg?_nc_cat=100&_nc_sid=7206a8&_nc_ohc=LactKnaKMtAAX9v9aVk&_nc_ht=scontent-sjc3-1.xx&_nc_tp=6&oh=53f72ec446468a8ab63dc582e1c66f5c&oe=5F1481C5',
  },
  {
    full_name: 'Abhishek Rengarajan',
    username: 'abhi-rengarajan',
    picture: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/21740686_1732535820374983_2557600907541529771_n.jpg?_nc_cat=109&_nc_sid=7206a8&_nc_ohc=cGOZ098_GGgAX_tbKpt&_nc_ht=scontent-sjc3-1.xx&oh=2f0a784a775e8abbdf421d70e825ffd6&oe=5F14FA2A',
  },
  {
    full_name: 'Luke DiMartino',
    username: 'ldimartino',
    picture: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/c0.279.480.480a/p480x480/89766231_783333615488893_3638920035197517824_o.jpg?_nc_cat=102&_nc_sid=7206a8&_nc_ohc=xNgyxavI864AX9efTuC&_nc_ht=scontent-sjc3-1.xx&oh=d4598a59804d1acf841b2a3bb618ce55&oe=5F165AB3',
  },
];

export const FRIEND_REQUESTS = [
  {
    full_name: 'Kevin Gottlieb',
    username: 'kgott',
    picture: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/p480x480/89669291_722389838165337_8647447511218257920_o.jpg?_nc_cat=102&_nc_sid=7206a8&_nc_ohc=RaXW6zO5oe4AX8RfQWj&_nc_ht=scontent-sjc3-1.xx&_nc_tp=6&oh=59da8ff3651f513e5cc52415c36b7782&oe=5F15CCD9',
  },
  {
    full_name: 'Gabriel Young',
    username: 'gabe-young',
    picture: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/p480x480/91526816_10220199549796744_5607765779924647936_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=APJyi-e7X_oAX9wTIw1&_nc_ht=scontent-sjc3-1.xx&_nc_tp=6&oh=170bfbfdb8a12ae4b6de367d7ca1aea2&oe=5F15145B',
  },
  {
    full_name: 'Devansh Taori',
    username: 'dtaori',
    picture: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/c272.36.411.410a/p720x720/87036658_1489655941191566_8528824397153173504_o.jpg?_nc_cat=103&_nc_sid=7206a8&_nc_ohc=Gype3iTGSzUAX8oyO8P&_nc_ht=scontent-sjc3-1.xx&oh=bd314b543d95c033ce50fba634e818f3&oe=5F1638F7',
  },
];

export const BOBA_BUSINESSES = [
  {
    id: 0,
    name: '7 Leaves Cafe',
    address: '375 Saratoga Ave, San Jose, CA 95129',
    shortAddress: '375 Saratoga Ave, San Jose',
    category: ['Boba'],
    imageURL: 'https://s3-media0.fl.yelpcdn.com/bphoto/Qkp9EYKlwSXs2ecnI9tjaA/o.jpg',
    commission: '4% back',
  },
  {
    id: 1,
    name: 'Woof\'s Bar',
    address: '2255 The Alameda, Santa Clara, CA 95050',
    shortAddress: '2255 The Alameda, Santa Clara',
    category: ['Boba'],
    imageURL: 'https://s3-media0.fl.yelpcdn.com/bphoto/SiQ3X6TP3TjK2zU8XGA25g/o.jpg',
    commission: '6% back',
  },
  {
    id: 2,
    name: 'Toco Tea',
    address: '3074 El Camino Real, Santa Clara, CA 95051',
    shortAddress: '3074 El Camino Real, Santa Clara',
    category: ['Boba'],
    imageURL: 'https://s3-media0.fl.yelpcdn.com/bphoto/JONaKBOrpftIa2DmOgTpkw/o.jpg',
    commission: '5% back',
  },
  {
    id: 3,
    name: 'Tiger Milk Boba Bar',
    address: '72 N Almaden Ave, San Jose, CA 95110',
    shortAddress: '72 N Almaden Ave, San Jose',
    category: ['Boba'],
    imageURL: 'https://s3-media0.fl.yelpcdn.com/bphoto/1gsPylaG6qOFz0dJ_Uac3g/o.jpg',
    commission: '6% back',
  },
  {
    id: 4,
    name: 'Teaspoon',
    address: '4328 Moorpark Ave, San Jose, CA 95129',
    shortAddress: '4328 Moorpark Ave, San Jose',
    category: ['Boba'],
    imageURL: 'https://s3-media0.fl.yelpcdn.com/bphoto/JChsdvQnZPxm7ZLhZVW1Dw/o.jpg',
    commission: '4% back',
  },
  {
    id: 5,
    name: 'OMG Tea',
    address: '1171 Homestead Rd, Ste 115, Santa Clara, CA 95050',
    shortAddress: '1171 Homestead Rd, Santa Clara',
    category: ['Boba'],
    imageURL: 'https://s3-media0.fl.yelpcdn.com/bphoto/vUa_bRNhbPvKM4H79Ozufg/o.jpg',
    commission: '5% back',
  },
  {
    id: 6,
    name: 'Bobaholics',
    address: '1055 E Brokaw Rd, Ste 40, San Jose, CA 95131',
    shortAddress: '1055 E Brokaw Rd, San Jose',
    category: ['Boba'],
    imageURL: 'https://s3-media0.fl.yelpcdn.com/bphoto/A3FYO4nb5H6hqG-LPuEI0Q/o.jpg',
    commission: '5% back',
  },
  {
    id: 7,
    name: 'Happy Lemon',
    address: '520 Lawrence Expy, Ste 301, Sunnyvale, CA 94085',
    shortAddress: '520 Lawrence Expy, Sunnyvale',
    category: ['Boba'],
    imageURL: 'https://s3-media0.fl.yelpcdn.com/bphoto/gwyuA0Qh_MwuxtfIZWNFKw/o.jpg',
    commission: '3% back',
  },
];

export const ALL_FEED = [
  {
    recommendationID: 'jacyw44vnwc',
    from_user: {
      name: 'Tyler',
    },
    timestamp: '1596006000000',
    business: {
      name: 'TP Tea',
      street_address: '10787 S Blaney Ave',
      city: 'Cupertino',
      state: 'CA',
      zip: '95014',
    },
    likes: '2',
  },
  {
    recommendationID: 'kvby454dsas',
    from_user: {
      name: 'Kevin',
    },
    timestamp: '1596021050000',
    business: {
      name: 'OMG Tea',
      street_address: '1171 Homestead Rd, Ste 115',
      city: 'Santa Clara',
      state: 'CA',
      zip: '95050',
    },
    likes: '18',
  },
  {
    recommendationID: 'dnv3jnvb26',
    from_user: {
      name: 'Rishab',
    },
    timestamp: '1596193850000',
    business: {
      name: 'Happy Lemon',
      street_address: '520 Lawrence Expy, Ste 301',
      city: 'Sunnyvale',
      state: 'CA',
      zip: '94085',
    },
    likes: '49',
  },
  {
    recommendationID: 'hfyt6bvnd3',
    from_user: {
      name: 'Rishi',
    },
    timestamp: '1596209450000',
    business: {
      name: 'O2 Valley',
      street_address: '19058 Stevens Creek Blvd',
      city: 'Cupertino',
      state: 'CA',
      zip: '95014',
    },
    likes: '24',
  },
  {
    recommendationID: 'ghjt6fed28',
    from_user: {
      name: 'Abhi',
    },
    timestamp: '1596274250000',
    business: {
      name: 'Tan Cha',
      street_address: '19600 Vallco Pkwy, Ste 100',
      city: 'Cupertino',
      state: 'CA',
      zip: '95014',
    },
    likes: '145',
  },
  {
    recommendationID: 'nvby6dajdh',
    from_user: {
      name: 'Jason',
    },
    timestamp: '1596285050000',
    business: {
      name: 'Rare Tea',
      street_address: '20956 Homestead Rd, Ste D',
      city: 'Cupertino',
      state: 'CA',
      zip: '95014',
    },
    likes: '37',
  },
  {
    recommendationID: 'bvtd5mandb',
    from_user: {
      name: 'Ashwin',
    },
    timestamp: '1596324650000',
    business: {
      name: 'Teaspoon',
      street_address: '4328 Moorpark Ave',
      city: 'San Jose',
      state: 'CA',
      zip: '95129',
    },
    likes: '227',
  },
];

export const YOU_FEED = [
  {
    recommendationID: 'jacyw44vnwd',
    from_user: {
      name: 'Rishi',
    },
    timestamp: '1596006000000',
    business: {
      name: 'TP Tea',
    },
    points: '230',
  },
  {
    recommendationID: 'adcbd3jfnc',
    from_user: {
      name: 'Kevin',
    },
    timestamp: '1596227450000',
    business: {
      name: 'OMG Tea',
    },
    points: '140',
  },
  {
    recommendationID: 'cbdgf38f7db',
    from_user: {
      name: 'Abhi',
    },
    timestamp: '1596327710000',
    business: {
      name: 'Gong cha',
    },
    points: '320',
  },
  {
    recommendationID: 'kvby454dsa',
    timestamp: '1596305990000',
    business: {
      name: 'Teaspoon',
    },
    points: '140',
  },
  {
    recommendationID: 'ddnca3kf32',
    timestamp: '1596046790000',
    business: {
      name: 'Pekoe',
    },
    points: '220',
  },
  {
    recommendationID: 'ccaj2ndsja',
    timestamp: '1596133190000',
    business: {
      name: 'Tea Society',
    },
    points: '180',
  },
  {
    recommendationID: 'djadn2mdlaj',
    from_user: {
      name: 'Jay',
    },
    timestamp: '1596324650000',
    business: {
      name: 'Milk Tea Lab',
    },
    points: '230',
  },
];

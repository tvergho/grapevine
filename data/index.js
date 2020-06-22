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
    name: 'Ronan MacRunnels',
    username: '@rmac',
    imageURL: 'https://ui-avatars.com/api/?name=Ronan+MacRunnels&size=300&bold=true&background=FFB7B2&color=FFFFFF',
  },
  {
    name: 'Rishi Balakrishnan',
    username: '@rishi-balakrishnan',
    imageURL: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/p480x480/81777819_1236359996753385_7717989787767930880_o.jpg?_nc_cat=100&_nc_sid=7206a8&_nc_ohc=LactKnaKMtAAX9v9aVk&_nc_ht=scontent-sjc3-1.xx&_nc_tp=6&oh=53f72ec446468a8ab63dc582e1c66f5c&oe=5F1481C5',
  },
  {
    name: 'Abhishek Rengarajan',
    username: '@abhi-rengarajan',
    imageURL: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/21740686_1732535820374983_2557600907541529771_n.jpg?_nc_cat=109&_nc_sid=7206a8&_nc_ohc=cGOZ098_GGgAX_tbKpt&_nc_ht=scontent-sjc3-1.xx&oh=2f0a784a775e8abbdf421d70e825ffd6&oe=5F14FA2A',
  },
  {
    name: 'Luke DiMartino',
    username: '@ldimartino',
    imageURL: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/c0.279.480.480a/p480x480/89766231_783333615488893_3638920035197517824_o.jpg?_nc_cat=102&_nc_sid=7206a8&_nc_ohc=xNgyxavI864AX9efTuC&_nc_ht=scontent-sjc3-1.xx&oh=d4598a59804d1acf841b2a3bb618ce55&oe=5F165AB3',
  },
];

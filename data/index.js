export const BUSINESSES = {
  0: {
    name: 'Wicked Bikes',
    imageURL: 'https://cyclingindustry.news/wp-content/uploads/2016/07/bike-shop-lead.jpg',
    category: ['Transportation', 'Bike Shops'],
    address: 'Wicked Bikes, Kingfisher Way, Sunnyvale, CA 94087',
  },
  1: {
    name: 'Smitten Ice Cream',
    imageURL: 'https://minimalistbaker.com/wp-content/uploads/2016/05/THE-BEST-Vegan-Chocolate-Ice-Cream-SO-creamy-rich-and-easy-to-make-vegan-glutenfree-icecream-dessert-chocolate-recipe-summer.jpg',
    category: ['Food', 'Dessert'],
    address: 'SANTANA ROW, 3055 Olin Ave #1055, San Jose, CA 95128',
  },
  2: {
    name: 'Cindy\'s Deli',
    imageURL: 'https://s3-media0.fl.yelpcdn.com/tphoto/m38mscenPY51L1JUk5B8EA/o.jpg',
    category: ['Food', 'Sandwiches'],
    address: '890 Emory St, San Jose, CA 95126',
  },
  3: {
    name: 'Kumon\'s Tutoring',
    imageURL: 'https://ileadexploration.org/wp-content/uploads/2017/10/kumon-white-2.jpg',
    category: ['Tutoring'],
    address: '1991 Park Ave, San Jose, CA 95126',
  },
};

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
    message: 'Dope sandwiches - hella good shit.',
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

export const HTTP_API_PORT = '3021'
export const WS_API_PORT = '3020'
export const FRONT_PORT = '3000'
export const STATIC_FRONT_PORT = '3001'

export const FRONT_URI = process.env.FRONT_URI || 'http://localhost:3000';
// Change HOST if use NGROK
export const HOST = process.env.HOST || 'localhost';
export const API_URI = process.env.API_URI || 'http://localhost:3021';
export const ENV = process.env.NODE_ENV;

export const FB_APP_ID = process.env.FB_APP_ID || "525099344548112";
export const FB_APP_SOCIAL = '526969401069201';
export const PIN_APP_ID = process.env.PINTEREST_APP_ID || '4963179365453016067';
export const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '86g9a3xah5iqxs';
export const FOURSQUARE_CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID || '5XJ4JW0BID2VKFPC5IEAYOZAGMKA42UUXJSBDZO3RWA4BVUX';
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyD3H2CkR-oXsSfk8Vk9WAGzhqrJXv5pd80';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '1083501829090-9ll0ih64dqi1aptqcnq5dtchsfs7i6vm.apps.googleusercontent.com';
// export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '671300381-0os97qsvu5hubvqirs25f0vfgomie29l.apps.googleusercontent.com';
export const BUFFER_CLIENT_ID = process.env.BUFFER_CLIENT_ID || '5b171836abb90ff0142bfa9f';
export const AWSBucket = 'wapp-media';
export const AWSRegion = 'us-west-1';
export const AWSAccelerateEndpoint = 's3-accelerate.amazonaws.com';
export const AWSStaticEndpoint = 'wapp-media.s3-website-us-west-1.amazonaws.com';
export const CDNURL = 'assets.bigdaymade.com';
export const MEDIA_SDK_URL = "http://assets.bigdaymade.com";


export const menuLinks = {
  weddings: '/account/weddings',
  account: '/account/user',
  collections: '/account/collections',
  myWedding: '/account/my-wedding',
  favorites: '/account/favorites',
  venues: '/venues/1',
  vendors: '/vendors/1',
  mainPage: '/',
  match: '/match/start',
  admin: '/admin',
  socialMedia: '/social-media'
};

export const linksStaticFooter = [
  '/vendor/',
  '/venue/',
  '/wedding/'
]

export const ADMIN_EMAIL = 'support@bigdaymade.com';

export const imageFormats = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/pjpeg',
  'image/png',
  'image/webp',
  'image/tiff',
  'image/svg+xml'
];

export const videoFormats = [
  'video/mpg',
  'video/mpeg',
  'video/avi',
  'video/mov',
  'video/flv',
  'video/f4v',
  'video/m4v',
  'video/webm',
  'video/mp4',
  'video/mkv',
  'video/asf',
  'video/wmv',
  'video/vob',
  'video/mod',
  'video/3gp',
  'video/divx',
  'video/xvid',
];

export const PRICE_LEVEL_LIST = {
  short: [
    {id: 1, value: 1, label: '$'},
    {id: 2, value: 2, label: '$$'},
    {id: 3, value: 3, label: '$$$'},
    {id: 4, value: 4, label: '$$$$'},
  ],
  long: [
    {id: 1, value: 1, label: '$ - Affordable'},
    {id: 2, value: 2, label: '$$ - Moderately priced'},
    {id: 3, value: 3, label: '$$$ - Higher-end'},
    {id: 4, value: 4, label: '$$$$ - Very expensive'},
  ]
};

export const CEREMONY_lIST = [
  {id: 57, option: "Indoor only"},
  {id: 58, option: "Outdoor only"},
  {id: 59, option: "Indoor/Outdoor"}
];

export const DISTANCE_lIST = [
  {id: 25, label: "25 Miles"},
  {id: 50, label: "50 Miles"},
  {id: 75, label: "75 Miles"},
  {id: 100, label: "100 Miles"}
];


export const CAPACITY_LEVEL_LIST = [
  {id: 1, value: [0,20], label: 'Less than 20'},
  {id: 2, value: [21,50], label: '21-50'},
  {id: 3, value: [51,100], label: '51-100'},
  {id: 4, value: [101,150], label: '101-150'},
  {id: 5, value: [151,200], label: '151-200'},
  {id: 6, value: [201,300], label: '201-300'},
  {id: 7, value: [300], label: 'More than 300'}
];

export const CURFEW_LEVEL_LIST = [
  {id: 1, value: 1, label: 'Until 9pm'},
  {id: 2, value: 2, label: 'Until 11pm'},
  {id: 3, value: 3, label: 'Until 01am'},
  {id: 4, value: 4, label: 'No Curfew'}
];

export const MATCH_STEPS = [
  {step: 0, page: 'start'},
  {step: 1, page: 'details'},
  {step: 2, page: 'categories'},
  {step: 3, page: 'questions'},
  {step: 4, page: 'finish'},
];

export const VENDORS_SORT = [
  {value: 'match', label: 'Best Match'},
  {value: 'rate', label: 'Highest Rated'},
  {value: 'review', label: 'Most Reviews'},
]

export const SOCIAL_MEDIA_USERS_OLD = [ 36, 509, 75 ];

export const dateFormat = "MMMM D, YYYY";
export const dateFormatShort = "MMM D";
export const dateFormatWithTime = "h:mm a, MMMM D, YYYY";
export const dateFormatTime = "h:mm a";

/// BigDayMade links

export const bigDayMadePoliceUrl = 'https://intercom.help/bigdaymade/terms-and-privacy';

export const bigDayMadePrivatePoliceUrl = 'https://intercom.help/bigdaymade/terms-and-privacy/privacy-policy';

export const bigDayMadeTermsUrl = 'https://intercom.help/bigdaymade/terms-and-privacy';

export const bigDayMadeVendors = 'https://about.bigdaymade.com/vendors/';

export const bigDayMadeAbout = 'https://about.bigdaymade.com/';

export const defaultCurrentPlace = 'San Francisco, CA';

export const pinterestDomain = 'f92aa02ace8e1db46951e50c8e96b7b5';

export const badge_url = "https://wapp-media.s3-us-west-1.amazonaws.com/a42596ab177042090a38_508x180.png";

export const JNConfig = {
  beehiveBaseUrl: 'http://114.215.196.178:8080/beehive-portal',
  //beehiveBaseUrl: 'http://114.215.178.24:8080/beehive-portal',
  apiPrefix: '/api',
  backednUrl: 'http://114.55.55.37:1337',
  apis: {
    'LOCATION_TAGS': '/locationTags',
    'SCHEMA': '/schema',
    'THING': '/reports',
    'TRIGGER': '/triggers',
    'TYPE': '/things/types',
    'AUTH': '/oauth2',
    'USER': '/users'
  },
  backendAPI: {
    FLOW: '/flows'
  }
};

export const BEEHIVE_HEADERS = 'beehive_headers';

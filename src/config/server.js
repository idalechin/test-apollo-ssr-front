require('dotenv').config();
import {HTTP_API_PORT} from '../constants'

if(!HTTP_API_PORT) throw new Error('Missing PORT')

const config = {
  PORT: HTTP_API_PORT,
};

module.exports.config = config;

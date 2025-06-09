// services/indodax.js
class IndodaxPublicAPI {
  constructor() {
    this.baseUrl = 'https://indodax.com/api';
  }

  async _makeRequest(endpoint) {
    const axios = require('axios');
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('Error making request to Indodax API:', error);
      throw error;
    }
  }

  async getTicker(pair = 'btc_idr') {
    return this._makeRequest(`${pair}/ticker`);
  }

  async getAllTickers() {
    return this._makeRequest('tickers');
  }

  async getTrades(pair = 'btc_idr') {
    return this._makeRequest(`${pair}/trades`);
  }

  async getDepth(pair = 'btc_idr') {
    return this._makeRequest(`${pair}/depth`);
  }
}

module.exports = new IndodaxPublicAPI(); // Export instance yang sudah dibuat

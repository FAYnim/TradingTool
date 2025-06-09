/**
 * Indodax Public API Client
 * 
 * Provides methods to access Indodax's public API endpoints
 * 
 * Available methods:
 * - getTicker(pair) - Get ticker data for a specific pair
 * - getAllTickers() - Get ticker data for all pairs
 * - getTrades(pair) - Get recent trades for a specific pair
 * - getDepth(pair) - Get order book depth for a specific pair
 */

class IndodaxPublicAPI {
  constructor() {
    this.baseUrl = 'https://indodax.com/api';
  }

  /**
   * Make a request to the Indodax public API
   * @param {string} endpoint - API endpoint path
   * @returns {Promise<Object>} - Parsed JSON response
   */
  async _makeRequest(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error making request to Indodax API:', error);
      throw error;
    }
  }

  /**
   * Get ticker data for a specific trading pair
   * @param {string} pair - Trading pair (e.g., 'btc_idr', 'eth_btc')
   * @returns {Promise<Object>} - Ticker data
   */
  async getTicker(pair = 'btc_idr') {
    return this._makeRequest(`${pair}/ticker`);
  }

  /**
   * Get ticker data for all trading pairs
   * @returns {Promise<Object>} - All tickers data
   */
  async getAllTickers() {
    return this._makeRequest('tickers');
  }

  /**
   * Get recent trades for a specific trading pair
   * @param {string} pair - Trading pair (e.g., 'btc_idr', 'eth_btc')
   * @returns {Promise<Array>} - Array of recent trades
   */
  async getTrades(pair = 'btc_idr') {
    return this._makeRequest(`${pair}/trades`);
  }

  /**
   * Get order book depth for a specific trading pair
   * @param {string} pair - Trading pair (e.g., 'btc_idr', 'eth_btc')
   * @returns {Promise<Object>} - Order book with bids and asks
   */
  async getDepth(pair = 'btc_idr') {
    return this._makeRequest(`${pair}/depth`);
  }
}

// Example usage:
/*
(async () => {
  const api = new IndodaxPublicAPI();
  
  try {
    // Get BTC/IDR ticker
    const btcTicker = await api.getTicker('btc_idr');
    console.log('BTC/IDR Ticker:', btcTicker);
    
    // Get all tickers
    const allTickers = await api.getAllTickers();
    console.log('All Tickers:', allTickers);
    
    // Get recent BTC/IDR trades
    const btcTrades = await api.getTrades('btc_idr');
    console.log('BTC/IDR Trades:', btcTrades);
    
    // Get BTC/IDR order book depth
    const btcDepth = await api.getDepth('btc_idr');
    console.log('BTC/IDR Depth:', btcDepth);
  } catch (error) {
    console.error('Error:', error);
  }
})();
*/

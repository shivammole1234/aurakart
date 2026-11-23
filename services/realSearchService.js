const productDataProvider = require('./productDataProvider');

/**
 * Real Search & Product Intelligence Adapter
 * Routes search and URL inquiries through the configured ProductDataProvider
 */
async function parseProductUrl(targetUrl) {
  const result = await productDataProvider.parseUrl(targetUrl);
  return result.product;
}

async function searchLiveProducts(query, category = 'all') {
  const result = await productDataProvider.search(query, category);
  return result.product;
}

module.exports = {
  parseProductUrl,
  searchLiveProducts
};

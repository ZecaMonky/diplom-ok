const express = require('express');
const CatalogController = require('../controllers/catalog.conroller')

const router = express.Router();

// Получить товары с конкретной страницы каталога
router.get('/items', async (req, res) => {
  try {
    console.log('Received request for catalog items');
    const page = parseInt(req.query.page) || 1;
    console.log('Page number:', page);
    
    const products = await CatalogController.parseCatalog(page);
    console.log('Sending response with products count:', products.length);
    
    res.json(products);
  } catch (error) {
    console.error('Error in /items route:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Получить все товары (со всех страниц)
router.get('/items/all', async (req, res) => {
  try {
    console.log('Received request for all catalog items');
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= 5) { // Ограничение на 5 страниц для демонстрации
      console.log('Fetching page:', page);
      const products = await CatalogController.parseCatalog(page);
      if (products.length === 0) {
        hasMore = false;
      } else {
        allProducts = [...allProducts, ...products];
        page++;
        await new Promise(resolve => setTimeout(resolve, 2000)); // Задержка 2 сек
      }
    }

    console.log('Total products found:', allProducts.length);
    res.json(allProducts);
  } catch (error) {
    console.error('Error in /items/all route:', error);
    res.status(500).json({ error: 'Failed to fetch all products' });
  }
});

// Получить конкретный товар по ID
router.get('/items/:id', async (req, res) => {
  try {
    console.log('Received request for product ID:', req.params.id);
    const product = await CatalogController.parseProduct(req.params.id);
    if (product) {
      console.log('Product found, sending response');
      res.json(product);
    } else {
      console.log('Product not found');
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error in /items/:id route:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
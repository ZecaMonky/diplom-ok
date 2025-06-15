const express = require('express');
const CatalogController = require('../controllers/catalog.conroller')

const router = express.Router();

// Получить товары с конкретной страницы каталога
router.get('/items', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const products = await CatalogController.parseCatalog(page);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Получить все товары (со всех страниц)
router.get('/items/all', async (req, res) => {
  try {
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= 5) { // Ограничение на 5 страниц для демонстрации
      const products = await CatalogController.parseCatalog(page);
      if (products.length === 0) {
        hasMore = false;
      } else {
        allProducts = [...allProducts, ...products];
        page++;
        await new Promise(resolve => setTimeout(resolve, 2000)); // Задержка 2 сек
      }
    }

    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch all products' });
  }
});

// Получить конкретный товар по ID
router.get('/items/:id', async (req, res) => {
  try {
    const product = await CatalogController.parseProduct(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
const axios = require('axios');
const cheerio = require('cheerio');

class CatalogController {
  static async parseCatalog(pageNum = 1) {
    try {
      const url = pageNum === 1
        ? 'https://invmerch.ru/collection/anacondaz?utm_source=anacondaz.ru&utm_medium=organic&utm_campaign=buy_on_site'
        : `https://invmerch.ru/collection/anacondaz?page=${pageNum}`;
      console.log('Fetching URL:', url);
      
      const { data: html } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      console.log('Response status:', html ? 'Success' : 'Failed');
      console.log('HTML length:', html.length);
      
      const $ = cheerio.load(html);
      console.log('Found product-preview elements:', $('.product-preview').length);

      const products = [];
      $('.product-preview').each((i, el) => {
        const title = $(el).find('.product-preview__title a').text().trim();
        const price = $(el).find('.product-preview__price-cur').text().trim();
        const available = $(el).find('.product-preview__available span').text().trim();
        const link = $(el).find('.product-preview__title a').attr('href');
        const id = $(el).attr('data-product-id');
        const mainImage = $(el).find('.first-image img').attr('src') || $(el).find('.first-image source').attr('srcset');
        const secondImage = $(el).find('.second-image img').attr('src') || $(el).find('.second-image source').attr('srcset');
        const stickers = $(el).find('.sticker').map((i, s) => $(s).text().trim()).get();

        console.log('Parsing product:', { title, price, id });

        products.push({
          id,
          title,
          price,
          available,
          link,
          images: { main: mainImage, secondary: secondImage },
          stickers,
          metadata: {
            variantId: $(el).attr('data-variant-id'),
            productId: $(el).attr('data-product-id')
          }
        });
      });

      console.log('Total products parsed:', products.length);
      const filteredProducts = products.filter(item => item.title && item.price);
      console.log('Products after filtering:', filteredProducts.length);
      
      return filteredProducts;
    } catch (error) {
      console.error(`Error parsing page ${pageNum}:`, error.message);
      console.error('Error stack:', error.stack);
      return [];
    }
  }

  static async parseProduct(productId) {
    try {
      const url = `https://invmerch.ru/product/${productId}`;
      const { data: html } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      console.log('HTML:', html.slice(0, 1000));
      const $ = cheerio.load(html);

      const getText = (selector) => $(selector).text().trim() || null;
      const images = $('.js-product-all-images .product__slide-main a[data-fslightbox]')
        .map((i, el) => $(el).attr('href')).get();
      const characteristics = $('.product-properties .property').map((i, el) => ({
        name: $(el).find('.property__name').text().trim(),
        value: $(el).find('.property__content').text().trim()
      })).get();

      const result = {
        title: getText('.product__title'),
        price: getText('.product__price-cur'),
        description: getText('#tab-description .product-description'),
        images,
        characteristics,
        availability: $('.product__not-available').length ? 'Out of stock' : 'In stock',
        size: getText('.option-value.is-active span')
      };
      console.log('Parsed product:', result);
      return result;
    } catch (error) {
      console.error(`Error parsing product ${productId}:`, error);
      return null;
    }
  }
}

module.exports = CatalogController;
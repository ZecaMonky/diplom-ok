const puppeteer = require('puppeteer');

class CatalogController {
  static async parseCatalog(pageNum = 1) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    });

    try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      const url = pageNum === 1 
        ? 'https://invmerch.ru/collection/anacondaz?utm_source=anacondaz.ru&utm_medium=organic&utm_campaign=buy_on_site'
        : `https://invmerch.ru/collection/anacondaz?page=${pageNum}`;

      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 60000
      });

      await page.waitForSelector('.product-preview', { timeout: 10000 });

      return await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.product-preview')).map(item => {
          // Основная информация
          const title = item.querySelector('.product-preview__title a')?.textContent.trim();
          const price = item.querySelector('.product-preview__price-cur')?.textContent.trim();
          const available = item.querySelector('.product-preview__available span')?.textContent.trim();
          const link = item.querySelector('.product-preview__title a')?.href;
          const id = item.getAttribute('data-product-id');

          // Изображения
          const mainImage = item.querySelector('.first-image img')?.src || 
                          item.querySelector('.first-image source')?.srcset;
          const secondImage = item.querySelector('.second-image img')?.src || 
                            item.querySelector('.second-image source')?.srcset;

          // Стикеры
          const stickers = Array.from(item.querySelectorAll('.sticker'))
            .map(sticker => sticker.textContent.trim())
            .filter(text => text);

          return {
            id,
            title,
            price,
            available,
            link,
            images: {
              main: mainImage,
              secondary: secondImage
            },
            stickers,
            metadata: {
              variantId: item.getAttribute('data-variant-id'),
              productId: item.getAttribute('data-product-id')
            }
          };
        }).filter(item => item.title && item.price);
      });
    } catch (error) {
      console.error(`Error parsing page ${pageNum}:`, error);
      return [];
    } finally {
      await browser.close();
    }
  }

  static async parseProduct(productId) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    });
    try {
      const page = await browser.newPage();
      const url = `https://invmerch.ru/product/${productId}`;
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 60000
      });
      
      return await page.evaluate(() => {
        const getText = (selector) => 
          document.querySelector(selector)?.textContent.trim() || null;
        const getAttribute = (selector, attr) =>
          document.querySelector(selector)?.getAttribute(attr) || null;
        
        // Extract images from the gallery
        const imageElements = Array.from(document.querySelectorAll('.js-product-all-images .product__slide-main a[data-fslightbox]'));
        const images = imageElements.map(img => img.href);
        
        // Extract characteristics from properties
        const properties = Array.from(document.querySelectorAll('.product-properties .property'));
        const characteristics = properties.map(prop => {
          const name = prop.querySelector('.property__name')?.textContent.trim();
          const value = prop.querySelector('.property__content')?.textContent.trim();
          return { name, value };
        });
        
        return {
          title: getText('.product__title'),
          price: getText('.product__price-cur'),
          description: getText('#tab-description .product-description'),
          images: images,
          characteristics: characteristics,
          availability: document.querySelector('.product__not-available') ? 'Out of stock' : 'In stock',
          size: getText('.option-value.is-active span')
        };
      });
    } catch (error) {
      console.error(`Error parsing product ${productId}:`, error);
      return null;
    } finally {
      await browser.close();
    }
  }
}

module.exports = CatalogController;
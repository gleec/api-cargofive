import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  async scrapePosts(category: string) {
    let articles = [];
    try {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();

      await page.goto(`https://cargofive.com/category/${category}/`, { timeout: 600000 });

      await page.screenshot({ path: 'cargofive1.jpg' });

      articles = await page.evaluate(() => {
        const elements = document.querySelectorAll('.entire-meta-link');

        const res = [];
        for (let element of elements) {
          const link = element.getAttribute('href');
          const description = document.querySelector('.excerpt').innerHTML;
          res.push({
            link,
            description
          });
        }

        return res.slice(0, 3);
      });

      let index = 0;
      for (let article of articles) {
        await page.goto(article.link);

        await page.waitForSelector('.entry-title');
        const tmp = await page.evaluate(() => {
          const tmp: any = {};
          tmp.title = document.querySelector('.entry-title').innerHTML;
          tmp.author = document.querySelector('.fn a').innerHTML;
          tmp.publishedAt = document.querySelector('#single-below-header span.meta-date').innerHTML;
          tmp.category = document.querySelector('.meta-category a').innerHTML;

          return tmp;
        });

        tmp.link = article.link;
        tmp.description = article.description;

        articles[index] = tmp;
        index++;
      }

      await browser.close();
    } catch (error) {
      throw new HttpException(error.error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return articles;
  }
}

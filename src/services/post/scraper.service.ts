import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { config } from 'src/config';



@Injectable()
export class ScraperService {
  categories = [
    { key: 'international-logistics', name: 'International Logistics' },
    { key: 'innovation', name: 'Innovation' }
  ]

  async scrapePosts(categoryName: string) {

    const categoryNames = this.categories.map(category => category.name);
    if (!categoryNames.includes(categoryName)) {
      throw new HttpException('Invalid category', HttpStatus.BAD_REQUEST);
    }

    let articles = [];
    const category = this.categories.find(category => category.name === categoryName);

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`${config.blogUrl}/${category.key}/`, { timeout: 600000 });
      await page.screenshot({ path: 'cargofive1.jpg' });

      articles = await page.evaluate(() => {
        const elements = document.querySelectorAll('.post-content-wrap');

        const res = [];
        for (let element of elements) {
          const source = element.querySelector('.entire-meta-link').getAttribute('href');
          const description = element.querySelector('.excerpt').innerHTML;
          res.push({
            source,
            description
          });
        }

        return res.slice(0, 3);
      });

      let index = 0;
      for (let article of articles) {
        await page.goto(article.source);

        await page.waitForSelector('.entry-title');
        const tmp = await page.evaluate(() => {
          const tmp: any = {};
          tmp.title = document.querySelector('.entry-title').innerHTML;
          tmp.author = document.querySelector('.fn a').innerHTML;
          tmp.publishedAt = document.querySelector('#single-below-header span.meta-date').innerHTML;
          tmp.category = document.querySelector('.meta-category a').innerHTML;

          return tmp;
        });

        tmp.source = article.source;
        tmp.description = article.description;

        articles[index] = tmp;
        index++;
      }

      await browser.close();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return articles;
  }
}

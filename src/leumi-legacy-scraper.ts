import { createScraper } from "israeli-bank-scrapers";

export async function scrapeLeumiUsingLegacy(startDate, credentials) {

  const options = {
    startDate,
    companyId: 'leumi',
    onProgress: (e, m) => console.log(`${e} ${m}`)
  };

  const scraper = createScraper(options);
  const result = await scraper.scrape(credentials);

  console.log(JSON.stringify(result, null, 2));
}

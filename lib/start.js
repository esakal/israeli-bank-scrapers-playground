import { scrapeVisaCalPayments } from './visa-cal-payments-scraper';
import { scrapeLeumiUsingAdapters } from './leumi-adapters-scraper';
import { scrapeLeumiUsingLegacy } from './leumi-legacy-scraper';

const inquirer = require('inquirer');
const chalk = require('chalk');
import moment from 'moment';

const VisaCalScraperOption = 'Visa Cal (Adapters)';
const LeumiLegacyOption = 'Leumi (Legacy)';
const LeumiAdaptersOption = 'Leumi (Adapters)';

async function promptInfo() {
  console.log(chalk`{bgCyan {bold Welcome!
  Please provide credentials for visa-cal}}`);
  return inquirer.prompt(
    [
      {
        name: 'scraper',
        type: 'list',
        choices: [VisaCalScraperOption, LeumiAdaptersOption, LeumiLegacyOption]
      },
      {
        name: 'startDate',
        type: 'list',
        choices: [
          {
            name: '1 Week',
            value: moment().subtract(1, 'week')
          },
          {
            name: '1 Month',
            value: moment().subtract(1, 'month')
          },
          {
            name: '6 Months',
            value: moment().subtract(6, 'month')
          }
        ]
      },
      {
      name: 'username',
      type: 'text',
      message: 'what is the username?'
    },
      {
        name: 'password',
        type: 'password',
        message: 'what is the password?'
      }]
  );
}

(async function() {
  try {
    const {startDate, username, password, scraper} = await promptInfo();

    if (scraper === VisaCalScraperOption) {
      await scrapeVisaCalPayments(startDate, {username, password});
    }

    if (scraper === LeumiAdaptersOption) {
      await scrapeLeumiUsingAdapters(startDate, {username, password});
    }

    if (scraper === LeumiLegacyOption) {
      await scrapeLeumiUsingLegacy(startDate, {username, password});
    }


  } catch (err) {
    console.error(err);
  }
})();

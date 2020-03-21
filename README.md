# Israeli Bank Scrapers - Adapters Playground

This repo was created to demonstrate the flexibility of adapters as proposed in [eshaham/israeli-bank-scrapers PR #384](https://github.com/eshaham/israeli-bank-scrapers/pull/384).

## Getting started
1. run `npm install` to install dependencies, pull latest code of that branch, build the branch and symlink to this library.

2. run `npm start` to demonstrate data scraping.

## Which data can be scraped in this demo?

> Notice: You will need to provide your credentials to execute the demo. This app doesn't include any caching mechanism of the credentials.
 
- **Leumi Transactions - Using Adapters API** - This script is using the adapters api to define a sequence of adapters to be used to scrape transactions.
- **Leumi Transactions - Using Legacy API** - This script is using the legacy api to scrape transactions. At the moment the legacy API is the current API, the difference is that that api is also using adapters while keeping the api for backward compatibility.  
- **Visa Cal Payments** - This script is using a custom adapter provided in this library to scrape visa cal payments. 
    

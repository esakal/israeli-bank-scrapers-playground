import { leumiAdapters, runner, puppeteerAdapters } from "israeli-bank-scrapers";

const { loginAdapter, scrapeTransactionsAdapter } = leumiAdapters;
const {createBrowserAdapter, createBrowserPageAdapter} = puppeteerAdapters;

export async function scrapeLeumiUsingAdapters(startDate, credentials) {
  const runnerOptions = {
    onProgress: (e, m) => console.log(`${e} ${m}`)
  };

  const runnerAdapters = [
    createBrowserAdapter({
      verbose: false,
      showBrowser: false,
    }),
    createBrowserPageAdapter(),
    loginAdapter({
      credentials,
    }),
    scrapeTransactionsAdapter({
      startDate,
    }),
  ];

  const result = await runner(runnerOptions, runnerAdapters);

  console.log(JSON.stringify(result, null, 2));
}

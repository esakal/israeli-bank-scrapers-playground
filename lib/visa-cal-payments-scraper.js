import { scrapePaymentsAdapter } from './adapters/visa-cal-payments-adapter';
import { visaCalAdapters, runner } from "israeli-bank-scrapers";

const { loginAdapter } = visaCalAdapters;

export async function scrapeVisaCalPayments(startDate, credentials) {
  const runnerOptions = {
    onProgress: (e, m) => console.log(`${e} ${m}`)
  };

  const runnerAdapters = [
    loginAdapter({
      credentials,
    }),
    scrapePaymentsAdapter({
      startDate,
    }),
  ];

  const result = await runner(runnerOptions, runnerAdapters);

  console.log(JSON.stringify(result, null, 2));
}

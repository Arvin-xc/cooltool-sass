import * as Sentry from "@sentry/nuxt";

Sentry.init({
  dsn: "https://74c16ae573c6d36494eac0bcf947d76a@o1250321.ingest.us.sentry.io/4507955956678656",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

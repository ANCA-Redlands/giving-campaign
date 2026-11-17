/*
  ANCA giving campaign: settings file.
  This is the only file you normally edit. Save it, upload it to GitHub, and the page updates.
  Dates are YYYY-MM-DD and follow the timezone below.
  Anything left empty ('') is hidden on the live page and flagged on the draft page.
*/
window.CAMPAIGN = {

  campaignId: 'yearend-2026',

  // 'draft' shows a review ribbon and a setup checklist. 'live' removes both.
  status: 'draft',

  timezone: 'America/Los_Angeles',

  org: {
    name: 'ANCA Redlands',
    tagline: 'Accelerate Neighborhood Climate Action',
    home: 'https://www.ancaredlands.org',
    contactEmail: '',      // example: 'info@example.org'. Leave empty to hide.
    mailingAddress: '',    // one line. Leave empty to hide.
    social: { facebook: '', instagram: '', linkedin: '' }
  },

  // Flip these to true as each item is approved. Draft mode lists what is still open.
  approved: { theme: false, need: false, tax: false },

  // Placeholder theme (Linda's suggestion). Milan decides the final wording.
  theme: {
    headline: 'Give the Gift of a Resilient Future',
    subline: 'For the Redlands we love. For the generations to come.'
  },

  // Zeffy form addresses. Paste each full link. Empty means the button is hidden on the live page.
  forms: {
    // TEMPORARY: until separate forms exist, every button uses the one existing Zeffy form.
    // To split later, paste each new form's link here and nothing else needs to change.
    yearEnd:       { url: 'https://www.zeffy.com/en-US/donation-form/join-the-movement-for-a-climate-resilient-future' },   // year-end, Nov 17 to Dec 31
    givingTuesday: { url: 'https://www.zeffy.com/en-US/donation-form/join-the-movement-for-a-climate-resilient-future' },   // one-day, Dec 1
    climateHero:   { url: 'https://www.zeffy.com/en-US/donation-form/join-the-movement-for-a-climate-resilient-future' },   // existing Climate Heroes form (monthly or one-time)
    guardian:      { url: '' }    // $1,000+ leadership gift (to confirm it exists)
  },

  // Which form the main button uses, by date. The first matching row wins.
  phases: [
    { id: 'givingTuesday', from: '2026-12-01', to: '2026-12-01', form: 'givingTuesday', tag: 'Giving Tuesday', button: 'Give on Giving Tuesday' },
    { id: 'twelveDays',    from: '2026-12-20', to: '2026-12-31', form: 'yearEnd',       tag: 'The 12 Days',    button: 'Give today' },
    { id: 'afterCampaign', from: '2027-01-01', to: '2099-12-31', form: 'climateHero',   tag: 'Thank you',      button: 'Become a Climate Hero' },
    { id: 'yearEnd',       from: '2000-01-01', to: '2099-12-31', form: 'yearEnd',       tag: 'Year-end campaign', button: 'Give today' }
  ],

  // The story of the need and the ask. Take it from Linda's approved letter. Empty hides the section.
  need: {
    heading: 'Why we are asking',
    paragraphs: []
  },

  // Ways to give. form: 'phase' follows the date rule above.
  ways: [
    { kicker: 'Monthly', title: 'Become a Climate Hero',
      text: 'Steady monthly support lets ANCA plan ahead and keep neighborhood work going all year.',
      form: 'climateHero', button: 'Give monthly' },
    { kicker: 'Leadership gift', title: 'ANCA Guardian',
      text: 'A gift of $1,000 or more at a critical time.',
      form: 'guardian', button: 'Give as a Guardian', confirm: 'To confirm with Milan that this form exists.' },
    { kicker: 'Any amount', title: 'Make a gift',
      text: 'Every contribution is welcome.',
      form: 'phase', button: 'Give today' }
  ],

  // Optional goal display, updated by hand for now. Turn on when a goal is ready.
  goal: { enabled: false, name: '', raised: 0, target: 0, updated: '' },

  twelveDays: {
    enabled: true,
    start: '2026-12-20',
    days: 12,
    blockPrefix: 'Building Block',
    titles: { 1: 'Why neighbors', 12: 'Thank you' },
    givingPromptDays: [3, 8, 10, 12],
    intro: 'One idea a day on building a resilient community.'
  },

  // Only used if a matcher is found. Turn on and fill in.
  match: { enabled: false, matched: '', cap: '', window: '', howCounted: '', announcement: '' },

  // Up to three verified numbers, each with a source. Empty hides the section.
  // Example: { value: '123', label: 'neighbors reached', source: 'Where this number comes from' }
  stats: [],

  // Other ways to help. Empty url hides the button on the live page.
  help: [
    { label: 'Volunteer',        url: '' },
    { label: 'Share this page',  url: 'share' },
    { label: 'Join an event',    url: '' },
    { label: 'Business support', url: '' }
  ],

  footer: {
    taxLine: 'ANCA Redlands is a 501(c)(3) nonprofit.',
    note: 'Gifts are processed by Zeffy.'
  },

  // Optional visit counting without cookies. Paste a GoatCounter site code to turn on.
  analytics: { goatcounter: '' }
};
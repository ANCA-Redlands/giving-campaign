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
    contactEmail: '',      // used by the leadership gift button. Leave empty to hide it.
    mailingAddress: '',    // one line, used for the "give by check" note. Leave empty to hide.
    social: {
      facebook: 'https://www.facebook.com/ancaredlands',
      instagram: 'https://www.instagram.com/ancaredlands/',
      linkedin: ''
    }
  },

  // Flip these to true as each item is approved. Draft mode lists what is still open.
  approved: { theme: false, need: false, tax: false, programs: false },

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
    guardian:      { url: '' }    // not used while the leadership gift is contact and check
  },

  // Which form the main button uses, by date. The first matching row wins.
  phases: [
    { id: 'givingTuesday', from: '2026-12-01', to: '2026-12-01', form: 'givingTuesday', tag: 'Giving Tuesday', button: 'Give on Giving Tuesday' },
    { id: 'twelveDays',    from: '2026-12-20', to: '2026-12-31', form: 'yearEnd',       tag: 'The 12 Days',    button: 'Give today' },
    { id: 'afterCampaign', from: '2027-01-01', to: '2099-12-31', form: 'climateHero',   tag: 'Thank you',      button: 'Become a Climate Hero' },
    { id: 'yearEnd',       from: '2000-01-01', to: '2099-12-31', form: 'yearEnd',       tag: 'Year-end campaign', button: 'Give today' }
  ],

  // Small line under the main button. Leave empty to hide.
  heroNote: '100% of your gift goes to ANCA via Zeffy (zero platform fees). Give once or monthly.',

  // Tangible gift anchors shown in the hero card so donors can picture what their gift supports.
  // Set enabled: false to hide, or adjust amounts/labels once approved.
  impactTiers: {
    enabled: true,
    heading: 'What your gift makes possible',
    defaultAmount: 50,
    tiers: [
      { amount: 25,  label: 'Supports free monthly sustainability workshops and recorded community guides' },
      { amount: 50,  label: 'Helps equip a Redlands block for Map Your Neighborhood emergency readiness' },
      { amount: 100, label: 'Supplies tools and parts to keep household items out of landfills at Repair Cafe' },
      { amount: 250, label: 'Sustains local tree planting, composting, and youth climate education all year' }
    ]
  },

  // The story of the need and the ask. Take it from Linda's approved letter. Empty hides the section.
  need: {
    heading: 'Why we are asking',
    paragraphs: []
  },

  // Ways to give.
  //   form 'phase'   = follows the date rule above
  //   form 'contact' = opens an email to org.contactEmail (for leadership gifts and checks)
  //   hideIfSameAsMain = hide this card while it would repeat the main button's link
  ways: [
    { kicker: 'Monthly', title: 'Become a Climate Hero',
      text: 'Steady monthly support lets ANCA plan ahead and keep neighborhood work going all year. One-time gifts are just as welcome on the same page.',
      form: 'climateHero', button: 'Give monthly or one time' },
    { kicker: 'Leadership gift', title: 'ANCA Guardian',
      text: 'A gift of $1,000 or more at a critical time. Give by check, or talk with us about the best way to give.',
      form: 'contact', button: 'Talk to us about a leadership gift',
      confirm: true },   // true shows a "to confirm" flag. Set org.contactEmail and org.mailingAddress above when decided.
    { kicker: 'Any amount', title: 'Make a gift',
      text: 'Every contribution is welcome.',
      form: 'phase', button: 'Give today', hideIfSameAsMain: true }
  ],

  // Optional goal display, updated by hand for now. Turn on when a goal is ready.
  goal: { enabled: false, name: '', raised: 0, target: 0, updated: '' },

  // The 12 Days. Each day opens on its date and shows its content. Future days show only the date.
  // Add content as entries keyed by day number: 1: { title: '', text: '', action: '' }
  twelveDays: {
    enabled: true,
    start: '2026-12-20',
    days: 12,
    blockPrefix: 'Building Block',
    titles: { 1: 'Why neighbors', 12: 'Thank you' },
    givingPromptDays: [3, 8, 10, 12],   // days that show a Give button
    promptButton: 'Give today',
    intro: 'One idea a day on building a resilient community.',
    entries: {}
  },

  // Only used if a matcher is found. Turn on and fill in.
  match: { enabled: false, matched: '', cap: '', window: '', howCounted: '', announcement: '' },

  // What ANCA does, in words. Drawn from the Programs page on the Hub. Linda to confirm they are current.
  // Each item: title, text, url (optional "Learn more" link), confirm (a note shown only in draft).
  programs: {
    enabled: true,
    heading: 'What ANCA does',
    intro: '',
    items: [
      { title: 'Monthly education',
        text: 'Programs on living more sustainably, often followed by hands-on time with composting, gardening, or tree planting. Past workshops are recorded.',
        url: 'https://redlands-anca.hub.arcgis.com/pages/programs' },
      { title: 'Map Your Neighborhood',
        text: 'Neighbors come together, get to know one another, and turn a conversation about preparedness into a plan.',
        url: 'https://redlands-anca.hub.arcgis.com/pages/our-neighborhoods' },
      { title: 'Repair Cafe',
        text: 'Neighbors share skills and fix what they own instead of throwing it away.',
        url: 'https://redlands-anca.hub.arcgis.com/pages/upcoming-events' },
      { title: 'Day of Climate Action',
        text: 'An Earth Day celebration where local businesses and organizations host projects that help residents learn sustainable ways to live.',
        url: 'https://redlands-anca.hub.arcgis.com/pages/programs',
        confirm: 'The Hub page says this launched in 2023. Confirm it is still held each year.' }
    ]
  },

  // Names only, no amounts. Only list people who agreed to be named. Empty hides the section.
  supporters: { heading: 'Our supporters', intro: '', names: [], note: '' },

  // Other ways to help. Empty url hides the button on the live page. 'share' copies or shares this page's link.
  help: [
    { label: 'Volunteer',       url: 'https://redlands-anca.hub.arcgis.com/pages/get-involved' },
    { label: 'Join an event',   url: 'https://redlands-anca.hub.arcgis.com/pages/upcoming-events' },
    { label: 'Share this page', url: 'share' }
  ],

  footer: {
    taxLine: 'ANCA Redlands is a 501(c)(3) nonprofit.',
    note: 'Gifts are processed by Zeffy.'
  },

  // Optional visit counting without cookies. Paste a GoatCounter site code to turn on.
  analytics: { goatcounter: '' }
};

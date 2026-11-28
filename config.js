/*
  ANCA giving campaign: settings file.
  This is the only file you normally edit. Save it, upload it to GitHub, and the page updates.
  Dates are YYYY-MM-DD and follow the timezone below.
  Anything left empty ('') is hidden on the live page and flagged on the draft page.
*/
window.CAMPAIGN = {

  campaignId: 'yearend-2026',

  // 'draft' shows a review ribbon and a setup checklist. 'live' removes both.
  status: 'live',

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
  approved: { theme: false, need: true, tax: false, programs: true },   // need and programs use Linda's draft copy. Tax wording is not on the page; add it only after the CPA confirms.,

  // Placeholder theme (Linda's suggestion). Milan decides the final wording.
  theme: {
    headline: 'Give the Gift of a Resilient Future',
    subline: 'For the Redlands we love\nFor the generations to come'
  },

  // Zeffy form addresses. Paste each full link. Empty means the button is hidden on the live page.
  forms: {
    yearEnd:       { url: 'https://www.zeffy.com/en-US/donation-form/give-today-16' },   // year-end & single gift form
    givingTuesday: { url: 'https://www.zeffy.com/en-US/donation-form/give-today-16' },   // Giving Tuesday (Dec 1)
    climateHero:   { url: 'https://www.zeffy.com/en-US/donation-form/join-the-movement-for-a-climate-resilient-future' },   // Climate Heroes monthly form
    guardian:      { url: 'https://www.zeffy.com/en-US/donation-form/anca-guardian' }    // ANCA Guardian leadership gift ($1,000+)
  },

  // Which form the main button uses, by date. The first matching row wins.
  phases: [
    { id: 'givingTuesday', from: '2026-12-01', to: '2026-12-01', form: 'givingTuesday', tag: 'Giving Tuesday', button: 'Give on Giving Tuesday' },
    { id: 'afterCampaign', from: '2027-01-01', to: '2099-12-31', form: 'climateHero',   tag: 'Thank you',      button: 'Become a Climate Hero' },
    { id: 'yearEnd',       from: '2000-01-01', to: '2099-12-31', form: 'yearEnd',       tag: 'Year-end campaign', button: 'Give today' }
  ],

  // Small line under the main button. Leave empty to hide.
  heroNote: '',

  // Photo on the right of the top banner. Put the file in assets/ and set image. Leave image empty for a text-only banner.
  // credit: a short line shown under the photo (needed for most Creative Commons licenses).
  hero: { image: 'assets/hero.jpg', alt: 'An older person\u2019s hands holding a young seedling in soil, with a child\u2019s hands reaching toward it', credit: '' },

  // The story of the need and the ask. Take it from Linda's approved letter. Empty hides the section.
  need: {
    heading: 'Why we\u2019re asking',
    // Giving Tuesday letter from Linda. Set enabled to false after Tuesday and the two paragraphs below show again.
    letter: {
      enabled: true,
      visibleBlocks: 3,           // paragraphs shown before "Read the full letter"
      moreLabel: 'Read the full letter',
      button: 'Donate here for a more resilient Redlands',
      blocks: [
        { p: 'Dear Friends,' },
        { p: 'This Giving Tuesday, I\u2019d like to share why a gift to ANCA Redlands matters to you, your children, and future generations.' },
        { p: 'As severe weather and other climate-related challenges intensify, we can prepare by strengthening our community, starting in our own neighborhoods, where each of us can make a meaningful difference. That is the heart of ANCA Redlands\u2019 work.' },
        { p: 'Guided by a comprehensive plan for building community resilience, ANCA has spent the past four years helping residents understand the challenges ahead and take practical action. Thanks to our amazing volunteers, we have offered the following programs at no charge to the public:' },
        { list: [
          '31 monthly speaker events exploring climate-related challenges and practical solutions;',
          '10 quarterly Repair Caf\u00e9s, where skilled volunteers repair items at no charge while demonstrating the environmental value of reuse; and',
          'Four annual community-wide Days of Climate Action celebrating Earth Day by engaging residents in hands-on projects, learning new skills, and connecting with resources for a more resilient future.'
        ] },
        { p: 'Our neighborhood work to date has focused on disaster preparedness. Eighty-seven (87) neighborhoods have created detailed plans for working together during a major emergency. Soon, ANCA will launch a program to help residents grow and share more food locally. This is all part of building local resilience.' },
        { p: 'At the center of our neighborhood work is something even more essential for our future: stronger relationships among neighbors. Resilience is strengthened when neighbors work together to prepare for disasters, grow food, conserve water, protect biodiversity, and face future challenges together.' },
        { p: 'What we do today can help ensure a safer, healthier, more livable future for ourselves, our children, and the generations to come who will inherit the consequences of the choices we make today.' },
        { p: 'Please make a Giving Tuesday gift to sustain and expand this important work: the gift of a more resilient future for the Redlands we love and for generations to come.' }
      ],
      signoff: ['With gratitude,', 'Linda Hamilton', 'Executive Director', 'ANCA Redlands']
    },
    paragraphs: [
      'In ANCA\u2019s first four years, we have already demonstrated what neighbors working together can accomplish. Now, in our fifth year, with your help, we\u2019re ready to build on that progress.',
      'Together we can build community resilience not just to survive what\u2019s ahead, but to create a healthier, safer, and more connected community.'
    ]
  },

  // Ways to give.
  //   form 'phase'   = follows the date rule above
  //   form 'contact' = opens an email to org.contactEmail (for leadership gifts and checks)
  //   hideIfSameAsMain = hide this card while it would repeat the main button's link
  waysIntro: 'Choose a one-time gift, steady monthly giving, or become an ANCA Guardian and provide major support.',
  ways: [
    { kicker: 'One time', title: 'Give today',
      text: 'A one-time gift of any amount is\nalways welcome.\nEvery contribution is appreciated.',
      form: 'phase', button: 'Give today' },
    { kicker: 'Monthly', title: 'Become a Climate Hero',
      text: 'Regular monthly support helps ANCA sustain existing programs and meet increasing challenges.',
      form: 'climateHero', button: 'Give monthly or one time' },
    { kicker: 'Leadership gift', title: 'ANCA Guardian',
      text: 'A gift of $1,000 or more at a critical time helps ANCA strengthen and expand our programs and increase our impact.',
      form: 'guardian', button: 'Become an ANCA Guardian' }
  ],

  // Optional goal display, updated by hand for now. Turn on when a goal is ready.
  goal: { enabled: false, name: '', raised: 0, target: 0, updated: '' },

  // The 12 Days. Each day opens on its date and shows its content. Future days show only the date.
  // Add content as entries keyed by day number: 1: { title: '', text: '', action: '' }
  twelveDays: {
    enabled: false,   // switched off. The day-by-day copy below is kept for next year or for social posts.
    start: '2026-12-20',
    days: 12,
    blockPrefix: 'Building Block',
    givingPromptDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],   // every day shows a Give button on its own date, so one list covers the whole run. Remove a number to drop that day's button.
    promptButton: 'Give today',
    intro: 'One idea a day on building a resilient community, from food and water to shade and neighbors.',
    entries: {
      1: { title: 'Why neighbors', text: 'Climate resilience is built one neighborhood at a time. Over the next twelve days we will walk through ten building blocks of a climate-resilient community.', action: 'Say hello to a neighbor you have not talked with in a while.' },
      2: { title: 'Local, Sustainable Food System', text: 'A local food system keeps healthy food close to home and less dependent on long supply chains. Gardens, sharing between neighbors, and local growers all strengthen it.', action: 'Buy one item today from a local grower or farmers market.' },
      3: { title: 'Sustained Water Conservation', text: 'Every drop saved at home is one less drawn from a stressed supply. Small changes in how we water and wash add up across a whole neighborhood.', action: 'Check one sprinkler or faucet for leaks.' },
      4: { title: 'Protection of Biodiversity', text: 'Native plants, birds, and pollinators keep our local ecosystems healthy and better able to handle heat and drought. Even a small yard or balcony can give them a home.', action: 'Choose one native plant for your yard or balcony.' },
      5: { title: 'Disaster Preparedness at Neighborhood Level', text: 'Neighbors who know each other recover faster after an emergency. Map Your Neighborhood helps blocks make a plan before they need one.', action: 'Learn the names of the neighbors on either side of you.' },
      6: { title: 'Localized Economy', text: 'When we spend locally, more of that money circulates in our community and supports the neighbors who make Redlands what it is.', action: 'Give a gift from a local shop or maker.' },
      7: { title: 'Energy Efficient Homes & Businesses', text: 'Efficient buildings cost less to run and put less carbon in the air. Simple steps, from lighting to insulation, help households and small businesses alike.', action: 'Switch one bulb to LED or unplug one idle device.' },
      8: { title: 'Localized Accessible Health Care', text: 'A resilient community has health care people can reach close to home, especially during heat waves, smoke, and other disruptions.', action: 'Check in on a neighbor who may have trouble getting care.' },
      9: { title: 'Zero Waste Community', text: 'The best waste is the waste we never make. Repair Café shows how mending what we own saves money and keeps things out of the landfill.', action: 'Repair or reuse one item instead of throwing it away.' },
      10: { title: 'Low Carbon Transportation System', text: 'Walking, biking, carpooling, and transit cut emissions and make our streets safer and more connected.', action: 'Walk or bike one trip you would normally drive.' },
      11: { title: 'Cooler Homes & Neighborhoods', text: 'Shade trees, lighter surfaces, and cooler streets protect neighbors from dangerous heat and lower energy bills.', action: 'Notice where your block lacks shade and talk it over with a neighbor.' },
      12: { title: 'Thank you', text: 'Thank you for building a more resilient Redlands with us. Your support carries this work into the new year.', action: 'Share this page with one neighbor.' }
    }
  },

  // Only used if a matcher is found. Turn on and fill in.
  match: { enabled: false, matched: '', cap: '', window: '', howCounted: '', announcement: '' },

  // What ANCA does, in words. Drawn from the Programs page on the Hub. Linda to confirm they are current.
  // Each item: title, text, url (optional "Learn more" link), confirm (a note shown only in draft).
  programs: {
    enabled: true,
    heading: 'What ANCA does',
    intro: 'ANCA turns climate concern into community strength by providing education on sustainable-living practices, organizing neighborhoods to be prepared for more severe climate impacts, and mobilizing local networks to plan for working in a more challenging environment. At a time when things can feel overwhelming, ANCA helps residents rediscover their capacity to care for one another and act together.',
    moreLink: { label: 'Learn more \u2192', url: 'https://redlands-anca.hub.arcgis.com/pages/programs' },
    items: [
      { title: 'Speakers\u2019 Series',
        text: 'A monthly educational series on Resilient Living that helps our community members think more proactively about how we need to live in a future shaped by climate disruptions.',
        url: '' },
      { title: 'Map Your Neighborhood',
        text: 'Our disaster preparedness program brings neighborhoods together to create plans for how to respond to major disasters and learn other ways to become more resilient in these uncertain times.',
        url: 'https://redlands-anca.hub.arcgis.com/pages/map-your-neighborhood~3163fbe8118c4d04b23f395bf96cc88c' },
      { title: 'Repair Caf\u00e9',
        text: 'A popular quarterly event where skilled volunteers repair everyday items at no charge, reducing waste, saving money, and sharing skills that support sustainable living.',
        url: 'https://redlands-anca.hub.arcgis.com/pages/ecohub~0d973637c2b344b99620af238f04b6d9' },
      { title: 'Day of Climate Action',
        text: 'A city-wide day of action, learning, and celebration that inspires and motivates year-round sustainable living practices.',
        url: 'https://www.redlandsearthday.org/home' },
      { title: 'At-Risk Neighborhood Initiative',
        text: 'A coalition of residents and organizations that provides neighborhoods most at-risk from climate impacts with useful information, local resources, and opportunities to participate in preparing for a more challenging future.',
        url: '' }
    ]
  },

  // Names only, no amounts. Only list people who agreed to be named. Empty hides the section.
  supporters: { heading: 'Our supporters', intro: '', names: [], note: '' },

  // Other ways to help. Empty url hides the button on the live page. 'share' copies or shares this page's link.
  help: [
    { label: 'Volunteer',       url: 'https://redlands-anca.hub.arcgis.com/pages/get-involved' },
    { label: 'Share this page', url: 'share' }
  ],

  footer: {
    taxLine: 'ANCA Redlands is a 501(c)(3) nonprofit.',
    note: 'Gifts are processed by Zeffy.'
  },

  // Optional visit counting without cookies. Paste a GoatCounter site code to turn on.
  analytics: { goatcounter: '' }
};

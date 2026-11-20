# ANCA giving campaign page

A single-page site for ANCA's giving campaigns. It is plain files (no build step, nothing to install) and is meant to be reused: the next campaign is a new `config.js`.

## What is in this folder

| File | What it is |
| --- | --- |
| `config.js` | The only file you normally edit: theme, form links, dates, text slots, approvals. |
| `index.html` | The page shell. Holds the social preview tags and a `noindex` line. |
| `app.js` | Builds the page from `config.js`. Rarely needs changes. |
| `styles.css` | Colors and layout (ANCA navy and green). |
| `404.html` | Friendly "not found" page. |
| `assets/` | Logo, favicon, social preview image (`og-image.png`). |

## How the page behaves

- **Draft mode** (`status: 'draft'`): a review ribbon at the top, dashed slots where content is missing, and a setup checklist at the bottom listing what is still open.
- **Live mode** (`status: 'live'`): no ribbon, no checklist. Any button or section with no content is hidden rather than shown empty.
- **Date-driven button.** The main button follows `phases` in `config.js`: year-end form from Nov 17, Giving Tuesday form on Dec 1, year-end form again from Dec 2, then the monthly Climate Hero form after Dec 31. Dates use Pacific time.
- **Previewing.** Add `?date=2026-12-01` to the address to see another day. Add `?src=facebook` to see a source tag. Both work in draft and live mode.
- **Source tags.** Any `?src=` (or `?utm_source=`) on the page address is added to the Zeffy links as `utm_source`, along with `utm_campaign`. Whether Zeffy records these has not been confirmed. Test one gift, and check the export, before relying on it.


## Content you can add in config.js

- **Why we are asking** (`need.paragraphs`): one string per paragraph, from Linda's approved letter.
- **The 12 Days** (`twelveDays.entries`): add one entry per day, keyed by day number, for example `3: { title: 'Title', text: 'One or two sentences.', action: 'One thing to try.' }`. Each day opens on its date and shows its content. Future days show only the date. Days listed in `givingPromptDays` show a Give button on their own day. In draft mode, the "Preview a day" links show how any day will look.
- **What ANCA does** (`programs.items`): short descriptions of running programs, drawn from the Hub Programs page. No numbers. Set `approved.programs` to `true` once Linda confirms them.
- **Leadership gift:** set `org.contactEmail` (who receives the emails) and `org.mailingAddress` (for checks). Until the email is set, the card is hidden on the live page.
- **Supporters** (`supporters.names`): names only, no amounts. Add only people who agreed to be named. The section stays hidden while the list is empty.
- **Social links** are already set to ANCA's Facebook and Instagram pages from the Hub site. Add LinkedIn when it exists.

## Updating the page

1. Open `config.js` in GitHub and click the pencil icon.
2. Change the values and click "Commit changes". The site updates in about a minute.
3. To review before publishing, use `status: 'draft'`. Switch to `'live'` when approved.

## Going live: checklist

1. All approvals in `config.js` set to `true` (theme, need, tax wording) and the setup checklist on the draft page shows nothing important left.
2. Zeffy links pasted for the year-end, Giving Tuesday, and Climate Hero forms (and Guardian, if it exists).
3. Statement of need pasted from Linda's approved letter.
4. Domain connected (see below), and HTTPS turned on in the Pages settings.
5. In `index.html`: delete the `noindex` line, and update the two `og:` URLs to the final address.
6. `status` changed to `'live'`.
7. Test one gift on each form, on a phone and a computer.

## Publishing on GitHub Pages

1. Upload every file in this folder to the repository (drag the files and the `assets` folder into GitHub's "Add file > Upload files").
2. In the repository, go to Settings > Pages. Choose "Deploy from a branch", branch `main`, folder `/ (root)`, and save.
3. The site appears at the GitHub address. Keep it to the team until step "Domain" is done.

## Domain: give.ancaredlands.org

Do this only after the page is ready to share. Add one record at GoDaddy and touch nothing else, because the main ancaredlands.org address points at the Hub.

| Field | Value |
| --- | --- |
| Type | CNAME |
| Name | give |
| Value | anca-redlands.github.io |
| TTL | 1 hour (or the default) |

Then:

1. In GitHub, Settings > Pages > Custom domain, enter `give.ancaredlands.org` and save.
2. Wait until GitHub shows the DNS check passing, then turn on "Enforce HTTPS".
3. Do not add a `CNAME` file to the repository by hand before the DNS record exists. GitHub creates it when you save the custom domain. Adding it early makes the GitHub address redirect to a domain that does not work yet.
4. In GitHub, consider verifying the domain at the account level (Settings > Pages > Add a domain). It stops anyone else from claiming the subdomain. GitHub will show a TXT record to add at GoDaddy.

## Ownership and handoff

- The repository should belong to an account owned by ANCA, with at least two people who can administer it, and two-factor sign-in on.
- Record the account, the owners, the recovery email, and the GoDaddy record in ANCA's access register. Never store passwords in this repository or the register.
- The repository is public on the free plan. Nothing private (donor data, passwords, internal notes) belongs in it.

## Optional: visit counting

Set `analytics.goatcounter` in `config.js` to a GoatCounter site code to count visits without cookies. This only runs in live mode. It needs a GoatCounter account, which has not been set up. Check their terms for a nonprofit before enabling it.

## Limits to know about

- The page is built by JavaScript. Visitors with JavaScript off see a short message pointing to ancaredlands.org.
- The social preview tags are fixed text in `index.html`, so they show the page description, not the date-driven wording.
- Goal progress is typed into `config.js` by hand. Pulling it from the tracking sheet is a later step.
- Terms of GitHub Pages restrict use as a store or payment page. This page links to Zeffy and takes no payments itself, but confirm the current wording before launch.

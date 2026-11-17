(function () {
  'use strict';
  var C = window.CAMPAIGN;
  if (!C) { return; }

  var qs = new URLSearchParams(location.search);
  var isLive = C.status === 'live';

  /* ---------- helpers ---------- */
  function el(tag, props, kids) {
    var n = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      if (k === 'text') { n.textContent = props[k]; }
      else if (k === 'class') { n.className = props[k]; }
      else { n.setAttribute(k, props[k]); }
    });
    (kids || []).forEach(function (c) { if (c) { n.appendChild(c); } });
    return n;
  }
  function section(id, cls, headingText, lead) {
    var wrap = el('div', { class: 'wrap' });
    var s = el('section', { id: id, class: cls || '' }, [wrap]);
    if (headingText) { wrap.appendChild(el('h2', { text: headingText })); }
    if (lead) { wrap.appendChild(el('p', { class: 'lead', text: lead })); }
    return { node: s, wrap: wrap };
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function addDays(iso, n) {
    var p = iso.split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + n));
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
  }
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function shortDate(iso) { var p = iso.split('-'); return MONTHS[+p[1] - 1] + ' ' + (+p[2]); }

  /* ---------- today, phase, source ---------- */
  var today;
  try {
    today = new Intl.DateTimeFormat('en-CA', { timeZone: C.timezone || 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  } catch (e) {
    var t = new Date(); today = t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate());
  }
  var dateOverride = qs.get('date');
  if (dateOverride && /^\d{4}-\d{2}-\d{2}$/.test(dateOverride)) { today = dateOverride; }

  var phase = null;
  (C.phases || []).some(function (p) { if (today >= p.from && today <= p.to) { phase = p; return true; } return false; });
  if (!phase) { phase = (C.phases || [])[0]; }

  var src = (qs.get('src') || qs.get('utm_source') || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);

  function formKeyFor(key) { return key === 'phase' ? phase.form : key; }
  function giveUrl(key) {
    var f = (C.forms || {})[formKeyFor(key)];
    if (!f || !f.url) { return ''; }
    if (!src) { return f.url; }
    try {
      var u = new URL(f.url);
      u.searchParams.set('utm_source', src);
      u.searchParams.set('utm_campaign', C.campaignId || 'campaign');
      return u.toString();
    } catch (e) { return f.url; }
  }

  function giveButton(cls, label, key) {
    var url = giveUrl(key);
    if (url) { return el('a', { class: 'btn ' + cls, href: url, rel: 'noopener', text: label }); }
    if (isLive) { return null; }
    return el('a', { class: 'btn ' + cls, 'aria-disabled': 'true', role: 'link', title: 'Form link not set yet', text: label });
  }

  /* ---------- build page ---------- */
  var app = document.getElementById('app');
  var theme = C.theme || {};
  var org = C.org || {};
  var missing = [];

  // draft ribbon
  if (!isLive) {
    var rtxt = 'Draft for review. Wording and links are placeholders until approved.';
    if (dateOverride) { rtxt += ' Previewing as of ' + today + '.'; }
    var rib = el('div', { class: 'ribbon', role: 'note' }, [el('div', { class: 'wrap' }, [el('b', { text: 'Draft' }), document.createTextNode(rtxt)])]);
    app.appendChild(rib);
  }

  // header
  var nav = el('nav', { 'aria-label': 'Page sections' });
  var header = el('header', { class: 'site-header' }, [el('div', { class: 'wrap' }, [
    el('a', { class: 'brand', href: org.home || '#', 'aria-label': (org.name || 'ANCA') + ' home page' }, [
      el('img', { src: 'assets/logo.png', alt: '', width: '48', height: '48' }),
      el('div', {}, [el('b', { text: org.name || 'ANCA Redlands' }), el('span', { text: org.tagline || '' })])
    ]),
    nav
  ])]);
  app.appendChild(header);

  var main = el('main', { id: 'main' });
  app.appendChild(main);
  var navItems = [];
  function addNav(id, label) { navItems.push([id, label]); }

  // hero
  var heroBtns = el('div', { class: 'cta-row' });
  var b1 = giveButton('primary', phase.button, 'phase');
  var b2 = phase.form !== 'climateHero' ? giveButton('ghost', 'Become a monthly Climate Hero', 'climateHero') : null;
  if (b1) { heroBtns.appendChild(b1); }
  if (b2) { heroBtns.appendChild(b2); }
  main.appendChild(el('section', { class: 'hero' }, [el('div', { class: 'wrap' }, [
    el('span', { class: 'tag', text: phase.tag }),
    el('h1', { text: theme.headline || '' }),
    el('p', { class: 'sub', text: theme.subline || '' }),
    heroBtns
  ])]));

  // need
  var need = C.need || {};
  var needParas = (need.paragraphs || []).filter(Boolean);
  if (needParas.length) {
    var sn = section('need', 'alt', need.heading || 'Why we are asking');
    var prose = el('div', { class: 'prose' });
    needParas.forEach(function (p) { prose.appendChild(el('p', { text: p })); });
    sn.wrap.appendChild(prose);
    main.appendChild(sn.node); addNav('need', 'Why we ask');
  } else if (!isLive) {
    var sn2 = section('need', 'alt', need.heading || 'Why we are asking');
    sn2.wrap.appendChild(el('div', { class: 'slot', text: 'Statement of need goes here, taken from Linda\'s approved letter. Add it to config.js under need.paragraphs.' }));
    main.appendChild(sn2.node); addNav('need', 'Why we ask');
    missing.push('Statement of need (from Linda\'s letter) is empty.');
  }

  // ways to give
  var cards = [];
  (C.ways || []).forEach(function (w) {
    var url = giveUrl(w.form);
    if (!url && isLive) { return; }
    if (!url) { missing.push('Form link missing for "' + w.title + '" (' + formKeyFor(w.form) + ').'); }
    var label = w.form === 'phase' ? phase.button : w.button;
    var h3kids = [document.createTextNode(w.title)];
    if (!isLive && w.confirm) { h3kids.push(el('span', { class: 'flag', text: 'to confirm' })); }
    var h3 = el('h3'); h3kids.forEach(function (k) { h3.appendChild(k); });
    var btn = giveButton(w.form === 'guardian' ? 'outline' : 'dark', label, w.form);
    cards.push(el('article', { class: 'card' }, [
      el('div', { class: 'kicker', text: w.kicker }), h3, el('p', { text: w.text }), btn
    ]));
  });
  if (cards.length) {
    var sw = section('give', '', 'Ways to give');
    var g = el('div', { class: 'grid3' }); cards.forEach(function (c) { g.appendChild(c); });
    sw.wrap.appendChild(g);
    main.appendChild(sw.node); addNav('give', 'Ways to give');
  }

  // challenges
  var td = C.twelveDays || {};
  var goal = C.goal || {};
  var match = C.match || {};
  if (td.enabled || goal.enabled || match.enabled) {
    var sc = section('challenges', 'alt', 'Challenges');
    if (goal.enabled && goal.target > 0) {
      var pct = Math.max(0, Math.min(100, Math.round((goal.raised / goal.target) * 100)));
      var money = function (n) { return '$' + Number(n).toLocaleString('en-US'); };
      var bar = el('div', { class: 'bar', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(pct), 'aria-label': 'Progress toward goal' }, [el('i', { style: 'width:' + pct + '%' })]);
      var prog = el('div', { class: 'progress' }, [
        el('div', { class: 'row' }, [el('span', { text: goal.name || 'Current goal' }), el('span', { text: money(goal.raised) + ' of ' + money(goal.target) })]),
        bar,
        goal.updated ? el('small', { text: 'Updated ' + goal.updated }) : null
      ]);
      sc.wrap.appendChild(prog);
    }
    if (td.enabled) {
      var end = addDays(td.start, td.days - 1);
      sc.wrap.appendChild(el('h3', { text: 'The 12 Days, ' + shortDate(td.start) + ' to ' + shortDate(end).replace(/^\w+ /, '') }));
      sc.wrap.appendChild(el('p', { class: 'lead', text: (td.intro || '') + ' A giving prompt appears on a few of the days, and the days around December 24 and 25 stay light.' }));
      var list = el('ol', { class: 'days' });
      for (var i = 1; i <= td.days; i++) {
        var iso = addDays(td.start, i - 1);
        var title = (td.titles && td.titles[i]) || (td.blockPrefix + ' ' + (i - 1));
        var isGift = (td.givingPromptDays || []).indexOf(i) !== -1;
        var cls = 'day' + (isGift ? ' gift' : '') + (iso < today ? ' past' : '') + (iso === today ? ' today' : '');
        var li = el('li', { class: cls }, [
          el('b', { text: 'Day ' + i }), el('span', { text: shortDate(iso) }), el('em', { text: title }),
          isGift ? el('span', { text: 'Giving prompt' }) : null
        ]);
        if (iso === today) { li.setAttribute('aria-current', 'date'); }
        list.appendChild(li);
      }
      sc.wrap.appendChild(list);
    }
    if (match.enabled) {
      var rows = [['Matched', match.matched], ['Cap', match.cap], ['Window', match.window], ['How gifts count', match.howCounted], ['Announcement', match.announcement]];
      var dl = el('dl');
      rows.forEach(function (r) { if (r[1]) { dl.appendChild(el('dt', { text: r[0] })); dl.appendChild(el('dd', { text: r[1] })); } });
      sc.wrap.appendChild(el('div', { class: 'match' }, [el('h3', { text: 'Match' }), dl]));
    }
    main.appendChild(sc.node); addNav('challenges', 'Challenges');
  }

  // stats
  var stats = (C.stats || []).filter(function (s) { return s && s.value; });
  if (stats.length) {
    var ss = section('impact', '', 'What ANCA does');
    var sg = el('div', { class: 'stats' });
    stats.slice(0, 3).forEach(function (s) {
      sg.appendChild(el('div', { class: 'stat' }, [el('strong', { text: s.value }), el('span', { text: s.label || '' }), s.source ? el('small', { text: 'Source: ' + s.source }) : null]));
    });
    ss.wrap.appendChild(sg);
    main.appendChild(ss.node); addNav('impact', 'Our work');
  } else if (!isLive) {
    missing.push('Impact numbers: add up to three verified numbers, each with a source (optional section, hidden until filled).');
  }

  // help
  var helpBtns = [];
  (C.help || []).forEach(function (h) {
    if (h.url === 'share') {
      var sb = el('button', { type: 'button', class: 'btn outline', text: h.label });
      sb.addEventListener('click', function () {
        var shareUrl = location.origin + location.pathname;
        if (navigator.share) { navigator.share({ title: document.title, url: shareUrl }).catch(function () {}); return; }
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareUrl).then(function () { sb.textContent = 'Link copied'; setTimeout(function () { sb.textContent = h.label; }, 2200); });
        }
      });
      helpBtns.push(sb);
    } else if (h.url) {
      helpBtns.push(el('a', { class: 'btn outline', href: h.url, text: h.label }));
    } else if (!isLive) {
      helpBtns.push(el('a', { class: 'btn outline', 'aria-disabled': 'true', role: 'link', title: 'Link not set yet', text: h.label }));
      missing.push('Link missing for "' + h.label + '" button (Other ways to help).');
    }
  });
  if (helpBtns.length) {
    var sh = section('help', 'alt', 'Other ways to help', 'Not ready to give? These count too.');
    var hb = el('div', { class: 'help' }); helpBtns.forEach(function (b) { hb.appendChild(b); });
    sh.wrap.appendChild(hb);
    main.appendChild(sh.node); addNav('help', 'Other ways to help');
  }

  // footer
  var f = C.footer || {};
  var col1 = el('div', {}, [el('strong', { text: org.name || '' }), el('br'), document.createTextNode(org.tagline || '')]);
  if (org.mailingAddress) { col1.appendChild(el('br')); col1.appendChild(document.createTextNode(org.mailingAddress)); }
  if (org.contactEmail) { col1.appendChild(el('br')); col1.appendChild(el('a', { href: 'mailto:' + org.contactEmail, text: org.contactEmail })); }
  var col2 = el('div', {}, [document.createTextNode(f.taxLine || '')]);
  var col3 = el('div', {}, [document.createTextNode(f.note || '')]);
  var soc = org.social || {};
  var socKids = [];
  [['facebook', 'Facebook'], ['instagram', 'Instagram'], ['linkedin', 'LinkedIn']].forEach(function (p) {
    if (soc[p[0]]) { socKids.push(el('a', { href: soc[p[0]], rel: 'noopener', text: p[1] })); }
  });
  if (socKids.length) { var sd = el('div', { class: 'social' }); socKids.forEach(function (k) { sd.appendChild(k); }); col3.appendChild(el('br')); col3.appendChild(sd); }
  col3.appendChild(el('br')); col3.appendChild(el('a', { href: '#main', text: 'Back to top' }));
  app.appendChild(el('footer', {}, [el('div', { class: 'wrap cols' }, [col1, col2, col3])]));

  // nav links
  navItems.forEach(function (n) { nav.appendChild(el('a', { href: '#' + n[0], text: n[1] })); });
  nav.appendChild(el('a', { href: org.home || '#', text: 'ancaredlands.org' }));

  /* ---------- draft-only checklist ---------- */
  if (!isLive) {
    var a = C.approved || {};
    if (!a.theme) { missing.push('Theme is a placeholder. Milan to approve the final wording.'); }
    if (!a.need) { missing.push('Statement of need not yet approved.'); }
    if (!a.tax) { missing.push('Tax-deduction wording not yet confirmed with the CPA.'); }
    if (!org.contactEmail) { missing.push('Contact email is empty (hidden until set).'); }
    if (!(C.analytics && C.analytics.goatcounter)) { missing.push('Visit counting is off (optional).'); }
    if (/github\.io$/.test(location.hostname)) { missing.push('Still on the GitHub address. Do not put this link in public emails or posts until it is on the ANCA domain.'); }
    missing.push('Before going live: set status to "live" in config.js and remove the noindex line in index.html.');
    var ul = el('ul'); missing.forEach(function (m) { ul.appendChild(el('li', { text: m })); });
    app.appendChild(el('section', { class: 'checklist', 'aria-label': 'Setup checklist' }, [el('div', { class: 'wrap' }, [
      el('h2', { text: 'Setup checklist (shows only while in draft)' }),
      el('p', { text: 'Preview other dates with ?date=2026-12-01 and source tags with ?src=facebook on the address.' }),
      ul
    ])]));
  }

  /* ---------- optional analytics ---------- */
  if (C.analytics && C.analytics.goatcounter && isLive) {
    var s = document.createElement('script');
    s.async = true;
    s.src = '//gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', 'https://' + C.analytics.goatcounter + '.goatcounter.com/count');
    document.body.appendChild(s);
  }

  document.title = (org.name || 'ANCA Redlands') + ': ' + (theme.headline || 'Support our work');
})();

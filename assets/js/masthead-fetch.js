// Single source of truth for live masthead values: Hermes version, Hermes Atlas
// star count, and repo count. Loaded by every page that ships the standard
// masthead so that all headers reflect the same data — driven by /api/stars,
// which reads the latest GitHub release for NousResearch/hermes-agent.
(function () {
  fetch('/api/stars')
    .then(function (r) { return r.ok && r.json(); })
    .then(function (d) {
      if (!d) return;
      var v = document.getElementById('meta-version');
      if (v && d.hermes && d.hermes.version) v.textContent = 'hermes·' + d.hermes.version;
      var a = document.getElementById('meta-atlas');
      if (a && d.atlas && d.atlas.stars) a.textContent = '★ ' + d.atlas.stars + ' · star this repo';
      var c = document.getElementById('meta-count');
      if (c && d.totals && d.totals.count) c.textContent = d.totals.count + '·repos';
    })
    .catch(function () {});
})();

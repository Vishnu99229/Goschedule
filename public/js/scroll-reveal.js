;(function () {
  if (!window.IntersectionObserver) {
    document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(function (el) {
      el.classList.add('pp-reveal--visible')
    })
    return
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(function (el) {
      el.classList.add('pp-reveal--visible')
    })
    return
  }

  var opts = { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('pp-reveal--visible')
      }
    })
  }, opts)

  document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(function (el) {
    obs.observe(el)
  })
})()

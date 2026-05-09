;(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel)
  }

  function initNav() {
    var toggle = qs('[data-nav-mobile-toggle]')
    var sheet = qs('[data-nav-mobile-sheet]')
    var backdrop = qs('[data-nav-mobile-backdrop]')
    var productsBtn = qs('[data-nav-products-toggle]')
    var productsWrap = qs('[data-nav-products]')

    function setOpen(open) {
      if (!sheet || !toggle) return
      sheet.classList.toggle('nav-mobile-sheet--open', open)
      if (backdrop) backdrop.classList.toggle('nav-mobile-backdrop--visible', open)
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
      document.body.style.overflow = open ? 'hidden' : ''
    }

    function setProductsOpen(open) {
      if (!productsWrap || !productsBtn) return
      productsWrap.classList.toggle('nav-mobile-products--open', open)
      productsBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = !sheet.classList.contains('nav-mobile-sheet--open')
        setOpen(open)
        if (!open) setProductsOpen(false)
      })
    }
    if (backdrop) {
      backdrop.addEventListener('click', function () {
        setOpen(false)
        setProductsOpen(false)
      })
    }
    if (productsBtn && productsWrap) {
      productsBtn.addEventListener('click', function () {
        var open = !productsWrap.classList.contains('nav-mobile-products--open')
        setProductsOpen(open)
      })
    }

    if (sheet) {
      sheet.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          setOpen(false)
          setProductsOpen(false)
        })
      })
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setOpen(false)
        setProductsOpen(false)
      }
    })
    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setOpen(false)
        setProductsOpen(false)
      }
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav)
  } else {
    initNav()
  }
})()

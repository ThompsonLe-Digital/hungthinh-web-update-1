// Mobile nav toggle + submenu toggle for touch devices
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var navlinks = document.querySelector('.navlinks');
  if (toggle && navlinks) {
    toggle.addEventListener('click', function () {
      navlinks.classList.toggle('open');
      var expanded = navlinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  document.querySelectorAll('.has-sub > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Filter pills on đơn hàng page (visual filtering only)
  var pills = document.querySelectorAll('.filter-pill');
  var orderCards = document.querySelectorAll('[data-industry]');
  if (pills.length && orderCards.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        var target = pill.getAttribute('data-filter');
        orderCards.forEach(function (card) {
          var show = target === 'all' || card.getAttribute('data-industry') === target;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Animate hero stat numbers once, on load
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var current = 0;
    var steps = 36;
    var inc = target / steps;
    var timer = setInterval(function () {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current).toLocaleString('vi-VN') + suffix;
    }, 28);
  });
});

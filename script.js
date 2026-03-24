const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.06}s`;
  observer.observe(item);
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('[data-panel]'));

function activateTab(nextTab, moveFocus = false) {
  if (!nextTab) return;
  const target = nextTab.dataset.tab;

  tabs.forEach((tab) => {
    const isActive = tab === nextTab;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
    tab.setAttribute('tabindex', isActive ? '0' : '-1');
    if (isActive && moveFocus) tab.focus();
  });

  panels.forEach((panel) => {
    const isMatch = panel.dataset.panel === target;
    panel.classList.toggle('is-visible', isMatch);
    panel.hidden = !isMatch;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') return activateTab(tabs[0], true);
    if (event.key === 'End') return activateTab(tabs[tabs.length - 1], true);
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + tabs.length) % tabs.length;
    activateTab(tabs[nextIndex], true);
  });
});

function canSubmitWithCooldown(key, seconds) {
  const now = Date.now();
  const until = Number(localStorage.getItem(`cooldown_${key}`) || 0);
  if (now < until) return { ok: false, waitSeconds: Math.ceil((until - now) / 1000) };
  localStorage.setItem(`cooldown_${key}`, String(now + seconds * 1000));
  return { ok: true, waitSeconds: 0 };
}

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('form-status');

if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const honeypot = contactForm.querySelector('input[name="website"]');
    if (honeypot && honeypot.value.trim() !== '') {
      contactStatus.textContent = 'Submission blocked.';
      return;
    }

    const rate = canSubmitWithCooldown(contactForm.dataset.rateKey || 'contact', Number(contactForm.dataset.rateSeconds || 45));
    if (!rate.ok) {
      contactStatus.textContent = `Please wait ${rate.waitSeconds}s before submitting again.`;
      return;
    }

    contactStatus.textContent = 'Sending...';
    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://formsubmit.co/ajax/shubhampanchal9168@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });
      if (!response.ok) throw new Error('submit failed');
      contactForm.reset();
      contactStatus.textContent = 'Message sent. I will reply soon.';
    } catch {
      contactStatus.textContent = 'Send failed. Please email me directly.';
    }
  });
}

const qaForm = document.getElementById('qa-form');
const qaList = document.getElementById('qa-list');
const qaStatus = document.getElementById('qa-status');

if (qaForm && qaList) {
  qaForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const honeypot = qaForm.querySelector('input[name="website"]');
    if (honeypot && honeypot.value.trim() !== '') {
      if (qaStatus) qaStatus.textContent = 'Submission blocked.';
      return;
    }

    const rate = canSubmitWithCooldown(qaForm.dataset.rateKey || 'qa', Number(qaForm.dataset.rateSeconds || 20));
    if (!rate.ok) {
      if (qaStatus) qaStatus.textContent = `Please wait ${rate.waitSeconds}s before asking again.`;
      return;
    }

    const input = qaForm.querySelector('#qa-question');
    const value = input ? input.value.trim() : '';
    if (!value) return;

    const now = new Date();
    const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    const item = document.createElement('article');
    item.className = 'qa-item';
    item.innerHTML = `<p class="qa-date">${date}</p><h3>${value}</h3><p>Great question. I will answer this soon with a practical, field-tested response.</p><p class="qa-meta">0 likes</p>`;
    qaList.prepend(item);
    qaForm.reset();
    if (qaStatus) qaStatus.textContent = 'Question added.';
  });
}

const stackCards = Array.from(document.querySelectorAll('.stack-card'));
const stackLocation = document.getElementById('stack-location');
const stackCarousel = document.getElementById('stack-carousel');

if (stackCards.length > 0) {
  let activeIndex = 0;
  let stackTimer = null;
  const orderClasses = ['is-front', 'is-right', 'is-left', 'is-top', 'is-back', 'is-back'];

  function renderStack() {
    stackCards.forEach((card, index) => {
      ['is-front', 'is-right', 'is-left', 'is-top', 'is-back'].forEach((name) => card.classList.remove(name));
      const order = (index - activeIndex + stackCards.length) % stackCards.length;
      card.classList.add(orderClasses[order] || 'is-back');
    });
    if (stackLocation) stackLocation.textContent = stackCards[activeIndex].dataset.location || 'Unknown';
  }

  function startStackTimer() {
    if (stackTimer) return;
    stackTimer = setInterval(() => {
      activeIndex = (activeIndex + 1) % stackCards.length;
      renderStack();
    }, 3800);
  }

  function stopStackTimer() {
    if (!stackTimer) return;
    clearInterval(stackTimer);
    stackTimer = null;
  }

  stackCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      activeIndex = index;
      renderStack();
    });
  });

  if (stackCarousel) {
    stackCarousel.addEventListener('mouseenter', stopStackTimer);
    stackCarousel.addEventListener('mouseleave', startStackTimer);
    stackCarousel.addEventListener('focusin', stopStackTimer);
    stackCarousel.addEventListener('focusout', startStackTimer);
  }

  renderStack();
  startStackTimer();
}

const copyEmailBtn = document.getElementById('copy-email');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = copyEmailBtn.dataset.email || '';
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      copyEmailBtn.textContent = 'Copied';
      setTimeout(() => {
        copyEmailBtn.textContent = copyEmailBtn.classList.contains('icon-btn') ? 'Copy' : 'Copy Email';
      }, 1500);
    } catch {
      copyEmailBtn.textContent = 'Failed';
      setTimeout(() => {
        copyEmailBtn.textContent = copyEmailBtn.classList.contains('icon-btn') ? 'Copy' : 'Copy Email';
      }, 1500);
    }
  });
}

const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('loading' in HTMLImageElement.prototype) {
  lazyImages.forEach(() => {});
}

document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const url = link.getAttribute('href');
    if (!url) return;
    if (url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('http')) return;
    if (link.target === '_blank') return;
    event.preventDefault();
    document.body.classList.add('is-leaving');
    setTimeout(() => {
      window.location.href = url;
    }, 180);
  });
});

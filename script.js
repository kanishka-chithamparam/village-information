// Small interactions: nav toggle, counters, contact form local save, gallery lightbox, load more events
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // responsive nav
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  // count up animation
  const counters = document.querySelectorAll('.num');
  counters.forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const step = Math.ceil(target / 120);
    const tick = () => {
      count += step;
      if (count >= target) el.textContent = target;
      else { el.textContent = count; requestAnimationFrame(tick); }
    };
    tick();
  });

  // gallery lightbox (simple)
  const galleryGrid = document.getElementById('galleryGrid');
  galleryGrid.addEventListener('click', e => {
    if (e.target.tagName !== 'IMG') return;
    const src = e.target.src;
    const overlay = document.createElement('div');
    overlay.style.position='fixed';
    overlay.style.top=0; overlay.style.left=0; overlay.style.right=0; overlay.style.bottom=0;
    overlay.style.background='rgba(0,0,0,0.8)'; overlay.style.display='flex'; overlay.style.alignItems='center';
    overlay.style.justifyContent='center'; overlay.style.zIndex=9999;
    const img = document.createElement('img');
    img.src = src; img.style.maxWidth='90%'; img.style.maxHeight='90%'; img.style.borderRadius='8px';
    overlay.appendChild(img);
    overlay.addEventListener('click', () => document.body.removeChild(overlay));
    document.body.appendChild(overlay);
  });

  // contact form: local store and simple validation
  const form = document.getElementById('contactForm');
  const clearBtn = document.getElementById('clearBtn');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      message: form.querySelector('#message').value.trim(),
      time: new Date().toISOString()
    };
    if (!data.name || !data.email || !data.message) {
      alert('Please fill all fields.');
      return;
    }
    const stored = JSON.parse(localStorage.getItem('tv_messages') || '[]');
    stored.unshift(data);
    localStorage.setItem('tv_messages', JSON.stringify(stored));
    alert('Thanks — message saved locally.'); // replace with server call later
    form.reset();
  });
  clearBtn.addEventListener('click', () => form.reset());

  // Load more events (simulated)
  const loadMore = document.getElementById('loadMore');
  const eventsList = document.getElementById('eventsList');
  loadMore.addEventListener('click', () => {
    const more = [
      {date:'01 Oct 2026', title:'Village Clean-up'},
      {date:'21 Nov 2026', title:'Weavers Fair'},
      {date:'10 Dec 2026', title:'Winter Health Drive'}
    ];
    more.forEach(ev => {
      const li = document.createElement('li');
      li.innerHTML = `<div class="event-date">${ev.date}</div><div class="event-info"><strong>${ev.title}</strong> — Details coming soon.</div>`;
      eventsList.appendChild(li);
    });
    loadMore.disabled = true;
    loadMore.textContent = 'All loaded';
  });
});
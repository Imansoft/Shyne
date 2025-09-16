// events.js: Handles all event listeners
import { creatives, addCreative, removeCreative, approveCreative } from './data.js';
import { renderCreativesGrid, renderAdminTable, renderPortfolioCard } from './ui.js';

export function setupAdminEvents() {
  const adminTable = document.getElementById('adminCreativesTable');
  if (!adminTable) return;
  renderAdminTable(adminTable);
  adminTable.addEventListener('click', function (e) {
    if (e.target.classList.contains('approve-btn')) {
      const idx = e.target.getAttribute('data-idx');
      approveCreative(idx);
      renderAdminTable(adminTable);
    }
    if (e.target.classList.contains('remove-btn')) {
      const idx = e.target.getAttribute('data-idx');
      removeCreative(idx);
      renderAdminTable(adminTable);
    }
  });
}

export function setupCreativesGridEvents() {
  const grid = document.getElementById('creativesGrid');
  const searchName = document.getElementById('searchName');
  const filterCategory = document.getElementById('filterCategory');
  const filterLocation = document.getElementById('filterLocation');
  if (!grid) return;
  function filterCreatives() {
    let filtered = creatives;
    if (searchName && searchName.value.trim()) {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(searchName.value.trim().toLowerCase()));
    }
    if (filterCategory && filterCategory.value) {
      filtered = filtered.filter(c => c.category === filterCategory.value);
    }
    if (filterLocation && filterLocation.value.trim()) {
      filtered = filtered.filter(c => c.location.toLowerCase().includes(filterLocation.value.trim().toLowerCase()));
    }
    renderCreativesGrid(grid, filtered);
  }
  if (searchName) searchName.addEventListener('input', filterCreatives);
  if (filterCategory) filterCategory.addEventListener('change', filterCreatives);
  if (filterLocation) filterLocation.addEventListener('input', filterCreatives);
  renderCreativesGrid(grid, creatives);
}

export function setupContactModalEvents() {
  const grid = document.getElementById('creativesGrid');
  const contactModal = document.getElementById('contactModal');
  const closeContactModal = document.getElementById('closeContactModal');
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  let contactCreativeNameInput = document.getElementById('contactCreativeName');
  if (!grid || !contactModal) return;
  grid.addEventListener('click', function (e) {
    if (e.target.classList.contains('contact-btn')) {
      const creativeName = e.target.getAttribute('data-name');
      contactCreativeNameInput.value = creativeName;
      contactModal.classList.remove('hidden');
      contactSuccess.classList.add('hidden');
      contactForm.reset();
    }
  });
  if (closeContactModal) {
    closeContactModal.addEventListener('click', function () {
      contactModal.classList.add('hidden');
    });
  }
  if (contactModal) {
    contactModal.addEventListener('click', function (e) {
      if (e.target === contactModal) {
        contactModal.classList.add('hidden');
      }
    });
  }
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const creativeName = contactCreativeNameInput.value;
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      console.log(`Contact message for ${creativeName}:`, { name, email, message });
      contactSuccess.classList.remove('hidden');
      setTimeout(() => {
        contactModal.classList.add('hidden');
      }, 1500);
    });
  }
}

export function setupProfileFormEvents() {
  const form = document.getElementById('creativeSignUpForm');
  const profileSection = document.querySelector('section');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const category = form.category.value;
    const skills = form.skills.value.trim();
    const location = form.location.value.trim();
    const files = form.portfolio.files;
    const images = [];
    if (files && files.length > 0) {
      const readers = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        readers.push(new Promise((resolve) => {
          reader.onload = function (event) {
            images.push(event.target.result);
            resolve();
          };
          reader.readAsDataURL(files[i]);
        }));
      }
      Promise.all(readers).then(() => {
        const profile = { name, category, skills, location, images };
        addCreative(profile);
        renderPortfolioCard(profile, profileSection);
      });
    } else {
      const profile = { name, category, skills, location, images };
      addCreative(profile);
      renderPortfolioCard(profile, profileSection);
    }
    form.reset();
  });
}

// main.js: Entry point
import { setupAdminEvents, setupCreativesGridEvents, setupContactModalEvents, setupProfileFormEvents } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
  setupAdminEvents();
  setupCreativesGridEvents();
  setupContactModalEvents();
  setupProfileFormEvents();
});

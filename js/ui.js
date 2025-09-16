// ui.js: Handles DOM rendering
import { creatives } from './data.js';

export function renderCreativesGrid(grid, list) {
  grid.innerHTML = '';
  if (!list.length) {
    grid.innerHTML = '<div class="col-span-full text-center text-gray-400">No creatives found.</div>';
    return;
  }
  list.forEach(profile => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-5 flex flex-col items-center';
    card.innerHTML = `
      <div class="w-24 h-24 mb-3 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden">
        ${profile.images && profile.images.length ? `<img src="${profile.images[0]}" alt="Portfolio" class="object-cover w-full h-full">` : '<span class="text-gray-400 text-sm">No Image</span>'}
      </div>
      <h3 class="text-lg font-bold text-blue-700 mb-1 text-center">${profile.name}</h3>
      <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium mb-1">${profile.category}</span>
      <span class="text-gray-600 text-xs mb-2">${profile.location}</span>
      <button class="mt-3 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition contact-btn" data-name="${profile.name}">Contact</button>
    `;
    grid.appendChild(card);
  });
}

export function renderAdminTable(adminTable) {
  adminTable.innerHTML = '';
  if (!creatives.length) {
    adminTable.innerHTML = '<tr><td colspan="4" class="text-center text-gray-400 py-6">No creatives found.</td></tr>';
    return;
  }
  creatives.forEach((profile, idx) => {
    const row = document.createElement('tr');
    row.className = 'border-b';
    row.innerHTML = `
      <td class="py-3 px-4">${profile.name}</td>
      <td class="py-3 px-4">${profile.category}</td>
      <td class="py-3 px-4">
        <span class="${profile.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} px-2 py-1 rounded text-xs font-medium">${profile.status || 'Pending'}</span>
      </td>
      <td class="py-3 px-4 space-x-2">
        <button class="approve-btn px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs" data-idx="${idx}" ${profile.status === 'Approved' ? 'disabled' : ''}>Approve</button>
        <button class="remove-btn px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs" data-idx="${idx}">Remove</button>
      </td>
    `;
    adminTable.appendChild(row);
  });
}

export function renderPortfolioCard(profile, section) {
  let oldCard = document.getElementById('portfolioCard');
  if (oldCard) oldCard.remove();
  const card = document.createElement('div');
  card.id = 'portfolioCard';
  card.className = 'mt-8 bg-white rounded-lg shadow p-6';
  card.innerHTML = `
    <h3 class="text-xl font-bold text-blue-700 mb-2">${profile.name}</h3>
    <div class="flex flex-wrap gap-2 mb-2">
      <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">${profile.category}</span>
      <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">${profile.location}</span>
    </div>
    <p class="mb-2 text-gray-700"><span class="font-semibold">Skills:</span> ${profile.skills}</p>
    <div class="flex flex-wrap gap-3 mt-4">
      ${profile.images.map(img => `<img src="${img}" alt="Portfolio" class="w-24 h-24 object-cover rounded border">`).join('') || '<span class="text-gray-400">No images uploaded.</span>'}
    </div>
  `;
  section.appendChild(card);
}

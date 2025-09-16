// Admin Dashboard logic for admin.html
document.addEventListener('DOMContentLoaded', function () {
	const adminTable = document.getElementById('adminCreativesTable');
	if (adminTable) {
		// Ensure each creative has a status property
		creatives.forEach(c => { if (!c.status) c.status = 'Pending'; });

		function renderAdminTable() {
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

		// Handle Approve/Remove actions
		adminTable.addEventListener('click', function (e) {
			if (e.target.classList.contains('approve-btn')) {
				const idx = e.target.getAttribute('data-idx');
				creatives[idx].status = 'Approved';
				renderAdminTable();
			}
			if (e.target.classList.contains('remove-btn')) {
				const idx = e.target.getAttribute('data-idx');
				creatives.splice(idx, 1);
				renderAdminTable();
			}
		});

		renderAdminTable();
	}
});
// Render creatives grid and handle search/filter on creatives.html
document.addEventListener('DOMContentLoaded', function () {
	const grid = document.getElementById('creativesGrid');
	const searchName = document.getElementById('searchName');
	const filterCategory = document.getElementById('filterCategory');
	const filterLocation = document.getElementById('filterLocation');
	if (grid) {
		// Helper to render cards
		function renderCreatives(list) {
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

		// Filtering logic
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
			renderCreatives(filtered);
		}

		// Attach events
		if (searchName) searchName.addEventListener('input', filterCreatives);
		if (filterCategory) filterCategory.addEventListener('change', filterCreatives);
		if (filterLocation) filterLocation.addEventListener('input', filterCreatives);

		// Initial render
		renderCreatives(creatives);
	}
});
	// Contact Modal logic
	const contactModal = document.getElementById('contactModal');
	const closeContactModal = document.getElementById('closeContactModal');
	const contactForm = document.getElementById('contactForm');
	const contactSuccess = document.getElementById('contactSuccess');
	let contactCreativeNameInput = document.getElementById('contactCreativeName');

	// Open modal on Contact button click
	grid.addEventListener('click', function (e) {
		if (e.target.classList.contains('contact-btn')) {
			const creativeName = e.target.getAttribute('data-name');
			contactCreativeNameInput.value = creativeName;
			contactModal.classList.remove('hidden');
			contactSuccess.classList.add('hidden');
			contactForm.reset();
		}
	});

	// Close modal
	if (closeContactModal) {
		closeContactModal.addEventListener('click', function () {
			contactModal.classList.add('hidden');
		});
	}
	// Close modal on outside click
	if (contactModal) {
		contactModal.addEventListener('click', function (e) {
			if (e.target === contactModal) {
				contactModal.classList.add('hidden');
			}
		});
	}

	// Handle contact form submit
	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const creativeName = contactCreativeNameInput.value;
			const name = contactForm.name.value.trim();
			const email = contactForm.email.value.trim();
			const message = contactForm.message.value.trim();
			// Shared JavaScript for Shyne web app
			// Global array for creative profiles (mock database)
			const creatives = [
				{
					name: "Aisha Bello",
					category: "Photographer",
					skills: "Portrait, Event, Nature Photography",
					location: "Ilorin",
					images: ["images/placeholder.png", "images/placeholder.png"],
					status: "Approved"
				},
				{
					name: "Chinedu Okafor",
					category: "Designer",
					skills: "Branding, UI/UX, Illustration",
					location: "Ilorin",
					images: ["images/placeholder.png"],
					status: "Pending"
				},
				{
					name: "Fatima Yusuf",
					category: "Writer",
					skills: "Copywriting, Blogging, Editing",
					location: "Ilorin",
					images: ["images/placeholder.png", "images/placeholder.png", "images/placeholder.png"],
					status: "Approved"
				},
				{
					name: "Tunde Bakare",
					category: "Videographer",
					skills: "Event Coverage, Short Films, Editing",
					location: "Ilorin",
					images: ["images/placeholder.png"],
					status: "Pending"
				}
			];

			// Admin Dashboard logic for admin.html
			document.addEventListener('DOMContentLoaded', function () {
				const adminTable = document.getElementById('adminCreativesTable');
				if (adminTable) {
					// Ensure each creative has a status property
					creatives.forEach(c => { if (!c.status) c.status = 'Pending'; });

					function renderAdminTable() {
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

					// Handle Approve/Remove actions
					adminTable.addEventListener('click', function (e) {
						if (e.target.classList.contains('approve-btn')) {
							const idx = e.target.getAttribute('data-idx');
							creatives[idx].status = 'Approved';
							renderAdminTable();
						}
						if (e.target.classList.contains('remove-btn')) {
							const idx = e.target.getAttribute('data-idx');
							creatives.splice(idx, 1);
							renderAdminTable();
						}
					});

					renderAdminTable();
				}
			});

			// Render creatives grid and handle search/filter on creatives.html
			document.addEventListener('DOMContentLoaded', function () {
				const grid = document.getElementById('creativesGrid');
				const searchName = document.getElementById('searchName');
				const filterCategory = document.getElementById('filterCategory');
				const filterLocation = document.getElementById('filterLocation');
				if (grid) {
					// Helper to render cards
					function renderCreatives(list) {
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

					// Filtering logic
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
						renderCreatives(filtered);
					}

					// Attach events
					if (searchName) searchName.addEventListener('input', filterCreatives);
					if (filterCategory) filterCategory.addEventListener('change', filterCreatives);
					if (filterLocation) filterLocation.addEventListener('input', filterCreatives);

					// Initial render
					renderCreatives(creatives);

					// Contact Modal logic
					const contactModal = document.getElementById('contactModal');
					const closeContactModal = document.getElementById('closeContactModal');
					const contactForm = document.getElementById('contactForm');
					const contactSuccess = document.getElementById('contactSuccess');
					let contactCreativeNameInput = document.getElementById('contactCreativeName');

					// Open modal on Contact button click
					grid.addEventListener('click', function (e) {
						if (e.target.classList.contains('contact-btn')) {
							const creativeName = e.target.getAttribute('data-name');
							contactCreativeNameInput.value = creativeName;
							contactModal.classList.remove('hidden');
							contactSuccess.classList.add('hidden');
							contactForm.reset();
						}
					});

					// Close modal
					if (closeContactModal) {
						closeContactModal.addEventListener('click', function () {
							contactModal.classList.add('hidden');
						});
					}
					// Close modal on outside click
					if (contactModal) {
						contactModal.addEventListener('click', function (e) {
							if (e.target === contactModal) {
								contactModal.classList.add('hidden');
							}
						});
					}

					// Handle contact form submit
					if (contactForm) {
						contactForm.addEventListener('submit', function (e) {
							e.preventDefault();
							const creativeName = contactCreativeNameInput.value;
							const name = contactForm.name.value.trim();
							const email = contactForm.email.value.trim();
							const message = contactForm.message.value.trim();
							// Mock email: log to console
							console.log(`Contact message for ${creativeName}:`, { name, email, message });
							contactSuccess.classList.remove('hidden');
							setTimeout(() => {
								contactModal.classList.add('hidden');
							}, 1500);
						});
					}
				}
			});

			// Handle Creative Sign-Up Form (profile.html)
			document.addEventListener('DOMContentLoaded', function () {
				const form = document.getElementById('creativeSignUpForm');
				const profileSection = document.querySelector('section');
				if (form) {
					form.addEventListener('submit', function (e) {
						e.preventDefault();
						// Get form values
						const name = form.name.value.trim();
						const category = form.category.value;
						const skills = form.skills.value.trim();
						const location = form.location.value.trim();
						const files = form.portfolio.files;
						// Read images as data URLs
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
								saveAndDisplayProfile({ name, category, skills, location, images });
							});
						} else {
							saveAndDisplayProfile({ name, category, skills, location, images });
						}
					});
				}

				function saveAndDisplayProfile(profile) {
					creatives.push(profile);
					// Remove any previous card
					let oldCard = document.getElementById('portfolioCard');
					if (oldCard) oldCard.remove();
					// Create card
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
					profileSection.appendChild(card);
					// Optionally reset form
					form.reset();
				}
			});
        });
    }
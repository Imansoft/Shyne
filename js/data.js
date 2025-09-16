// data.js: Handles creatives data and mock data

export const creatives = [
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

export function addCreative(profile) {
  creatives.push(profile);
}

export function removeCreative(idx) {
  creatives.splice(idx, 1);
}

export function approveCreative(idx) {
  creatives[idx].status = 'Approved';
}

const STORAGE_KEY = 'rpbookkeeping-manager-draft-v1';

const defaults = {
  businessName: 'RP Bookkeeping Consultant (Pty) Ltd',
  pageTitle: 'RP Bookkeeping Consultant (Pty) Ltd',
  heroHeading: '',
  heroText: '',
  email: '',
  phone: '',
  whatsapp: 'https://chat.whatsapp.com/G47AhotCxSDLPO1NYkccWm?s=hd&p=i&mlu=4&ilr=4',
  primary: '#174a36',
  accent: '#c9a227',
  logo: '/resources/green-and-gold-logo.png'
};

const ids = Object.keys(defaults);
const status = document.querySelector('#saveStatus');
const preview = document.querySelector('#preview');

function getDraft() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return { ...defaults };
  try {
    return { ...defaults, ...JSON.parse(saved) };
  } catch {
    return { ...defaults };
  }
}

function setStatus(message) {
  status.textContent = message;
  window.clearTimeout(setStatus.timer);
  setStatus.timer = window.setTimeout(() => {
    status.textContent = 'Draft ready';
  }, 2500);
}

function loadDraft() {
  const draft = getDraft();
  ids.forEach((id) => {
    const field = document.querySelector(`#${id}`);
    if (field) field.value = draft[id] ?? '';
  });
  setStatus(localStorage.getItem(STORAGE_KEY) ? 'Draft loaded' : 'New draft');
}

function readDraft() {
  return ids.reduce((draft, id) => {
    const field = document.querySelector(`#${id}`);
    draft[id] = field?.value ?? '';
    return draft;
  }, {});
}

function saveDraft() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readDraft(), null, 2));
  setStatus('Draft saved on this device');
}

function exportDraft() {
  const data = JSON.stringify(readDraft(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rpbookkeeping-site-content.json';
  link.click();
  URL.revokeObjectURL(url);
  setStatus('Content exported');
}

document.querySelector('#saveBtn').addEventListener('click', saveDraft);
document.querySelector('#exportBtn').addEventListener('click', exportDraft);
document.querySelector('#refreshPreview').addEventListener('click', () => {
  preview.src = `/?managerPreview=${Date.now()}`;
  setStatus('Preview refreshed');
});
document.querySelector('#resetBtn').addEventListener('click', () => {
  if (!window.confirm('Reset the local manager draft to its starting values?')) return;
  localStorage.removeItem(STORAGE_KEY);
  loadDraft();
});

ids.forEach((id) => {
  document.querySelector(`#${id}`)?.addEventListener('input', () => {
    status.textContent = 'Unsaved changes';
  });
});

loadDraft();

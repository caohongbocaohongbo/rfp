const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const focusFilters = document.getElementById('focusFilters');
const filterZone = document.getElementById('filterZone');
const moreFiltersBtn = document.getElementById('moreFiltersBtn');
const advancedFilters = document.getElementById('advancedFilters');
const statusFilters = [...document.querySelectorAll('.filter-chip')];
const statusCounter = document.getElementById('statusCounter');
const topTabs = [...document.querySelectorAll('.top-tab')];
const workspaceItems = [...document.querySelectorAll('.workspace-item')];
const subTabs = [...document.querySelectorAll('#subTabs .pill')];
const panels = [...document.querySelectorAll('[data-panel-surface]')];
const contextTitle = document.getElementById('contextTitle');
const contextCopy = document.getElementById('contextCopy');
const propertySelect = document.getElementById('propertySelect');
const propertyGroupValue = document.getElementById('propertyGroupValue');
const propertyGroupSelect = document.getElementById('propertyGroupSelect');
const librarySearch = document.getElementById('librarySearch');
const mainSearch = document.getElementById('mainSearch');
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
const applyLibraryFilters = document.getElementById('applyLibraryFilters');
const roomTypeFilter = document.getElementById('roomTypeFilter');
const ratePlanFilter = document.getElementById('ratePlanFilter');
const roomToggles = [...document.querySelectorAll('[data-room-toggle]')];
const accordions = [...document.querySelectorAll('[data-accordion]')];
const segmentedButtons = [...document.querySelectorAll('#librarySegmented .segment')];
const libraryRoomCards = [...document.querySelectorAll('.left-rail .room-card, .left-rail .rail-room-card')];
const addRatePlanBtn = document.getElementById('addRatePlanBtn');
const batchUpdateBtn = document.getElementById('batchUpdateBtn');
const dateSwitcher = document.getElementById('dateSwitcher');
const viewSwitcher = [...document.querySelectorAll('#viewSwitcher .segment')];
const expandableRows = [...document.querySelectorAll('[data-expandable]')];

const copyMap = {
  distribution: {
    title: 'Distribution settings',
    copy: 'Clear, blue-accented controls designed for hotel teams to filter and act quickly.'
  },
  guests: {
    title: 'Guest preferences',
    copy: 'Use the same component language to manage segments, notes and engagement states.'
  },
  reservations: {
    title: 'Reservation operations',
    copy: 'Stable filters and compact cards keep booking tasks easy to scan during busy shifts.'
  },
  insights: {
    title: 'Performance insights',
    copy: 'Metrics, tables and state chips support quick analysis without changing the visual system.'
  }
};

function updateStatusCounter() {
  const activeCount = statusFilters.filter((item) => item.classList.contains('active')).length;
  statusCounter.textContent = `${activeCount} active`;
}

function flash(node) {
  node.classList.remove('flash');
  void node.offsetWidth;
  node.classList.add('flash');
}

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('compact');
  themeToggle.textContent = body.classList.contains('compact') ? '切换舒展' : '切换密度';
});

focusFilters?.addEventListener('click', () => {
  filterZone.scrollIntoView({ behavior: 'smooth', block: 'center' });
  flash(filterZone);
});

moreFiltersBtn?.addEventListener('click', () => {
  advancedFilters.classList.toggle('hidden');
  moreFiltersBtn.textContent = advancedFilters.classList.contains('hidden') ? 'More filters' : 'Hide filters';
});

statusFilters.forEach((chip) => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('active');
    updateStatusCounter();
  });
});

updateStatusCounter();

topTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    topTabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.context;
    contextTitle.textContent = copyMap[key].title;
    contextCopy.textContent = copyMap[key].copy;
  });
});

workspaceItems.forEach((item) => {
  item.addEventListener('click', () => {
    workspaceItems.forEach((entry) => entry.classList.remove('active'));
    item.classList.add('active');
  });
});

subTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.subtab;
    subTabs.forEach((entry) => entry.classList.remove('active'));
    tab.classList.add('active');
    panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panelSurface === target));
  });
});

propertySelect?.addEventListener('change', () => {
  const map = {
    all: 'All properties',
    apac: 'APAC premium hotels',
    harbour: 'Harbour Hotel Group',
    urban: 'Urban Stay Collection'
  };
  propertyGroupValue.textContent = map[propertySelect.value];
});

propertyGroupSelect?.addEventListener('change', () => {
  propertyGroupValue.textContent = propertyGroupSelect.value;
});

function applySearchFeedback(sourceInput) {
  const value = sourceInput.value.trim();
  if (!value) return;
  statusCounter.textContent = `Searching: ${value}`;
  flash(filterZone);
  setTimeout(updateStatusCounter, 1200);
}

applyFiltersBtn?.addEventListener('click', () => applySearchFeedback(mainSearch));
applyLibraryFilters?.addEventListener('click', () => applySearchFeedback(librarySearch));

roomToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const active = button.classList.toggle('active');
    button.textContent = active ? '已添加' : '未添加';
  });
});

accordions.forEach((accordion) => {
  const trigger = accordion.querySelector('.accordion-trigger');
  const icon = accordion.querySelector('.accordion-icon');
  trigger?.addEventListener('click', () => {
    accordion.classList.toggle('open');
    icon.textContent = accordion.classList.contains('open') ? '−' : '+';
  });
});

segmentedButtons.forEach((button) => {
  button.addEventListener('click', () => {
    segmentedButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    libraryRoomCards.forEach((card) => {
      if (filter === 'all') {
        card.classList.remove('hidden');
        return;
      }
      const added = card.dataset.added === 'true';
      const shouldShow = filter === 'added' ? added : !added;
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

viewSwitcher.forEach((button) => {
  button.addEventListener('click', () => {
    viewSwitcher.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelector('.keywords')?.classList.toggle('hidden', button.dataset.view === 'default');
  });
});

expandableRows.forEach((row) => {
  const detail = row.nextElementSibling;
  const btn = row.querySelector('.expand-btn');
  row.addEventListener('click', () => {
    detail?.classList.toggle('hidden');
    if (btn) btn.textContent = detail?.classList.contains('hidden') ? '+' : '−';
  });
});

function attachSimpleToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.right = '20px';
  toast.style.bottom = '20px';
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = '14px';
  toast.style.background = '#1f2f46';
  toast.style.color = '#fff';
  toast.style.boxShadow = '0 18px 40px rgba(20, 48, 93, 0.22)';
  toast.style.zIndex = '999';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(10px)';
  toast.style.transition = 'all 180ms ease';
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 180);
  }, 1400);
}

addRatePlanBtn?.addEventListener('click', () => attachSimpleToast('Rate plan draft added'));
batchUpdateBtn?.addEventListener('click', () => attachSimpleToast('Batch update queued'));
dateSwitcher?.addEventListener('click', () => attachSimpleToast('Date picker would open here'));

[roomTypeFilter, ratePlanFilter].forEach((input) => {
  input?.addEventListener('input', () => {
    if (input.value.trim().length >= 2) {
      attachSimpleToast(`Filtering by ${input.value.trim()}`);
    }
  });
});

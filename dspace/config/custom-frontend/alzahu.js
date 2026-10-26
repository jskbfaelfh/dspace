// ============================================================
// AL-ZAHRAWI UNIVERSITY REPOSITORY PORTAL ENHANCER V4
// ============================================================

(function () {
  const collegeIcons = {
    'كلية طب الأسنان': { icon: '🦷', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
    'كلية الصيدلة': { icon: '💊', color: '#0284c7', bg: 'rgba(2,132,199,0.12)' },
    'كلية التمريض': { icon: '🩺', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    'كلية التقنيات الصحية والطبية': { icon: '🧬', color: '#0d9488', bg: 'rgba(13,148,136,0.12)' },
    'كلية الهندسة': { icon: '⚙️', color: '#ea580c', bg: 'rgba(234,88,12,0.12)' },
    'الكلية التقنية الهندسية': { icon: '💻', color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
    'كلية العلوم': { icon: '🔬', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
    'كلية التربية': { icon: '📚', color: '#d97706', bg: 'rgba(217,119,6,0.12)' },
    'كلية التربية البدنية وعلوم الرياضة': { icon: '🏃', color: '#16a34a', bg: 'rgba(22,163,74,0.12)' }
  };

  function updateLogo() {
    const logoImg = document.getElementById('header-logo');
    if (logoImg) {
      logoImg.style.display = 'none';
      const parent = logoImg.parentElement;
      if (parent && !document.getElementById('alzahu-inline-logo')) {
        const wrapper = document.createElement('div');
        wrapper.id = 'alzahu-inline-logo';
        wrapper.className = 'alzahu-brand-wrapper';
        wrapper.innerHTML = `
          <img src="/assets/custom/university-logo.png" alt="شعار جامعة الزهراوي" class="alzahu-logo-img">
          <div class="alzahu-logo-text">
            <span class="alzahu-logo-title">جامعة الزهراوي</span>
            <span class="alzahu-logo-sub">AL-ZAHRAWI UNIVERSITY</span>
            <span class="alzahu-logo-dep">مستودع مشاريع التخرج</span>
          </div>
        `;
        parent.appendChild(wrapper);
      }
    }
  }

  function enhanceHeroBanner() {
    const newsContent = document.querySelector('.home-news-content');
    if (!newsContent) return;

    // Hide any default DSpace elements
    const defaultElements = newsContent.querySelectorAll('p, ul, h1, small, .d-flex.flex-wrap');
    defaultElements.forEach(el => {
      if (!el.closest('#alzahu-custom-hero')) {
        el.style.display = 'none';
      }
    });

    if (document.getElementById('alzahu-custom-hero')) return;

    const heroDiv = document.createElement('div');
    heroDiv.id = 'alzahu-custom-hero';
    heroDiv.innerHTML = `
      <div class="alzahu-hero-badge">
        <span>✨ المستودع الرقمي الرسمي • جامعة الزهراوي</span>
      </div>
      <h1 class="alzahu-hero-title">مستودع مشاريع التخرج والأبحاث العلمية</h1>
      <div class="alzahu-hero-subtitle">AL-ZAHRAWI UNIVERSITY REPOSITORY</div>
      <p class="alzahu-hero-desc">
        المنصة الرقمية الموحدة لتوثيق، أرشفة، وإتاحة مشاريع تخرج وأطاريح طلبة كليات جامعة الزهراوي، وتوفير وصول حر ومباشر للإنتاج العلمي والأكاديمي.
      </p>
      <div class="alzahu-hero-pills">
        <span class="alzahu-pill">🎓 مشاريع تخرج معتمدة</span>
        <span class="alzahu-pill">🏛️ 9 كليات متخصصة</span>
        <span class="alzahu-pill">🔍 فهرسة وبحث في النصوص الكاملة</span>
        <span class="alzahu-pill">🌐 وصول مفتوح (Open Access)</span>
      </div>
    `;

    newsContent.prepend(heroDiv);
  }

  function fixNavbarButtons() {
    const wrappers = document.querySelectorAll('.ds-menu-item-wrapper, #main-site-navigation .navbar-nav, ds-navbar-section, ds-expandable-navbar-section');
    wrappers.forEach(w => {
      w.style.setProperty('background-color', 'transparent', 'important');
      w.style.setProperty('background', 'transparent', 'important');
      w.style.setProperty('border', 'none', 'important');
      w.style.setProperty('box-shadow', 'none', 'important');
    });

    const links = document.querySelectorAll('#main-site-navigation a, #main-site-navigation span.ds-menu-item, .ds-menu-toggler-wrapper');
    links.forEach(l => {
      l.style.setProperty('background', 'rgba(255, 255, 255, 0.06)', 'important');
      l.style.setProperty('color', '#f1f5f9', 'important');
      l.style.setProperty('border-radius', '12px', 'important');
      l.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.12)', 'important');
      l.style.setProperty('padding', '8px 16px', 'important');
      l.style.setProperty('font-weight', '700', 'important');
      l.style.setProperty('font-size', '0.95rem', 'important');
      l.style.setProperty('text-decoration', 'none', 'important');
    });

    const rightButtons = document.querySelectorAll('#header-right button, ds-user-menu button, ds-lang-switch button, ds-auth-nav-menu button, .search-toggle');
    rightButtons.forEach(b => {
      b.style.setProperty('background', 'rgba(255, 255, 255, 0.06)', 'important');
      b.style.setProperty('border', '1px solid rgba(56, 189, 248, 0.3)', 'important');
      b.style.setProperty('color', '#38bdf8', 'important');
      b.style.setProperty('border-radius', '10px', 'important');
      b.style.setProperty('font-weight', '700', 'important');
      b.style.setProperty('height', '40px', 'important');
    });

    const searchInputs = document.querySelectorAll('ds-search-navbar input, ds-base-search-navbar input');
    searchInputs.forEach(inp => {
      inp.style.setProperty('background-color', '#16203d', 'important');
      inp.style.setProperty('background', '#16203d', 'important');
      inp.style.setProperty('color', '#ffffff', 'important');
      inp.style.setProperty('border', '1.5px solid #06b6d4', 'important');
      inp.style.setProperty('position', 'static', 'important');
    });
  }

  function fixDropdowns() {
    document.querySelectorAll('.dropdown-menu, [ngbdropdownmenu]').forEach(dd => {
      const parent = dd.parentElement;
      const isOpen = dd.classList.contains('show') || (parent && parent.classList.contains('show'));
      if (!isOpen) {
        dd.style.setProperty('display', 'none', 'important');
        dd.style.setProperty('visibility', 'hidden', 'important');
        dd.style.setProperty('opacity', '0', 'important');
      } else {
        dd.style.removeProperty('display');
        dd.style.removeProperty('visibility');
        dd.style.removeProperty('opacity');
        dd.style.setProperty('background-color', '#0b1329', 'important');
        dd.style.setProperty('border', '1px solid #06b6d4', 'important');
        dd.style.setProperty('border-radius', '14px', 'important');
        dd.style.setProperty('box-shadow', '0 15px 35px rgba(0,0,0,0.6)', 'important');
      }
    });
  }

  function fixLoginForm() {
    const userMenuDd = document.querySelector('ds-user-menu .dropdown-menu.show');
    if (userMenuDd) {
      userMenuDd.style.setProperty('min-width', '380px', 'important');
      userMenuDd.style.setProperty('width', '380px', 'important');
      userMenuDd.style.setProperty('padding', '24px', 'important');
    }

    const loginForms = document.querySelectorAll('.form-login');
    loginForms.forEach(form => {
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput) {
        emailInput.style.setProperty('background-color', '#16203d', 'important');
        emailInput.style.setProperty('color', '#ffffff', 'important');
        emailInput.style.setProperty('border', '1px solid rgba(56, 189, 248, 0.3)', 'important');
        emailInput.style.setProperty('border-radius', '10px', 'important');
      }
      const passGroup = form.querySelector('.password-group');
      if (passGroup) {
        passGroup.style.setProperty('background-color', '#16203d', 'important');
        passGroup.style.setProperty('border', '1px solid rgba(56, 189, 248, 0.3)', 'important');
        passGroup.style.setProperty('border-radius', '10px', 'important');
        passGroup.style.setProperty('overflow', 'hidden', 'important');
      }
      const passInput = form.querySelector('input[type="password"]');
      if (passInput) {
        passInput.style.setProperty('background-color', 'transparent', 'important');
        passInput.style.setProperty('color', '#ffffff', 'important');
        passInput.style.setProperty('border', 'none', 'important');
      }
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.style.setProperty('background', 'linear-gradient(135deg, #0891b2 0%, #0284c7 100%)', 'important');
        submitBtn.style.setProperty('color', '#ffffff', 'important');
        submitBtn.style.setProperty('border', 'none', 'important');
        submitBtn.style.setProperty('border-radius', '10px', 'important');
        submitBtn.style.setProperty('font-weight', '700', 'important');
      }
      const container = form.closest('.login-container') || form.parentElement;
      if (container) {
        const links = container.querySelectorAll('a.dropdown-item');
        links.forEach(a => {
          a.style.setProperty('border', 'none', 'important');
          a.style.setProperty('background', 'transparent', 'important');
          a.style.setProperty('color', '#38bdf8', 'important');
          a.style.setProperty('text-align', 'center', 'important');
          a.style.setProperty('justify-content', 'center', 'important');
          a.style.setProperty('text-decoration', 'underline', 'important');
        });
      }
    });
  }

  function enhanceCollegeCards() {
    const elements = document.querySelectorAll('ds-community-list-element');
    elements.forEach(el => {
      if (el.getAttribute('data-alzahu-enhanced')) return;

      const titleLink = el.querySelector('a.lead');
      if (!titleLink) return;

      const title = titleLink.textContent.trim();
      const info = collegeIcons[title] || { icon: '🏛️', color: '#0891b2', bg: 'rgba(8,145,178,0.12)' };

      // Add College Icon Box
      const iconBox = document.createElement('div');
      iconBox.className = 'alzahu-college-icon';
      iconBox.style.cssText = 'display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 14px; background: ' + info.bg + '; font-size: 24px; margin-bottom: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.04);';
      iconBox.textContent = info.icon;

      // Add Card Footer with explore button
      const footer = document.createElement('div');
      footer.className = 'alzahu-card-footer';
      footer.innerHTML = '<span style="font-size: 0.85rem; color: #94a3b8; font-weight: 600;">مشاريع التخرج المعتمدة</span><span class="alzahu-explore-btn">تصفح الكلية ←</span>';

      el.prepend(iconBox);
      el.appendChild(footer);
      el.setAttribute('data-alzahu-enhanced', 'true');
    });
  }

  function enhanceCommunityTreeNodes() {
    const nodes = document.querySelectorAll('cdk-tree-node');
    nodes.forEach(node => {
      if (node.getAttribute('data-alzahu-enhanced')) return;
      const titleLink = node.querySelector('a');
      if (!titleLink) return;
      const title = titleLink.textContent.trim();
      for (const [colName, info] of Object.entries(collegeIcons)) {
        if (title.includes(colName)) {
          if (!node.querySelector('.alzahu-tree-icon')) {
            const span = document.createElement('span');
            span.className = 'alzahu-tree-icon';
            span.style.cssText = 'display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 10px; background: ' + info.bg + '; font-size: 20px; margin-left: 10px; vertical-align: middle; box-shadow: 0 2px 8px rgba(0,0,0,0.05);';
            span.textContent = info.icon;
            titleLink.parentElement.prepend(span);
          }
          break;
        }
      }
      node.setAttribute('data-alzahu-enhanced', 'true');
    });
  }

  function fixComcolHeaders() {
    const headers = document.querySelectorAll('.comcol-header');
    headers.forEach(h => {
      h.style.setProperty('width', '100%', 'important');
      const innerHeaders = h.querySelectorAll('ds-comcol-page-header');
      innerHeaders.forEach(ih => {
        ih.style.setProperty('background', 'transparent', 'important');
        ih.style.setProperty('border', 'none', 'important');
        ih.style.setProperty('padding', '0', 'important');
        ih.style.setProperty('box-shadow', 'none', 'important');
      });
    });
  }

  function fixAdminSidebar() {
    const sidebar = document.querySelector('nav#admin-sidebar');
    if (sidebar) {
      sidebar.style.setProperty('z-index', '1050', 'important');
      const parent = sidebar.closest('ds-admin-sidebar') || sidebar.parentElement;
      if (parent) {
        parent.style.setProperty('z-index', '1050', 'important');
      }
    }
  }

  function updateSearchPlaceholder() {
    const input = document.querySelector('ds-search-form input[name="query"]');
    if (input && !input.getAttribute('data-alzahu-customized')) {
      input.setAttribute('placeholder', 'ابحث عن مشروع تخرج، اسم طالب، المشرف، أو الكلية...');
      input.setAttribute('data-alzahu-customized', 'true');
    }
  }

  function enhanceAdvisorBadges() {
    // In search result list or item metadata table, highlight advisor
    const elements = document.querySelectorAll('ds-item-search-result-list-element, .item-page-fields tr');
    elements.forEach(el => {
      if (el.getAttribute('data-advisor-checked')) return;
      const html = el.innerHTML;
      if (html.includes('المشرف') || html.includes('dc.contributor.advisor')) {
        const advisorSpan = el.querySelector('.item-list-authors, td:last-child');
        if (advisorSpan && !advisorSpan.querySelector('.alzahu-advisor-chip')) {
          const chip = document.createElement('span');
          chip.className = 'alzahu-advisor-chip';
          chip.style.cssText = 'display: inline-flex; align-items: center; gap: 4px; background: rgba(16, 185, 129, 0.12); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 2px 8px; font-size: 0.82rem; font-weight: 700; margin-inline-start: 6px;';
          chip.innerHTML = '👨‍🏫 إشراف أكاديمي';
          advisorSpan.appendChild(chip);
        }
      }
      el.setAttribute('data-advisor-checked', 'true');
    });
  }

  function runAll() {
    updateLogo();
    enhanceHeroBanner();
    fixNavbarButtons();
    fixDropdowns();
    fixLoginForm();
    enhanceCollegeCards();
    enhanceCommunityTreeNodes();
    fixComcolHeaders();
    fixAdminSidebar();
    updateSearchPlaceholder();
    enhanceAdvisorBadges();
  }

  // Initial Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }

  // Continuously ensure enhancements are applied on SPA view transitions
  setInterval(runAll, 300);
})();

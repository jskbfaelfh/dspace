const fs = require('fs');
const path = require('path');

const dirs = ['/app/dist/browser/assets/i18n', '/app/dist/server/assets/i18n'];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (file.startsWith('ar.') && file.endsWith('.json')) {
      const filePath = path.join(dir, file);
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data['home.top-level-communities.head'] = 'كليات وأقسام جامعة الزهراوي';
        data['home.top-level-communities.help'] = 'اختر الكلية لاستعراض مشاريع التخرج والأبحاث المنشورة الخاصة بطلبتها';
        data['home.search-form.placeholder'] = 'ابحث عن مشروع تخرج، اسم باحث، أو مشرف...';
        data['repository.title'] = 'مستودع مشاريع تخرج جامعة الزهراوي';
        data['footer.copyright'] = 'جميع الحقوق محفوظة © 2026 جامعة الزهراوي - مركز الحاسبة وتكنولوجيا المعلومات';
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Updated ' + filePath);
      } catch (e) {
        console.error('Error on ' + filePath, e.message);
      }
    }
  });
});
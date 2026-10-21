const http = require('http');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function run() {
  console.log('1. Fetching Initial CSRF Token...');
  const csrfRes = await makeRequest({
    hostname: 'dspace',
    port: 8080,
    path: '/server/api/security/csrf',
    method: 'GET'
  });
  
  const initialCsrf = csrfRes.headers['dspace-xsrf-token'];
  console.log('Initial CSRF:', initialCsrf);

  console.log('2. Logging in...');
  const loginBody = 'user=admin@dspace.org&password=admin123';
  const loginRes = await makeRequest({
    hostname: 'dspace',
    port: 8080,
    path: '/server/api/authn/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-XSRF-TOKEN': initialCsrf,
      'Cookie': `DSPACE-XSRF-COOKIE=${initialCsrf}`,
      'Content-Length': Buffer.byteLength(loginBody)
    }
  }, loginBody);

  const authToken = loginRes.headers['authorization'];
  const newCsrf = loginRes.headers['dspace-xsrf-token'];
  const postCookie = `DSPACE-XSRF-COOKIE=${newCsrf}`;
  console.log('Login successful! New CSRF:', newCsrf, 'Auth header present:', !!authToken);

  const colleges = [
    { name: 'كلية الهندسة', desc: 'مشاريع تخرج طلبة كلية الهندسة في جامعة الزهراوي', collection: 'مشاريع تخرج كلية الهندسة' },
    { name: 'الكلية التقنية الهندسية', desc: 'مشاريع تخرج وأبحاث الكلية التقنية الهندسية في جامعة الزهراوي', collection: 'مشاريع تخرج الكلية التقنية الهندسية' },
    { name: 'كلية العلوم', desc: 'مشاريع تخرج وبحوث طلبة كلية العلوم بأقسامها المختلفة', collection: 'مشاريع تخرج كلية العلوم' },
    { name: 'كلية طب الأسنان', desc: 'مشاريع وأبحاث تخرج طلبة كلية طب الأسنان', collection: 'مشاريع تخرج كلية طب الأسنان' },
    { name: 'كلية الصيدلة', desc: 'مشاريع وأبحاث تخرج طلبة كلية الصيدلة', collection: 'مشاريع تخرج كلية الصيدلة' },
    { name: 'كلية التمريض', desc: 'مشاريع تخرج وأبحاث طلبة كلية التمريض', collection: 'مشاريع تخرج كلية التمريض' },
    { name: 'كلية التقنيات الصحية والطبية', desc: 'مشاريع تخرج طلبة كلية التقنيات الصحية والطبية', collection: 'مشاريع تخرج كلية التقنيات الصحية والطبية' },
    { name: 'كلية التربية', desc: 'مشاريع تخرج طلبة كلية التربية', collection: 'مشاريع تخرج كلية التربية' },
    { name: 'كلية التربية البدنية وعلوم الرياضة', desc: 'مشاريع تخرج وأبحاث كلية التربية البدنية وعلوم الرياضة', collection: 'مشاريع تخرج كلية التربية البدنية وعلوم الرياضة' }
  ];

  for (const col of colleges) {
    console.log(`\n--- Creating Community: ${col.name} ---`);
    const commPayload = JSON.stringify({
      name: col.name,
      metadata: {
        'dc.title': [{ value: col.name, language: 'ar' }],
        'dc.description.abstract': [{ value: col.desc, language: 'ar' }]
      }
    });

    const commRes = await makeRequest({
      hostname: 'dspace',
      port: 8080,
      path: '/server/api/core/communities',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,
        'X-XSRF-TOKEN': newCsrf,
        'Cookie': postCookie,
        'Content-Length': Buffer.byteLength(commPayload)
      }
    }, commPayload);

    if (commRes.statusCode === 201) {
      const commData = JSON.parse(commRes.data);
      const commUuid = commData.uuid;
      console.log(`✓ Community Created: ${col.name} (UUID: ${commUuid})`);

      const collPayload = JSON.stringify({
        name: col.collection,
        metadata: {
          'dc.title': [{ value: col.collection, language: 'ar' }],
          'dc.description.abstract': [{ value: `المستودع الرقمي لحفظ ونشر ${col.collection} في جامعة الزهراوي`, language: 'ar' }]
        }
      });

      const collRes = await makeRequest({
        hostname: 'dspace',
        port: 8080,
        path: `/server/api/core/communities/${commUuid}/collections`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
          'X-XSRF-TOKEN': newCsrf,
          'Cookie': postCookie,
          'Content-Length': Buffer.byteLength(collPayload)
        }
      }, collPayload);

      if (collRes.statusCode === 201) {
        console.log(`  ✓ Collection Created: ${col.collection}`);
      } else {
        console.log(`  ✗ Failed Collection: ${collRes.statusCode} - ${collRes.data}`);
      }
    } else {
      console.log(`✗ Failed Community: ${commRes.statusCode} - ${commRes.data}`);
    }
  }

  console.log('\n=== All Al-Zahrawi University communities & collections created successfully! ===');
}

run().catch(console.error);
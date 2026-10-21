const http = require('http');

function req(options, postData) {
  return new Promise((res, rej) => {
    const r = http.request(options, resp => {
      let d = '';
      resp.on('data', c => d += c);
      resp.on('end', () => res({ status: resp.statusCode, data: d, headers: resp.headers }));
    });
    if (postData) r.write(postData);
    r.end();
  });
}

async function run() {
  const cRes = await req({ hostname: 'dspace', port: 8080, path: '/server/api/security/csrf', method: 'GET' });
  const csrf = cRes.headers['dspace-xsrf-token'];
  const lRes = await req({
    hostname: 'dspace', port: 8080, path: '/server/api/authn/login', method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-XSRF-TOKEN': csrf, 'Cookie': 'DSPACE-XSRF-COOKIE=' + csrf }
  }, 'user=admin@dspace.org&password=admin123');
  
  const auth = lRes.headers['authorization'];
  const nCsrf = lRes.headers['dspace-xsrf-token'];
  const cookie = 'DSPACE-XSRF-COOKIE=' + nCsrf;

  console.log('Fetching all communities...');
  const commsRes = await req({
    hostname: 'dspace', port: 8080,
    path: '/server/api/core/communities?size=100',
    method: 'GET',
    headers: { 'Authorization': auth }
  });

  const commsData = JSON.parse(commsRes.data);
  const communities = commsData._embedded.communities;

  for (const comm of communities) {
    const collName = `مشاريع تخرج ${comm.name}`;
    console.log(`Checking/Creating for ${comm.name} (${comm.uuid})...`);

    // Check existing collections
    const existRes = await req({
      hostname: 'dspace', port: 8080,
      path: `/server/api/core/communities/${comm.uuid}/collections`,
      method: 'GET',
      headers: { 'Authorization': auth }
    });

    const existData = JSON.parse(existRes.data);
    const existing = (existData._embedded && existData._embedded.collections) || [];
    if (existing.length > 0) {
      console.log(` Already has collection: ${existing[0].name}`);
      continue;
    }

    const collPayload = JSON.stringify({
      name: collName,
      metadata: {
        'dc.title': [{ value: collName, language: 'ar' }],
        'dc.description.abstract': [{ value: `المستودع الرقمي لحفظ ونشر ${collName} لجامعة الزهراوي`, language: 'ar' }]
      }
    });

    const res = await req({
      hostname: 'dspace', port: 8080,
      path: `/server/api/core/collections?parent=${comm.uuid}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth,
        'X-XSRF-TOKEN': nCsrf,
        'Cookie': cookie,
        'Content-Length': Buffer.byteLength(collPayload)
      }
    }, collPayload);

    if (res.status === 201) {
      console.log(` ✓ Successfully created: ${collName}`);
    } else {
      console.log(` ✗ Failed: ${res.status} - ${res.data}`);
    }
  }

  console.log('Finished setting up all graduation project collections!');
}

run().catch(console.error);
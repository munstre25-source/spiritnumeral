const https = require('https');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://iygpvkrdqzksipwqrphj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Z3B2a3JkcXprc2lwd3FycGhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU2NjExOSwiZXhwIjoyMDg1MTQyMTE5fQ.QVaIGUwnqB5HgwFwQ4-lJAYbWDe38faJwKD8IGd1ags';

const dataPath = path.join(__dirname, 'src/lib/data/spirituality-dataset.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const data = JSON.parse(rawData);

const angelNumbers = data.angel_numbers.map(item => ({
  number: item.number,
  meaning: item.meaning,
  love: item.love,
  career: item.career,
  twin_flame: item.twin_flame,
  prediction_2026: item['2026_prediction'],
  lucky_color: item.lucky_color,
  chakra: item.chakra,
  what_to_do: item.what_to_do,
  why_seeing: item.why_seeing,
  misconception: item.misconception
}));

async function insertBatch(batch) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(batch);
    
    const options = {
      hostname: 'iygpvkrdqzksipwqrphj.supabase.co',
      port: 443,
      path: '/rest/v1/angel_numbers',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'resolution=merge-duplicates',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, status: res.statusCode });
        } else {
          resolve({ success: false, status: res.statusCode, error: data });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log(`Total angel numbers: ${angelNumbers.length}`);
  
  const batchSize = 50;
  for (let i = 0; i < angelNumbers.length; i += batchSize) {
    const batch = angelNumbers.slice(i, i + batchSize);
    const result = await insertBatch(batch);
    console.log(`Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(angelNumbers.length/batchSize)}: ${result.success ? 'OK' : 'FAIL ' + result.error}`);
    
    if (!result.success) {
      console.error('Error:', result.error);
      break;
    }
    
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log('Done!');
}

main().catch(console.error);

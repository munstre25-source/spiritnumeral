const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase env (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function upsertBatch(table, rows, batchSize = 200) {
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from(table).upsert(batch, { onConflict: 'type,number' });
    if (error) {
      console.error(`Error upserting ${table} batch ${i / batchSize + 1}:`, error.message);
    } else {
      console.log(`Upserted ${table} batch ${i / batchSize + 1}/${Math.ceil(rows.length / batchSize)}`);
    }
  }
}

async function run() {
  const dataPath = path.join(__dirname, '..', 'data', 'normalized', 'numerology_content.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(raw);

  await upsertBatch('name_numbers', data.name_numbers);
  await upsertBatch('timing_cycles', data.timing_cycles);
  await upsertBatch('lifecycle_numbers', data.lifecycle_numbers);

  console.log('Import complete.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

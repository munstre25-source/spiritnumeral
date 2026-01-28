const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iygpvkrdqzksipwqrphj.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Z3B2a3JkcXprc2lwd3FycGhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU2NjExOSwiZXhwIjoyMDg1MTQyMTE5fQ.QVaIGUwnqB5HgwFwQ4-lJAYbWDe38faJwKD8IGd1ags';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importData() {
  const dataPath = path.join(__dirname, '../src/lib/data/spirituality-dataset.json');
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

  console.log(`Importing ${angelNumbers.length} angel numbers...`);

  const batchSize = 100;
  for (let i = 0; i < angelNumbers.length; i += batchSize) {
    const batch = angelNumbers.slice(i, i + batchSize);
    const { error } = await supabase
      .from('angel_numbers')
      .upsert(batch, { onConflict: 'number' });

    if (error) {
      console.error(`Error at batch ${i / batchSize + 1}:`, error);
    } else {
      console.log(`Imported batch ${i / batchSize + 1}/${Math.ceil(angelNumbers.length / batchSize)}`);
    }
  }

  console.log('Import complete!');
}

importData().catch(console.error);

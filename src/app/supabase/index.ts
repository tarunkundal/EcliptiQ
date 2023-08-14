import { createClient } from '@supabase/supabase-js';

import { SUPABASE_KEY, SUPABASE_URL } from '../config';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default supabase;

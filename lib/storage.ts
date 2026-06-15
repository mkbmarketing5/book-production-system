import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const BUCKET_NAME = 'book-assets';

export async function uploadAsset(file: File, projectId: string, folder: string = 'assets') {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${projectId}/${folder}/${fileName}`;

    const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    return publicUrl.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

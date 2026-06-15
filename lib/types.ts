export interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  genre?: string;
  pen_name?: string;
  voice_guide?: string;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  project_id: string;
  title: string;
  section_number?: number;
  chapter_number?: number;
  content: string;
  word_count: number;
  voice_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  project_id: string;
  name: string;
  type: 'image' | 'graphic' | 'reference' | 'style_guide';
  url: string;
  alt_text?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface CoverDesign {
  id: string;
  project_id: string;
  title: string;
  specification: string;
  design_data: Record<string, any>;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

import { NextRequest, NextResponse } from 'next/server';
import { BOOK_SPECS, COVER_SPECS, IMAGE_SPECS } from '@/lib/format-specs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const type = searchParams.get('type');

    if (type === 'book' && format) {
      const spec = BOOK_SPECS[format as keyof typeof BOOK_SPECS];
      if (spec) {
        return NextResponse.json(spec);
      }
    } else if (type === 'cover' && format) {
      const spec = COVER_SPECS[format as keyof typeof COVER_SPECS];
      if (spec) {
        return NextResponse.json(spec);
      }
    } else if (type === 'image' && format) {
      const spec = IMAGE_SPECS[format as keyof typeof IMAGE_SPECS];
      if (spec) {
        return NextResponse.json(spec);
      }
    }

    return NextResponse.json(
      { error: 'Specification not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('GET /api/format-specs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'list') {
      return NextResponse.json({
        books: Object.keys(BOOK_SPECS),
        covers: Object.keys(COVER_SPECS),
        images: Object.keys(IMAGE_SPECS),
      });
    } else if (action === 'all-specs') {
      return NextResponse.json({
        books: BOOK_SPECS,
        covers: COVER_SPECS,
        images: IMAGE_SPECS,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('POST /api/format-specs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

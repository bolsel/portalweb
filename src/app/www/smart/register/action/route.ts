import { NextRequest, NextResponse } from 'next/server';
import { validate } from '../base';
import { apiClient } from '@/lib/server';
import { triggerFlow } from '@directus/sdk';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { errors, hasError } = validate(body);
  if (hasError) {
    return NextResponse.json({ errors });
  }
  body.register_at = new Date();
  try {
    const sendRegister = (await apiClient({}).request(
      triggerFlow('POST', '0fdc71ce-6802-4aa3-be7a-1a07f1adfedb', body)
    )) as any;
    if (sendRegister.errors) {
      return NextResponse.json({
        error: 'Terjadi kesalahan. Kesalahan mengirim data.',
      });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      error: 'Terjadi kesalahan. Hubungi Administrator.',
    });
  }
}

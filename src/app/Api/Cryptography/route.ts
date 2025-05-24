// app/api/cryptography/route.ts
import { NextResponse } from 'next/server';
import { encryptWithMasterKey, decryptWithMasterKey } from 'double-cryptograpgy';

export async function POST(req: Request) {
  try {
    const { action, input, masterKey } = await req.json();

    if (!masterKey || typeof masterKey !== 'string') {
      return NextResponse.json({ error: 'Master key is required' }, { status: 400 });
    }

    let parsedInput = input;
    if (typeof input === 'string') {
      try {
        parsedInput = JSON.parse(input);
      } catch {
        // Use as string if not valid JSON
      }
    }

    let result;
    if (action === 'encrypt') {
      result = encryptWithMasterKey(parsedInput, masterKey);
    } else if (action === 'decrypt') {
      result = decryptWithMasterKey(parsedInput, masterKey);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}

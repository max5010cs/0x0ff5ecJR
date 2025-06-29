

// covert base64 string > arraybuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// convert arraybuffer > base64 string
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const binary = String.fromCharCode(...bytes);
  return btoa(binary);
}

// import key (from base64 string) as cryptoKey
export async function importKey(base64Key: string): Promise<CryptoKey> {
  const rawKey = base64ToArrayBuffer(base64Key);
  return crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

// encrypt a string message
export async function encryptMessage(message: string, key: CryptoKey): Promise<string> {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit iv
  const encoded = enc.encode(message);

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  // combine iv + ciphertext, encode to base64
  const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.byteLength);
  return arrayBufferToBase64(combined.buffer);
}

// decrypt a base64 message
export async function decryptMessage(base64: string, key: CryptoKey): Promise<string> {
  const data = new Uint8Array(base64ToArrayBuffer(base64));
  const iv = data.slice(0, 12);
  const ciphertext = data.slice(12);

  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );

  const dec = new TextDecoder();
  return dec.decode(plaintext);
}

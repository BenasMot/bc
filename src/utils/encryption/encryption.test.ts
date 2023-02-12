import {
  assertEquals,
  assertExists,
  assertNotEquals,
} from 'https://deno.land/std@0.172.0/testing/asserts.ts';
import {
  createSignature,
  exportPrivateKey,
  exportPublicKey,
  generateKeys,
  importKeys,
  parsePrivateKey,
  parsePublicKey,
  verifySignature,
} from './encryption.ts';

Deno.test('generateKeys', async ({ step: it }) => {
  let keyString: string;
  await it('should return decryption key', async () => {
    await generateKeys();
    const decryptionKey = await exportPublicKey();

    assertExists(decryptionKey);
    keyString = decryptionKey;
  });

  await it('should create different keys each time', async () => {
    await generateKeys();
    const decryptionKey = await exportPublicKey();

    assertNotEquals(decryptionKey, keyString);
  });
});

Deno.test('signData', async ({ step: it }) => {
  await generateKeys();
  const data = 'Lorem ipsum dolor sit amet.';
  let signature: string;

  await it('should sign data', async () => {
    signature = await createSignature(data);

    assertExists(signature);
  });

  await it('should verify signed data', async () => {
    const publicKey = await exportPublicKey();
    const isVerified = await verifySignature(publicKey, signature, data);

    assertEquals(isVerified, true);
  });
});

Deno.test('export and import keys', async ({ step: it }) => {
  const publicKeyString =
    '3081b6020100301006072a8648ce3d020106052b8104002204819e30819b020101043047559a16dd2c79c275fabc6eccb7c81c2121ce5e698344619d66653cec8f8461f5377724085393b7e6055699f80b5b7da16403620004a957653a2846fcac871f64475d2e6d1bb423c8f290e8e744d4e8e1e422942ac9fd4894820c46eb9707d4e2c070322d4fe3a8f65b5c738fea91991b2221603a7a0e935afcd58349b1db62e22b1965f2c726dd32786946f5f3085bd37b41bca212';
  const privateKeyString =
    '3076301006072a8648ce3d020106052b8104002203620004a957653a2846fcac871f64475d2e6d1bb423c8f290e8e744d4e8e1e422942ac9fd4894820c46eb9707d4e2c070322d4fe3a8f65b5c738fea91991b2221603a7a0e935afcd58349b1db62e22b1965f2c726dd32786946f5f3085bd37b41bca212';

  await it('should import keys', async () => {
    const publicKey = await parsePublicKey(publicKeyString);
    const privateKey = await parsePrivateKey(privateKeyString);

    importKeys({ publicKey, privateKey });

    assertEquals(publicKeyString, await exportPublicKey());
    assertEquals(privateKeyString, await exportPrivateKey());
  });
});

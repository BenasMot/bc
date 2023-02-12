import { assertEquals } from 'https://deno.land/std@0.172.0/testing/asserts.ts';

import { encodeString } from './encodeString.ts';
import { decodeString } from './decodeString.ts';

Deno.test('Encoding', async ({ step: it }) => {
  await it('Should encode and decode string', () => {
    const loremIpsum = 'Lorem ipsum dolor sit amet.';
    const encodedString = encodeString(loremIpsum);
    const decodedString = decodeString(encodedString);

    assertEquals(loremIpsum, decodedString);
  });
});

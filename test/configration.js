import path from 'path';
import { fromFile } from '../lib';

describe('configration', () => {
  describe('fromFile', () => {
    it('returns Configration instance', () => {
      const config = fromFile(path.resolve(process.cwd(), './test/fixtures/config.toml'));
      assert.equal(config.watchInterval, 5000);
    })
  });
});

import { Flavor } from './flavor';
import { FlavorText } from './interfaces';

describe('FlavorText', () => {
  const flavorSource: FlavorText = {
    text: 'This is the init text',
  }

  describe('constructor', () => {
    it('should create an instance', () => {
      expect(new Flavor(flavorSource)).toBeTruthy();
    });

    it('should set the text to the value of the source', () => {
      expect(new Flavor(flavorSource).text).toEqual(flavorSource.text);
    });
  });
});

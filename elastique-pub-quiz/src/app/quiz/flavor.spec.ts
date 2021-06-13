import { Flavor } from './flavor';
import { FlavorText } from './interfaces';

describe('FlavorText', () => {
  const flavorSource: FlavorText = {
    text: 'This is the init text',
    image: 'test.png'
  }

  describe('constructor', () => {
    it('should create an instance', () => {
      expect(new Flavor(flavorSource)).toBeTruthy();
    });

    it('should set the text and image to the value of the source', () => {
      expect(new Flavor(flavorSource).text).toEqual(flavorSource.text);
      expect(new Flavor(flavorSource).image).toEqual(flavorSource.image);
    });
  });
});

import { FlavorText } from "./interfaces";

export class Flavor implements FlavorText {
  text: string;
  image: string;

  constructor(source: FlavorText) {
    this.text = source.text;
    this.image = source.image;
  }
}

import { FlavorText } from "./interfaces";

export class Flavor implements FlavorText {
  text: string;

  constructor(source: FlavorText) {
    this.text = source.text;
  }
}

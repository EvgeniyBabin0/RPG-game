import Arm from './Arm';
import Knife from './Knife';

export default class Player {
  constructor() {
    this.weapon = new Arm();
    this.alternativeWeapon = new Knife();
  }
}

import Arm from '../weapons/Arm';
import Knife from '../weapons/Knife';
import Sword from '../weapons/Sword';
import Bow from '../weapons/Bow';
import Staff from '../weapons/Staff';
import Axe from '../weapons/Axe';
import LongBow from '../weapons/LongBow';
import StormStaff from '../weapons/StormStaff';

export default class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
  }

  getLuck() {
    return (Math.random() * 100 + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }

    return ((this.attack + this.weapon.getDamage()) * this.getLuck()) / distance;
  }

  takeDamage(damage) {
    this.life = Math.max(this.life - damage, 0);
  }

  isDead() {
    return this.life === 0;
  }

  moveLeft(distance = 1) {
    const step = Math.min(distance, this.speed);
    this.position -= step;
  }

  moveRight(distance = 1) {
    const step = Math.min(distance, this.speed);
    this.position += step;
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
      return;
    }

    this.moveRight(distance);
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      return;
    }

    if (this.dodged()) {
      return;
    }

    this.takeDamage(damage);
  }

  checkWeapon() {
    if (!this.weapon.isBroken()) {
      return;
    }

    if (
      this.weapon instanceof Sword
      || this.weapon instanceof Bow
      || this.weapon instanceof Staff
      || this.weapon instanceof Axe
      || this.weapon instanceof LongBow
      || this.weapon instanceof StormStaff
    ) {
      this.weapon = new Knife();
      return;
    }

    if (this.weapon instanceof Knife) {
      this.weapon = new Arm();
    }
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);

    if (distance > this.weapon.range) {
      return;
    }

    this.weapon.takeDamage(10 * this.getLuck());
    const damage = this.getDamage(distance);
    this.checkWeapon();

    if (this.position === enemy.position) {
      enemy.moveRight(1);
      enemy.takeAttack(damage * 2);
      return;
    }

    enemy.takeAttack(damage);
  }

  chooseEnemy(players) {
    const aliveEnemies = players.filter((player) => player !== this && !player.isDead());

    if (aliveEnemies.length === 0) {
      return null;
    }

    return aliveEnemies.reduce((minLifeEnemy, currentEnemy) => {
      if (currentEnemy.life < minLifeEnemy.life) {
        return currentEnemy;
      }

      return minLifeEnemy;
    });
  }

  moveToEnemy(enemy) {
    if (!enemy) {
      return;
    }

    const distance = enemy.position - this.position;

    if (distance === 0) {
      return;
    }

    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
      return;
    }

    this.moveRight(distance);
  }

  turn(players) {
    if (this.isDead()) {
      return;
    }

    const enemy = this.chooseEnemy(players);

    if (!enemy) {
      return;
    }

    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}

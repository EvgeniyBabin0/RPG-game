export class Weapon {
  constructor(name = 'Рука', attack = 1, durability = 300, range = 1) {
    this.name = name;
    this.attack = attack;
    this.durability = durability;
    this.range = range;
    this.initialDurability = durability;
  }

  takeDamage(damage) {
    this.durability -= damage;

    if (this.durability < 0) {
      this.durability = 0;
    }
  }

  getDamage() {
    if (this.isBroken()) {
      return 0;
    }

    if (this.durability >= this.initialDurability * 0.3) {
      return this.attack;
    }

    return this.attack / 2;
  }

  isBroken() {
    return this.durability === 0;
  }
}

export class Arm extends Weapon {
  constructor() {
    super('Рука', 1, 300, 1);
  }
}

export class Bow extends Weapon {
  constructor() {
    super('Лук', 10, 200, 3);
  }
}

export class Sword extends Weapon {
  constructor() {
    super('Меч', 25, 500, 1);
  }
}

export class Knife extends Weapon {
  constructor() {
    super('Нож', 5, 300, 1);
  }
}

export class Staff extends Weapon {
  constructor() {
    super('Посох', 8, 300, 2);
  }
}

export class LongBow extends Bow {
  constructor() {
    super();
    this.name = 'Длинный лук';
    this.attack = 15;
    this.durability = 200;
    this.range = 4;
    this.initialDurability = 200;
  }
}

export class Axe extends Sword {
  constructor() {
    super();
    this.name = 'Секира';
    this.attack = 27;
    this.durability = 800;
    this.range = 1;
    this.initialDurability = 800;
  }
}

export class StormStaff extends Staff {
  constructor() {
    super();
    this.name = 'Посох бури';
    this.attack = 10;
    this.durability = 300;
    this.range = 3;
    this.initialDurability = 300;
  }
}

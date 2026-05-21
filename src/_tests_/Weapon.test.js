import {
  Weapon,
  Arm,
  Bow,
  Sword,
  Knife,
  Staff,
  LongBow,
  Axe,
  StormStaff,
} from '../Weapon';

describe('Weapon', () => {
  test('creates weapon with correct properties', () => {
    const weapon = new Weapon('Тест', 20, 100, 2);

    expect(weapon.name).toBe('Тест');
    expect(weapon.attack).toBe(20);
    expect(weapon.durability).toBe(100);
    expect(weapon.range).toBe(2);
  });

  test('takeDamage reduces durability', () => {
    const weapon = new Weapon('Тест', 20, 100, 2);

    weapon.takeDamage(30);

    expect(weapon.durability).toBe(70);
  });

  test('takeDamage does not reduce durability below zero', () => {
    const weapon = new Weapon('Тест', 20, 100, 2);

    weapon.takeDamage(150);

    expect(weapon.durability).toBe(0);
  });

  test('getDamage returns full attack when durability is above 30%', () => {
    const weapon = new Weapon('Тест', 20, 100, 2);

    weapon.takeDamage(60);

    expect(weapon.getDamage()).toBe(20);
  });

  test('getDamage returns half attack when durability is below 30%', () => {
    const weapon = new Weapon('Тест', 20, 100, 2);

    weapon.takeDamage(80);

    expect(weapon.getDamage()).toBe(10);
  });

  test('getDamage returns zero when broken', () => {
    const weapon = new Weapon('Тест', 20, 100, 2);

    weapon.takeDamage(100);

    expect(weapon.getDamage()).toBe(0);
  });

  test('isBroken returns true when durability is zero', () => {
    const weapon = new Weapon('Тест', 20, 100, 2);

    weapon.takeDamage(100);

    expect(weapon.isBroken()).toBe(true);
  });

  test('isBroken returns false when durability is above zero', () => {
    const weapon = new Weapon('Тест', 20, 100, 2);

    expect(weapon.isBroken()).toBe(false);
  });
});

describe('Weapon subclasses', () => {
  test('Arm has correct stats', () => {
    const weapon = new Arm();

    expect(weapon.name).toBe('Рука');
    expect(weapon.attack).toBe(1);
    expect(weapon.durability).toBe(300);
    expect(weapon.range).toBe(1);
  });

  test('Bow has correct stats', () => {
    const weapon = new Bow();

    expect(weapon.name).toBe('Лук');
    expect(weapon.attack).toBe(10);
    expect(weapon.durability).toBe(200);
    expect(weapon.range).toBe(3);
  });

  test('Sword has correct stats', () => {
    const weapon = new Sword();

    expect(weapon.name).toBe('Меч');
    expect(weapon.attack).toBe(25);
    expect(weapon.durability).toBe(500);
    expect(weapon.range).toBe(1);
  });

  test('Knife has correct stats', () => {
    const weapon = new Knife();

    expect(weapon.name).toBe('Нож');
    expect(weapon.attack).toBe(5);
    expect(weapon.durability).toBe(300);
    expect(weapon.range).toBe(1);
  });

  test('Staff has correct stats', () => {
    const weapon = new Staff();

    expect(weapon.name).toBe('Посох');
    expect(weapon.attack).toBe(8);
    expect(weapon.durability).toBe(300);
    expect(weapon.range).toBe(2);
  });

  test('LongBow has correct stats', () => {
    const weapon = new LongBow();

    expect(weapon.name).toBe('Длинный лук');
    expect(weapon.attack).toBe(15);
    expect(weapon.durability).toBe(200);
    expect(weapon.range).toBe(4);
  });

  test('Axe has correct stats', () => {
    const weapon = new Axe();

    expect(weapon.name).toBe('Секира');
    expect(weapon.attack).toBe(27);
    expect(weapon.durability).toBe(800);
    expect(weapon.range).toBe(1);
  });

  test('StormStaff has correct stats', () => {
    const weapon = new StormStaff();

    expect(weapon.name).toBe('Посох бури');
    expect(weapon.attack).toBe(10);
    expect(weapon.durability).toBe(300);
    expect(weapon.range).toBe(3);
  });
});

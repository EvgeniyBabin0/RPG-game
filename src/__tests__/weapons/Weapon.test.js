import Weapon from '../../js/weapons/Weapon';
import Arm from '../../js/weapons/Arm';
import Bow from '../../js/weapons/Bow';
import Sword from '../../js/weapons/Sword';
import LongBow from '../../js/weapons/LongBow';
import Axe from '../../js/weapons/Axe';
import StormStaff from '../../js/weapons/StormStaff';

describe('Weapon', () => {
  test('creates weapon with initDurability', () => {
    const weapon = new Weapon('Test', 20, 100, 2);

    expect(weapon.name).toBe('Test');
    expect(weapon.attack).toBe(20);
    expect(weapon.durability).toBe(100);
    expect(weapon.initDurability).toBe(100);
    expect(weapon.range).toBe(2);
  });

  test('takeDamage decreases durability but not below zero', () => {
    const weapon = new Weapon('Test', 20, 10, 1);

    weapon.takeDamage(4);
    expect(weapon.durability).toBe(6);

    weapon.takeDamage(20);
    expect(weapon.durability).toBe(0);
  });

  test('arm durability stays Infinity', () => {
    const arm = new Arm();

    arm.takeDamage(999);
    expect(arm.durability).toBe(Infinity);
  });

  test('getDamage returns full attack when durability is at least 30 percent', () => {
    const bow = new Bow();

    bow.takeDamage(100);
    expect(bow.getDamage()).toBe(10);
  });

  test('getDamage returns half attack when durability is below 30 percent', () => {
    const sword = new Sword();

    sword.takeDamage(400);
    expect(sword.getDamage()).toBe(12.5);
  });

  test('broken weapon returns zero damage', () => {
    const sword = new Sword();

    sword.takeDamage(1000);
    expect(sword.getDamage()).toBe(0);
    expect(sword.isBroken()).toBe(true);
  });

  test('enhanced weapons have correct values', () => {
    const longBow = new LongBow();
    const axe = new Axe();
    const stormStaff = new StormStaff();

    expect(longBow.name).toBe('Длинный лук');
    expect(longBow.attack).toBe(15);
    expect(longBow.range).toBe(4);

    expect(axe.name).toBe('Секира');
    expect(axe.attack).toBe(27);
    expect(axe.durability).toBe(800);

    expect(stormStaff.name).toBe('Посох Бури');
    expect(stormStaff.attack).toBe(10);
    expect(stormStaff.range).toBe(3);
  });
});

import Warrior from '../../js/players/Warrior';
import Archer from '../../js/players/Archer';
import Mage from '../../js/players/Mage';
import Dwarf from '../../js/players/Dwarf';
import Demiurge from '../../js/players/Demiurge';

describe('Special player classes', () => {
  test('archer uses special damage formula', () => {
    const archer = new Archer(0, 'Legolas');

    jest.spyOn(archer, 'getLuck').mockReturnValue(1);
    expect(archer.getDamage(2)).toBe(10);
  });

  test('warrior can spend magic instead of life', () => {
    const warrior = new Warrior(0, 'Hero');

    warrior.life = 50;
    jest.spyOn(warrior, 'getLuck').mockReturnValue(1);

    warrior.takeDamage(5);

    expect(warrior.life).toBe(50);
    expect(warrior.magic).toBe(15);
  });

  test('mage reduces damage when magic is above 50', () => {
    const mage = new Mage(0, 'Gandalf');

    mage.takeDamage(20);

    expect(mage.life).toBe(60);
    expect(mage.magic).toBe(88);
  });

  test('dwarf takes half damage on every sixth hit when lucky', () => {
    const dwarf = new Dwarf(0, 'Gimli');

    jest.spyOn(dwarf, 'getLuck').mockReturnValue(1);

    dwarf.takeDamage(10);
    dwarf.takeDamage(10);
    dwarf.takeDamage(10);
    dwarf.takeDamage(10);
    dwarf.takeDamage(10);
    dwarf.takeDamage(10);

    expect(dwarf.life).toBe(75);
  });

  test('demiurge can deal 1.5x damage when has mana and enough luck', () => {
    const demiurge = new Demiurge(0, 'Deus');

    jest.spyOn(demiurge, 'getLuck').mockReturnValue(1);

    const damage = demiurge.getDamage(1);
    expect(damage).toBeGreaterThan(0);
  });
});

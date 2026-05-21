import Player from '../../js/players/Player';
import Warrior from '../../js/players/Warrior';
import Archer from '../../js/players/Archer';
import Knife from '../../js/weapons/Knife';
import Arm from '../../js/weapons/Arm';

describe('Player', () => {
  test('has default properties', () => {
    const player = new Player(5, 'Batman');

    expect(player.life).toBe(100);
    expect(player.magic).toBe(20);
    expect(player.speed).toBe(1);
    expect(player.attack).toBe(10);
    expect(player.agility).toBe(5);
    expect(player.luck).toBe(10);
    expect(player.position).toBe(5);
    expect(player.name).toBe('Batman');
  });

  test('takeDamage decreases life but not below zero', () => {
    const player = new Player(0, 'Test');

    player.takeDamage(30);
    expect(player.life).toBe(70);

    player.takeDamage(100);
    expect(player.life).toBe(0);
  });

  test('isDead returns true when life is zero', () => {
    const player = new Player(0, 'Test');

    player.takeDamage(100);
    expect(player.isDead()).toBe(true);
  });

  test('moveLeft and moveRight use speed limit', () => {
    const warrior = new Warrior(6, 'Hero');

    warrior.moveLeft(5);
    expect(warrior.position).toBe(4);

    warrior.moveRight(10);
    expect(warrior.position).toBe(6);
  });

  test('move works in both directions', () => {
    const player = new Player(10, 'Test');

    player.move(-4);
    expect(player.position).toBe(9);

    player.move(3);
    expect(player.position).toBe(10);
  });

  test('getDamage returns zero when enemy is out of range', () => {
    const player = new Player(0, 'Test');

    jest.spyOn(player, 'getLuck').mockReturnValue(1);
    expect(player.getDamage(2)).toBe(0);
  });

  test('checkWeapon replaces broken main weapon with knife', () => {
    const warrior = new Warrior(0, 'Hero');

    warrior.weapon.takeDamage(1000);
    warrior.checkWeapon();

    expect(warrior.weapon instanceof Knife).toBe(true);
  });

  test('checkWeapon replaces broken knife with arm', () => {
    const player = new Player(0, 'Test');

    player.weapon = new Knife();
    player.weapon.takeDamage(1000);
    player.checkWeapon();

    expect(player.weapon instanceof Arm).toBe(true);
  });

  test('chooseEnemy selects alive enemy with minimal life', () => {
    const player = new Player(0, 'A');
    const enemy1 = new Player(1, 'B');
    const enemy2 = new Player(2, 'C');

    enemy1.life = 40;
    enemy2.life = 20;

    expect(player.chooseEnemy([player, enemy1, enemy2])).toBe(enemy2);
  });

  test('moveToEnemy moves towards enemy', () => {
    const warrior = new Warrior(0, 'Hero');
    const enemy = new Player(10, 'Enemy');

    warrior.moveToEnemy(enemy);
    expect(warrior.position).toBe(2);
  });

  test('tryAttack does nothing when enemy is out of range', () => {
    const warrior = new Warrior(0, 'Hero');
    const archer = new Archer(5, 'Enemy');

    jest.spyOn(warrior, 'getLuck').mockReturnValue(1);
    jest.spyOn(archer, 'isAttackBlocked').mockReturnValue(false);
    jest.spyOn(archer, 'dodged').mockReturnValue(false);

    warrior.tryAttack(archer);
    expect(archer.life).toBe(80);
  });

  test('tryAttack deals damage when enemy is in range', () => {
    const warrior = new Warrior(0, 'Hero');
    const archer = new Archer(1, 'Enemy');

    jest.spyOn(warrior, 'getLuck').mockReturnValue(1);
    jest.spyOn(archer, 'isAttackBlocked').mockReturnValue(false);
    jest.spyOn(archer, 'dodged').mockReturnValue(false);

    warrior.tryAttack(archer);
    expect(archer.life).toBeLessThan(80);
  });
});

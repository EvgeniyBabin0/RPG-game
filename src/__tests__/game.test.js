import play from '../js/game';
import Warrior from '../js/players/Warrior';
import Archer from '../js/players/Archer';

describe('play', () => {
  test('returns winner', () => {
    const warrior = new Warrior(0, 'Hero');
    const archer = new Archer(1, 'Enemy');

    jest.spyOn(warrior, 'getLuck').mockReturnValue(1);
    jest.spyOn(archer, 'getLuck').mockReturnValue(0.1);

    const winner = play([warrior, archer]);

    expect(winner).not.toBeNull();
    expect(winner.isDead()).toBe(false);
  });
});

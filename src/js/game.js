export default function play(players) {
  let round = 1;

  while (players.filter((player) => !player.isDead()).length > 1) {
    // eslint-disable-next-line no-console
    console.log(`Раунд ${round}`);

    players.forEach((player) => {
      if (!player.isDead()) {
        player.turn(players);
      }
    });

    round += 1;
  }

  return players.find((player) => !player.isDead()) || null;
}

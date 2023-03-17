const progressStats = {
  "archery-mission-lvl": {
    fails: 9,
    gameId: "archery-world-tour",
    playTime: 5291.706,
    wins: 8,
  },
  "archery-world-mission-1": {
    fails: 9,
    gameId: "archery-world-tour",
    playTime: 981,
    wins: 6,
  },
  "bubble-woods-mission-1": {
    fails: 19,
    gameId: "bubble-woods",
    playTime: 1206,
    wins: 9,
  },
  "bubble-woods-mission-lvl": {
    fails: 1,
    gameId: "bubble-woods",
    playTime: 100,
    wins: 2,
  },
  "candy-bubble-mission-lvl": {
    fails: 6,
    gameId: "candy-bubble",
    playTime: 1558,
    wins: 6,
  },
};

// Use Object.values() to get an array of all progress stat objects, and apply reduce() to group and accumulate stats by game
const gameStats = Object.values(progressStats).reduce((acc, stat) => {
  // Get the gameId property of the current stat object
  const gameId = stat.gameId;

  // Check if there's already an existing game object in the accumulator array with the same gameId
  const existingGame = acc.find((game) => game.gameId === gameId);

  // If there's an existing game object, update its playTime, wins, and fails properties with the corresponding values from the current stat object
  if (existingGame) {
    existingGame.playTime += stat.playTime;
    existingGame.wins += stat.wins;
    existingGame.fails += stat.fails;
  }
  // If there's no existing game object, create a new game object with the gameId, playTime, wins, and fails properties from the current stat object and add it to the accumulator array
  else {
    acc.push({
      gameId: gameId,
      playTime: stat.playTime,
      wins: stat.wins,
      fails: stat.fails,
    });
  }

  // Return the updated accumulator array for the next iteration of reduce()
  return acc;
}, []);

// Log the final array of game stats to the console
console.log(gameStats);

const { BracketsManager } = require('brackets-manager');
const { InMemoryDatabase } = require('brackets-memory-db');
const { InputStage } = require('brackets-model');

// import { InMemoryDatabase } from "brackets-memory-db";
// import { BracketsManager } from "brackets-manager";
// import { InputStage } from "brackets-model";

const exampleOne = async () => {
  const storage = new InMemoryDatabase();
  const manager = new BracketsManager(storage);

  // Get current tournament standing
  const standing = {
    tournamentId: 0,
    name: 'Test',
    type: 'single_elimination',
    seeding: [
      'Team 1', 'Team 2', 'Team 3', 'Team 4',
      'Team 5', 'Team 6', 'Team 7', 'Team 8'
    ],
    settings: {
      size: 8,
    },
  }

  // Create tournament
  await manager.create(standing);


  // Do tournament
  await manager.update.match({id: 0, opponent1: { result: 'win' }});
  await manager.update.match({id: 1, opponent2: { result: 'win' },});


  // Export to Object
  const res = await manager.export()

  console.log(res)


  // Get Updated tournament
  await manager.import(res);


  // Export to Object
  const res2 = await manager.export()
  console.log(res2)
}

exampleOne()
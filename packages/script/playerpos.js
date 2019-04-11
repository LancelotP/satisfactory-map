#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');

const CHAR_PLAYER_LOCATOR_HEX = '506C617965722F436861725F506C61796572';
const START_PLAYER_ID_BYTE_SHIFTING = 105;
const START_LOCATION_BYTE_SHIFTING = 127;

function list(val) {
  return val.split(',');
}

function getNewLocation(x, y, z) {
  if(x !== undefined && isNaN(x)) {
    console.error('error: `X axis` is not a float : ' + x);
    process.exit(1);
  }
  
  if(y !== undefined && isNaN(y)) {
    console.error('error: `Y axis` is not a float : ' + y);
    process.exit(1);
  }
  
  if(z !== undefined && isNaN(z)) {
    console.error('error: `Z axis` is not a float : ' + z);
    process.exit(1);
  }
  
  let newLocation = {
    x: x,
    y: y,
    z: z
  }
  
  return newLocation;
}

function getPlayerLocations(savefile, playerIndexes) {
  let buffer = fs.readFileSync(savefile);

  let playerLocations = [];
  let playerLocation = {
    id: null,
    x: null,
    y: null,
    z: null
  }
  
  let currentIndex = -1;
  let currentIdIndex;
  let currentLocationIndex;
  
  while((currentIndex = buffer.indexOf(CHAR_PLAYER_LOCATOR_HEX, currentIndex + 1, 'hex')) != -1) {
    currentIdIndex = currentIndex + START_PLAYER_ID_BYTE_SHIFTING;
    let currentId = buffer.toString('ascii', currentIdIndex, currentIdIndex + 1);
    
    if(playerIndexes && !playerIndexes.includes(currentId))
      continue;
    
    currentLocationIndex = currentIndex + START_LOCATION_BYTE_SHIFTING;
    let currentPlayerLocation = Object.assign({}, playerLocation);

    currentPlayerLocation.id = currentId;
    currentPlayerLocation.x = buffer.readFloatLE(currentLocationIndex);
    currentPlayerLocation.y = buffer.readFloatLE(currentLocationIndex + 4);
    currentPlayerLocation.z = buffer.readFloatLE(currentLocationIndex + 8);
    
    playerLocations.push(currentPlayerLocation);
  }
  
  console.info(playerLocations.length + ' player locations have been found')
  console.info(JSON.stringify(playerLocations, null, 2), '\n')
}

function setPlayerLocations(savefile, newLocation, playerIndexes, output) {
  let buffer = fs.readFileSync(savefile);
  
  let currentIndex = -1;
  let currentIdIndex;
  let currentLocationIndex;
  let playerCount = 0;
  
  while((currentIndex = buffer.indexOf(CHAR_PLAYER_LOCATOR_HEX, currentIndex + 1, 'hex')) != -1) {
    currentIdIndex = currentIndex + START_PLAYER_ID_BYTE_SHIFTING;
    let currentId = buffer.toString('ascii', currentIdIndex, currentIdIndex + 1);
    
    if(playerIndexes && !playerIndexes.includes(currentId))
      continue;
    
    currentLocationIndex = currentIndex + START_LOCATION_BYTE_SHIFTING;
    
    if(newLocation.x != undefined)
      buffer.writeFloatLE(newLocation.x, currentLocationIndex);
    if(newLocation.y != undefined)
      buffer.writeFloatLE(newLocation.y, currentLocationIndex + 4);
    if(newLocation.z != undefined)
      buffer.writeFloatLE(newLocation.z, currentLocationIndex + 8);

    playerCount++;
  }
  
  if(output) {
    let dir = output.split('/').slice(0,-1).join('/');

    if (fs.existsSync(dir)===false)
      fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(output, buffer);
  } else
    fs.writeFileSync(savefile, buffer);

  console.info(playerCount + ' player locations have been changed')
  console.info(JSON.stringify([newLocation], null, 2), '\n')
}

program
  .version('0.0.1', '-v, --version')
  .description('Retrieves or updates players locations for a save file of Satisfactory');

program
  .command('get <savefile>')
  .option('-i, --indexes <0,1,2,..>', 'specifies players indexes to retrieve', list)
  .alias('g')
  .description('Retrieves players locations from a save file of Satisfactory')
  .action(function (savefile, cmd) {
    getPlayerLocations(savefile, cmd.indexes);
  })
  
program
  .command('set <savefile>')
  .option('-o, --output <savefile>', 'specifies a different path to write save file')
  .option('-i, --indexes <0,1,2,..>', 'specifies players indexes to update', list)
  .option('--x <float>', 'specifies the new X axis value')
  .option('--y <float>', 'specifies the new Y axis value')
  .option('--z <float>', 'specifies the new Z axis value')
  .alias('s')
  .description('Updates players locations into a save file of Satisfactory')
  .action(function (savefile, cmd) {
    setPlayerLocations(savefile, getNewLocation(cmd.x, cmd.y, cmd.z), cmd.indexes, cmd.output);
  })

program.parse(process.argv)

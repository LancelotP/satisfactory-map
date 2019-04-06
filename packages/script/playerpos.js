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

function getNewLocation(axes, cmd) {
  let axesIndexes = {
    x: Object.keys(cmd).indexOf('x'),
    y: Object.keys(cmd).indexOf('y'),
    z: Object.keys(cmd).indexOf('z')
  }

  let min = Math.min.apply(null, Object.values(axesIndexes).filter(n => n != -1));
  
  if(min == Infinity) {
    axesIndexes = {
      x: 0,
      y: 1,
      z: 2
    }
  } else {
    axesIndexes = {
      x: axesIndexes.x - min,
      y: axesIndexes.y - min,
      z: axesIndexes.z - min
    }
  }
  
  let x = axes[axesIndexes['x']] ? Number(axes[axesIndexes['x']]) : undefined;
  let y = axes[axesIndexes['y']] ? Number(axes[axesIndexes['y']]) : undefined;
  let z = axes[axesIndexes['z']] ? Number(axes[axesIndexes['z']]) : undefined;
  
  if(x !== undefined && isNaN(x)) {
    console.error('error: `x axis` is not a float : ' + axes[axesIndexes['x']]);
    process.exit(1);
  }
  
  if(y !== undefined && isNaN(y)) {
    console.error('error: `y axis` is not a float : ' + axes[axesIndexes['y']]);
    process.exit(1);
  }
  
  if(z !== undefined && isNaN(z)) {
    console.error('error: `z axis` is not a float : ' + axes[axesIndexes['z']]);
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

function setPlayerLocations(savefile, newLocation, playerIndexes) {
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
  .command('set <savefile> <axes...>')
  .option('-i, --indexes <0,1,2,..>', 'specifies players indexes to update', list)
  .option('-x, --x', 'specifies whether the X axis is filled')
  .option('-y, --y', 'specifies whether the Y axis is filled')
  .option('-z, --z', 'specifies whether the Z axis is filled')
  .alias('s')
  .description('Updates players locations into a save file of Satisfactory')
  .action(function (savefile, axes, cmd) {
    setPlayerLocations(savefile, getNewLocation(axes, cmd), cmd.indexes);
  })

program.parse(process.argv)
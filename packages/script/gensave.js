#!/usr/bin/env node

const program = require('commander');
const { execSync } = require('child_process')
const fs = require('fs');
const path = require('path');

function list(val) {
  return val.split(',');
}

function getOffset(x, y, z) {
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
    x: x === undefined ? 0 : Number(x),
    y: y === undefined ? 0 : Number(y),
    z: z === undefined ? 0 : Number(z)
  }
  
  return newLocation;
}

function generateSave(savefile, targets, cmd) {
  // todo: add file check
  const inputFile = targets;
  const outputFolder = cmd.output;
  const offset = getOffset(cmd.x, cmd.y, cmd.z);
  const data = JSON.parse(fs.readFileSync(inputFile));

  let child;
  let playerposCommand = 'playerpos';
  let playerIndexes = undefined;

  if (data.objects.length < 1) {
    console.info('info: <targets> file does not contain any object');
    process.exit(1);
  }

  if (process.platform === 'win32') {
    playerposCommand = 'playerpos.cmd';
  }

  if (cmd.indexes !== undefined)
    playerIndexes = cmd.indexes.join(',');

  data.objects.forEach(obj => {
    locX = parseFloat(obj.x + offset.x);
    locY = parseFloat(obj.y + offset.y);
    locZ = parseFloat(obj.z + offset.z);
    
    let outputFile = outputFolder + path.sep + data.type + '_' + obj.origin_id + '.sav';
    let command = playerposCommand + ' set -o ' + outputFile + ' ' + savefile + ' --x=' + locX + ' --y=' + locY + ' --z=' + locZ;
    
    if (playerIndexes !== undefined)
      command += ' -i ' + playerIndexes;
    
    child = execSync(command);
    
    console.info(outputFile + ' processed');
  });
}

program
  .version('0.0.1', '-v, --version')
  .description('Allows you to generate multiple save files by linking players to each target locations from <targets> file and <savefile> of Satisfactory')
  .arguments('<savefile> <targets>')
  .option('-o, --output <folder>', 'specifies a folder to write save files', './data/gensaves')
  .option('-i, --indexes <0,1,2,..>', 'specifies players indexes to update', list)
  .option('--x <float>', 'specifies x offset')
  .option('--y <float>', 'specifies y offset')
  .option('--z <float>', 'specifies z offset')
  .action(function (savefile, targets, cmd) {
    generateSave(savefile, targets, cmd);
  })

program.parse(process.argv);

#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const RTree = require('rbush-3d');
const program = require('commander');

const CONFIG = require('./config/extract.config.json');
let SEED = null;

const blockingObjects = {};
const blockingMapping = {};
const mapping = {};
const data = {};

function getPointsInBox(source, targets, edgeLength) {
  return targets.search({
    minX: source[0] - edgeLength/2,
    minY: source[1] - edgeLength/2,
    minZ: source[2] - edgeLength/2,
    maxX: source[0] + edgeLength/2,
    maxY: source[1] + edgeLength/2,
    maxZ: source[2] + edgeLength/2
  });
}
  
function setupBlockingObjects() {
  let items = {};
  
  for (const [key, value] of Object.entries(CONFIG.BLOCKING_OBJECTS)) {
    items[key] = [];
    blockingObjects[key] = new RTree.RBush3D();
    blockingMapping[value] = key;
  }
  
  SEED.objects.forEach(object => {
    let type = blockingMapping[object.className];
    
    if(type === undefined)
      return;
    
    items[type].push({
      minX: object.transform.translation[0],
      minY: object.transform.translation[1],
      minZ: object.transform.translation[2],
      maxX: object.transform.translation[0],
      maxY: object.transform.translation[1],
      maxZ: object.transform.translation[2]
    });
  });
  
  for (const [key, value] of Object.entries(CONFIG.BLOCKING_OBJECTS)) {
    blockingObjects[key].load(items[key]);
  }
}

function getOriginId(name, pathName) {
  let [level, typeID] = pathName.split('.');

  level = level
    .replace('Persistent_Level:PersistentLevel', 'PL')
    .replace('Persistent_Exploration:PersistentLevel', 'PE')
    .replace('Persistent_Exploration_2:PersistentLevel', 'PE2');

  let regex = /(?<id>[\d_]+$)/;

  let {id} = typeID.match(regex).groups;

  type = CONFIG.OBJECTS[name].TYPE_ID

  return level + '_' + type + '_' + id;
}

function extractObjects() {
  for (const [key, value] of Object.entries(CONFIG.OBJECTS)) {
    data[key] = [];
    mapping[value.CLASSNAME] = key;
  }

  SEED.objects.forEach(object => {
    let type = mapping[object.className];
    
    if(type === undefined)
      return;
    
    let obj = {
      x: object.transform.translation[0],
      y: object.transform.translation[1],
      z: object.transform.translation[2],
      origin_id: getOriginId(type, object.pathName)
    }
    
    if(CONFIG.BLOCKED_OBJECTS[type]) {
      obj.isObstructed = false;
      
      CONFIG.BLOCKED_OBJECTS[type].BLOCKING.forEach(bName => {
        blockers = getPointsInBox(
          object.transform.translation, 
          blockingObjects[bName], 
          CONFIG.BLOCKED_OBJECTS[type].EDGE_LENGTH
        );
        
        if(blockers.length > 0) {
          obj.isObstructed = true;
        }
      })
    }

    data[type].push(obj);
  })
}

function writeJson(output, pretty) {
  Object.keys(data).forEach(type => {
    let jsondata = {
      "type": type,
      "objects": data[type]
    };

    if (fs.existsSync(output)===false)
      fs.mkdirSync(output, { recursive: true });
    
    let filepath = output + path.sep + type + '.json';
    
    if(pretty)
      fs.writeFileSync(filepath, JSON.stringify(jsondata, null, 2));
    else
      fs.writeFileSync(filepath, JSON.stringify(jsondata));
    
    console.info(filepath + ' processed');
  })
}

// todo: --config
program
  .version('0.0.1', '-v, --version')
  .description('Extracts differents objects into json files from a <json-savefile> of Satisfactory')
  .arguments('<json-savefile>')
  .option('-o, --output <folder>', 'specifies a folder to write extracted json files', './data/extracts')
  .option('-p, --pretty', 'specifies x offset')
  .action(function (json, cmd) {
    // todo: add file check
    SEED = JSON.parse(fs.readFileSync(json));
    setupBlockingObjects();
    extractObjects();
    writeJson(cmd.output, cmd.pretty);
  })

program.parse(process.argv);

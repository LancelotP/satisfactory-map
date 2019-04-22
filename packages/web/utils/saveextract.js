const SavefileBuffer = require('./savefileBuffer');
const sha256 = require('js-sha256');
const arrBuffToBuff = require('arraybuffer-to-buffer');

let classNameFilters = [
  "/Game/FactoryGame/-Shared/Blueprint/BP_GameState.BP_GameState_C",
  //"/Game/FactoryGame/-Shared/Blueprint/BP_GameMode.BP_GameMode_C",
  "/Game/FactoryGame/Character/Player/BP_PlayerState.BP_PlayerState_C",
  "/Game/FactoryGame/Buildable/Factory/MinerMK1/Build_MinerMk1.Build_MinerMk1_C",
  "/Game/FactoryGame/Buildable/Factory/MinerMk2/Build_MinerMk2.Build_MinerMk2_C",
  "/Game/FactoryGame/Buildable/Factory/OilPump/Build_OilPump.Build_OilPump_C",
  "/Game/FactoryGame/Buildable/Factory/GeneratorGeoThermal/Build_GeneratorGeoThermal.Build_GeneratorGeoThermal_C",
  "/Game/FactoryGame/World/Benefit/DropPod/BP_DropPod.BP_DropPod_C",
  "/Game/FactoryGame/Equipment/Beacon/BP_Beacon.BP_Beacon_C"
]



function getExtractData(arrBuff) {
  let extractData = {
    "saveID": null,
    "playerOwnerID": null,
    "saveName": null,
    "saveTimeStamp": null,
    "playDurationSeconds": null,
    "players": [],
    "miners": [],
    "collected": [],
    "beacons": []
  }
  
  let filtersID = [];
  let playerOwnerPathname;  
  let geysers = [];

  let sb = new SavefileBuffer(arrBuffToBuff(arrBuff))

  sb.readHeader();
  sb.readObjects();
  setupGeysers();
  readFilteredEntities();
  sb.readCollectedItems();
  computeExtractData()
  
  return extractData;
  function setupGeysers() {
    for (let i = 0; i < sb.data.objects.length; i++) {
      if (sb.data.objects[i].className === '/Game/FactoryGame/Resource/BP_ResourceNodeGeyser.BP_ResourceNodeGeyser_C')
        geysers.push({
          "x": sb.data.objects[i].transform.translation[0],
          "y": sb.data.objects[i].transform.translation[1],
          "levelName": sb.data.objects[i].levelName,
          "pathName": sb.data.objects[i].pathName
        })
    }
  }
  
  function readFilteredEntities() {
    let entityCount = sb.readInt();
  
    for (let i = 0; i < entityCount; i++) {
      let length = sb.readInt();
      let currentObject = sb.data.objects[i];
      
      if(classNameFilters.includes(currentObject.className)) {
        readFilteredEntity(length, currentObject);
        filtersID.push(i);
      } else {
        sb.skipByte(length);
      }
    }
  }
  
  function readEntityChildren (object) {
    if (object.type === 1) {
      sb.readPrefixedString();
      sb.readPrefixedString();
      
      let childCount = sb.readInt();
      for (let i = 0; i < childCount; i++) {
        sb.readPrefixedString();
        sb.readPrefixedString();
      }
    }
  }
  
  function readMissingBytes (object, startBytesRead, length) {
    switch(object.className) {
      case '/Game/FactoryGame/Character/Player/BP_PlayerState.BP_PlayerState_C':
        sb.readInt(true);
        sb.readHex(2)
        object.prop["id"] = sb.readHex(16);
      break;
      
      case '/Game/FactoryGame/-Shared/Blueprint/BP_GameState.BP_GameState_C':
        sb.readInt(true);
        sb.readInt(true); // count === 1?
        object.prop["levelName"] = sb.readPrefixedString()
        object.prop["pathName"]= sb.readPrefixedString()
      break;
      
      default:
      break;
    }
    
    let missingLength = (startBytesRead + length) - sb.bytesRead;
    let missing = sb.readHex(missingLength);
  }
  
  function readUsefulProperties(object) {
    object['prop'] = [];
    while(readUsefulProperty(object))
      continue;
  }
  
  function readFilteredEntity(length, object) {
    let startBytesRead = sb.bytesRead;
    
    readEntityChildren(object);
    readUsefulProperties(object);
    readMissingBytes(object, startBytesRead, length);
  }
  
  function computeExtractData() {
    filtersID.forEach(function(id){
      let object = sb.data.objects[id];
      let target, pos, typeID, node;
      
      switch (object.className) {
        case '/Game/FactoryGame/Character/Player/BP_PlayerState.BP_PlayerState_C':
          target = getTargetObject(object.prop.levelName, object.prop.pathName);
          pos = target.transform.translation;
            
          extractData.players.push({
            "id": object.prop.id,
            "x": pos[0],
            "y": pos[1],
            "z": pos[2]
          })
            
          // is owner ?
          if (object.pathName === playerOwnerPathname)
            extractData.playerOwnerID = object.prop.id;
        break;
        
        case '/Game/FactoryGame/-Shared/Blueprint/BP_GameState.BP_GameState_C':
          playerOwnerPathname = object.prop["pathName"];
        break;
        
        case '/Game/FactoryGame/Buildable/Factory/MinerMK1/Build_MinerMk1.Build_MinerMk1_C':
          target = getTargetObject(object.prop.levelName, object.prop.pathName);
          typeID = getOriginTypeAndId(target.pathName)
          
          extractData.miners.push({
            "targetType": typeID.type,
            "targetID": typeID.id,
            "type": 'miner',
            "level": 1
          })
          
        break;
        
        case '/Game/FactoryGame/Buildable/Factory/MinerMk2/Build_MinerMk2.Build_MinerMk2_C':
          target = getTargetObject(object.prop.levelName, object.prop.pathName);
          typeID = getOriginTypeAndId(target.pathName)
          
          extractData.miners.push({
            "targetType": typeID.type,
            "targetID": typeID.id,
            "type": 'miner',
            "level": 2
          })
          
        break;
        
        case '/Game/FactoryGame/Buildable/Factory/OilPump/Build_OilPump.Build_OilPump_C':
          target = getTargetObject(object.prop.levelName, object.prop.pathName);
          typeID = getOriginTypeAndId(target.pathName)
          
          extractData.miners.push({
            "targetType": typeID.type,
            "targetID": typeID.id,
            "type": 'oilpump',
            "level": 1
          })
        break;
        
        case '/Game/FactoryGame/Buildable/Factory/GeneratorGeoThermal/Build_GeneratorGeoThermal.Build_GeneratorGeoThermal_C':
          node = getGeyserNode(object.levelName, object.pathName);
          target = getTargetObject(node.levelName, node.pathName);
          typeID = getOriginTypeAndId(target.pathName)
          
          extractData.miners.push({
            "targetType": typeID.type,
            "targetID": typeID.id,
            "type": 'geothermal',
            "level": 1
          })
        break;
        
        case '/Game/FactoryGame/World/Benefit/DropPod/BP_DropPod.BP_DropPod_C':
          if(object.prop.opened == true) {
            typeID = getOriginTypeAndId(object.pathName)
            if (typeID != null) {
              extractData.collected.push({
                "type": typeID.type,
                "id": typeID.id
              })
            }
          }
        break;
        
        case '/Game/FactoryGame/Equipment/Beacon/BP_Beacon.BP_Beacon_C':
          pos = object.transform.translation;
          
          extractData.beacons.push({
            "text": object.prop.text,
            "x": pos[0],
            "y": pos[1],
            "z": pos[2]
          })
        break;
        
        default:
          console.error('undefined className : ' + object.className);
        break;
        
      }
    })
    
    // COLLECTED
    const collectedCount = sb.data.collected.length;
    for (let i = 0; i < collectedCount; i++) {
      let typeID = getOriginTypeAndId(sb.data.collected[i].pathName)
      
      if (typeID != null) {
        extractData.collected.push({
          "type": typeID.type,
          "id": typeID.id
        })
      }
    }
    
    extractData.saveName = sb.data.sessionName;
    extractData.saveTimeStamp = Math.trunc(sb.data.saveDateTime / 10000000 - 62135596800);
    extractData.playDurationSeconds = sb.data.playDurationSeconds;
    extractData.saveID = sha256(extractData.playerOwnerID + sb.data.sessionName);
  }
  
  function readUsefulProperty(object) {
    let name = sb.readPrefixedString()
    
    if (name == 'None') {
      return false;
    }
    
    let prop = sb.readPrefixedString()
    let length = sb.readInt()
    let zero = sb.readInt()
    
    // replace sb.readXXX by sb.skypByte
    if (prop == 'ByteProperty') {
      sb.readPrefixedString(true)
      sb.bytesRead += length + 1;    
    } else if (prop == 'StrProperty') {
      sb.bytesRead += length + 1;    
    } else if (prop == 'NameProperty') {
      sb.bytesRead += length + 1;    
    } else if (prop == 'ObjectProperty') {
      if (name == 'mOwnedPawn') {
        sb.readByte(true)
        object.prop["levelName"] = sb.readPrefixedString()
        object.prop["pathName"]= sb.readPrefixedString()
      } else if (name == 'mExtractResourceNode') {
        sb.readByte(true)
        object.prop["levelName"] = sb.readPrefixedString()
        object.prop["pathName"] = sb.readPrefixedString()
      } else
        sb.bytesRead += length + 1;    
    } else if (prop == 'ArrayProperty') {
      sb.readPrefixedString(true)
      sb.bytesRead += length + 1;    
    } else if (prop == 'IntProperty') {
      sb.bytesRead += length + 1;    
    } else if (prop == 'FloatProperty') {
      sb.bytesRead += length + 1;    
    } else if (prop == 'TextProperty') {
      if (name == 'mCompassText') {
        sb.readHex(14, true);
        object.prop["text"] = sb.readPrefixedString();
      } else
        sb.bytesRead += length + 1;    
    } else if (prop == 'BoolProperty') {
      if (name == 'mHasBeenOpened') {
        let opened = sb.readByte()
        if (opened)
          object.prop["opened"] = true;
        
        sb.readByte(true);
      } else
        sb.bytesRead += 2;    
    } else if (prop == 'StructProperty') {
      sb.readPrefixedString(true)
      sb.bytesRead += length + 1 + 16;    
    } else if (prop == 'MapProperty') {
      sb.readPrefixedString(true)
      sb.readPrefixedString(true)
      sb.bytesRead += length + 1;    
    } else if (prop == 'EnumProperty') {
      sb.readPrefixedString(true)
      sb.bytesRead += length + 1;    
    } else {
      console.log("undefined prop '" + prop + "' for : " + name)
      process.exit(1);
    }
    
    return true;
  }
  
  function getTargetObject(levelName, pathName) {
    for (let i = 0; i < sb.data.objects.length; i++) {
      if ((sb.data.objects[i].pathName === pathName) && (sb.data.objects[i].levelName === levelName))
        return sb.data.objects[i];
    }
    
    return null;
  }
  
  function getOriginTypeAndId(pathName) {
    // TODO : fix type id
    let [level, typeID] = pathName.split('.');
  
    level = level
      .replace('Persistent_Level:PersistentLevel', 'PL')
      .replace('Persistent_Exploration:PersistentLevel', 'PE')
      .replace('Persistent_Exploration_2:PersistentLevel', 'PE2');
      
    let regex = /(^[\D_]+?)([\d_]+$)/;
  
    let [_, type, id] = typeID.match(regex);
    
    let typeMin = null;
    let toReturn = true;
    switch (type) {
      case 'BP_ResourceNode':
        type = 'RESOURCE_NODE';
        typeMin = 'RN';
      break;
      
      case 'BP_ResourceNodeGeyser':
        type = 'RESOURCE_NODE_GEYSER';
        typeMin = 'RNG';
      break;
      
      case 'BP_Crystal':
        type = 'SLUG_GREEN';
        typeMin = 'C';
      break;
      
      case 'BP_Crystal_mk':
        let mk = id.charAt(0);
        
        if (mk == '2') {
          type = 'SLUG_YELLOW';
          typeMin = 'CMK2';
        } else if (mk == '3') {
          type = 'SLUG_PURPLE';
          typeMin = 'CMK3';
        } else {
          console.error('undef mk : ' + mk);
        }
      break;
  
      case 'BP_WAT':
        let wat = id.charAt(0);
        
        if (wat == '1') {
          type = 'WAT1';
          typeMin = 'WAT1';
        } else if (wat == '2') {
          type = 'WAT2';
          typeMin = 'WAT2';
        } else {
          /*console.error('undef wat : ' + wat);
          console.error('\t' + pathName)*/
        }
      break;
      
      case 'BP_DropPod':
        type = 'DROP_POD';
        typeMin = 'DP';
      break;
      
      case 'BP_Shroom':
      case 'FGItemPickup_Spawnable':
      case 'BP_NutBush':
      case 'BP_BerryBush':
      case 'BP_DestructibleLargeRock':
      case 'BP_DestructibleSmallRock':
      case '':
      case '':
        // do nothing
        toReturn = false;
      break;
      
      /*case '':
        type = '';
        typeMin = '';
      break;*/
      
      default:
        toReturn = false;
        console.error('undef type : ' + type);
        console.log(pathName);
      break;
    }
    
    if (toReturn) {
      return {
        "type": type,
        "id" : level + '_' + typeMin + '_' + id
      }
    } else {
      return null;
    }
  }
  
  function getGeyserNode(levelName, pathName) {
    let target = getTargetObject(levelName, pathName);
    let pos = target.transform.translation;
    
    for (let i = 0; i < geysers.length; i++) {
      if ((geysers[i].x === pos[0]) && (geysers[i].y === pos[1]))
        return { "levelName": geysers[i].levelName, "pathName": geysers[i].pathName };
    }
    
    return null;
  }
}


module.exports = getExtractData
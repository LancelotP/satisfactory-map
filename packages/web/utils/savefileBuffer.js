const Int64LE = require("int64-buffer").Int64LE;

class SavefileBuffer {
  constructor(buffer) {
    this.buffer = buffer;
    this.bytesRead = 0;
    
    this.data = {};
  }
  
  skipByte(count) {
    this.bytesRead += count;
  }
  
  readByte() {
    let data = this.buffer.readIntLE(this.bytesRead, 1);
    this.bytesRead += 1;
    return data;
  }

  readInt() {
    let data = this.buffer.readIntLE(this.bytesRead, 4);
    this.bytesRead += 4;
    return data;
  }

  readFloat() {
    let data = this.buffer.readFloatLE(this.bytesRead, 4);
    this.bytesRead += 4;
    return data;
  }

  readLong() {
    var int64 = new Int64LE(this.buffer, this.bytesRead);
    let data = int64.toNumber(true);
    this.bytesRead += 8;
    return data;
  }

  readHex(length) {
    let data = this.buffer.toString('hex', this.bytesRead, this.bytesRead + length);
    this.bytesRead += length;
    return data;
  }

  readString(length) {
    // check for last byte === x00
    let data = this.buffer.toString('ascii', this.bytesRead, this.bytesRead + length - 1);
    this.bytesRead += length;
    return data;
  }

  readPrefixedString() {
    let length = this.readInt();
    let data = this.readString(length);
    return data;
  }
  
  readActor() {
    let className = this.readPrefixedString()
    let levelName = this.readPrefixedString()
    let pathName = this.readPrefixedString()
    let needTransform = this.readInt()

    let a = this.readFloat()
    let b = this.readFloat()
    let c = this.readFloat()
    let d = this.readFloat()
    let x = this.readFloat()
    let y = this.readFloat()
    let z = this.readFloat()
    let sx = this.readFloat()
    let sy = this.readFloat()
    let sz = this.readFloat()

    let wasPlacedInLevel = this.readInt()

    return {
      'type': 1,
      'className': className,
      'levelName': levelName,
      'pathName': pathName,
      'needTransform': needTransform,
      'transform': {
          'rotation': [a, b, c, d],
          'translation': [x, y, z],
          'scale3d': [sx, sy, sz],

      },
      'wasPlacedInLevel': wasPlacedInLevel
    }
  }
  
  readObject() {
    let className = this.readPrefixedString()
    let levelName = this.readPrefixedString()
    let pathName = this.readPrefixedString()
    let outerPathName = this.readPrefixedString()

    return {
      'type': 0,
      'className': className,
      'levelName': levelName,
      'pathName': pathName,
      'outerPathName': outerPathName
    }
  }
  
  readHeader() {
    this.data = {
      'saveHeaderType': this.readInt(),
      'saveVersion': this.readInt(),
      'buildVersion': this.readInt(),
      'mapName': this.readPrefixedString(),
      'mapOptions': this.readPrefixedString(),
      'sessionName': this.readPrefixedString(),
      'playDurationSeconds': this.readInt(),
      'saveDateTime': this.readLong(),
      'sessionVisibility': this.readByte(),
      'objects': [],
      'collected': []
    }
  }
  
  readObjects() {
    let objectCount = this.readInt();
    
    for (let i = 0; i < objectCount; i++) {
      let type = this.readInt();
      
      if (type === 1)
        this.data.objects.push(this.readActor());
      else if (type === 0)
        this.data.objects.push(this.readObject());
      // else ?
    }
  }
  
  readEntity(length, object) {
    let startBytesRead = this.bytesRead;
    
    readEntityChildren(object);
    readProperties();
    readMissingBytes(startBytesRead, length);
  }
  
  readEntity(index) {
    let length = this.readInt();
    let startBytesRead = this.bytesRead;

    let entity = {
      properties: [],
      children: [],
      
    };

    if (withNames) {
      entity.levelName = buffer.readLengthPrefixedString();
      entity.pathName = buffer.readLengthPrefixedString();
      entity.children = [];
      const childCount = buffer.readInt();
      for (var i = 0; i < childCount; i++) {
        entity.children.push({
          levelName: buffer.readLengthPrefixedString(),
          pathName: buffer.readLengthPrefixedString()
        });
      }
    }

    // read properties
    while (this.readProperty(buffer, entity.properties)) {}

    const missing = length - buffer.bytesRead;
    if (missing > 0) {
      entity.missing = buffer.readHex(missing);
    } else if (missing < 0) {
      this.error("negative missing amount: " + missing);
    }
    // console.log(entity);

    return entity;
  }
  
  readEntities() {
    let entityCount = this.readInt();

    for (let i = 0; i < entityCount; i++) {
      let length = this.readInt();
      let currentObject = this.data.objects[i];
      
      readEntity(length, currentObject);
    }
  }
  
  readCollectedItems() {
    let collectedCount = this.readInt()

    for (let i = 0; i < collectedCount; i++) {
      let levelName = this.readPrefixedString()
      let pathName = this.readPrefixedString()
      
      this.data.collected.push({
        "levelName": levelName,
        "pathName": pathName
      })
    }
  }
}

module.exports = SavefileBuffer;
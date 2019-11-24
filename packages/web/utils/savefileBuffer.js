const Int64LE = require("int64-buffer").Int64LE;
const pako = require('pako');

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

  // https://stackoverflow.com/a/14601808
  decodeUTF16LE(binaryStr) {
    var cp = [];
    for (var i = 0; i < binaryStr.length; i += 2) {
      cp.push(binaryStr.charCodeAt(i) | (binaryStr.charCodeAt(i + 1) << 8));
    }

    return String.fromCharCode.apply(String, cp);
  }

  readUTF16String(length) {
    length = -2 * length;
    let str = this.buffer.toString('binary', this.bytesRead, this.bytesRead + length - 1);


    let data = this.decodeUTF16LE(str);
    this.bytesRead += length;

    return data;
  }

  readPrefixedString() {
    let length = this.readInt();
    let data;

    if (length < 0)
      data = this.readUTF16String(length);
    else
      data = this.readString(length);

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

  readChunkInfo() {
    return {
      compressedSize: this.readLong(),
      uncompressedSize: this.readLong()
    };
  }

  readChunk() {
    const header = this.readChunkInfo();
    if (header.compressedSize != 0x9E2A83C1) {
      throw new Error(`Unexpected header: ${header}`);
    }

    const summary = this.readChunkInfo();
    const subChunk = this.readChunkInfo();

    if (summary.uncompressedSize != subChunk.uncompressedSize) {
      throw new Error(`Summary uncompressed size doesn't match subchunk uncompressed size`);
    }

    const compressedData = this.buffer.slice(this.bytesRead, this.bytesRead + subChunk.compressedSize);
    this.bytesRead += subChunk.compressedSize;
    const uncompressedData = pako.inflate(compressedData);
    return uncompressedData;
  }
  
  readHeader() {
    this.data = {
      saveHeaderType: this.readInt(),
      saveVersion: this.readInt(),
      buildVersion: this.readInt(),
      mapName: this.readPrefixedString(),
      mapOptions: this.readPrefixedString(),
      sessionName: this.readPrefixedString(),
      playDurationSeconds: this.readInt(),
      saveDateTime: this.readLong(),
      sessionVisibility: this.readByte(),
      objects: [],
      collected: [],
    };
    if (this.data.saveVersion >= 21) {
      const chunks = [];
      while (this.bytesRead < this.buffer.length) {
        chunks.push(this.readChunk());
      }
      const uncompressedSize = chunks.reduce((total, chunk) => total + chunk.length, 0)
      this.buffer = new Buffer(uncompressedSize);
      let offset = 0;
      for (const chunk of chunks) {
        this.buffer.set(chunk, offset);
        offset += chunk.length;
      }
      this.bytesRead = 0;
      if (this.readInt() + 4 != uncompressedSize) {
        throw new Error(`Uncompressed size doesn't match`);
      }
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
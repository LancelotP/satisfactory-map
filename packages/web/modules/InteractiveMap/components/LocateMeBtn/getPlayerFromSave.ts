export type PlayerLocation = {
    id: number;
    x: number;
    y: number;
    z: number;
  };
  
  export function getPlayersFromSave(
    buff: string | ArrayBuffer
  ): Promise<PlayerLocation[]> {
    return new Promise((res, rej) => {
      const START_PLAYER_ID_BYTE_SHIFTING = 105;
      const START_LOCATION_BYTE_SHIFTING = 127;
      let charPlayerLocations: PlayerLocation[] = [];
  
      // @ts-ignore
      const view = new DataView(buff.slice(0, 100000));
      let hexString = "";
  
      for (let i = 0; i < view.byteLength; i += 4) {
        let hexStringValue = view.getUint32(i).toString(16);
        let padding = "00000000";
        hexString += (padding + hexStringValue)
          .slice(-padding.length)
          .toUpperCase();
      }
  
      let regex = /506C617965722F436861725F506C61796572/gi,
        match;
      while ((match = regex.exec(hexString))) {
        let charPlayerLocatorIndex = match.index / 2;
  
        if (charPlayerLocatorIndex === -1) rej("unable to find player location");
  
        const player: PlayerLocation = {
          id: Number(
            hex2ascii(
              view
                .getInt8(
                  charPlayerLocatorIndex + START_PLAYER_ID_BYTE_SHIFTING,
                  true
                )
                .toString(16)
            )
          ),
          x: view.getFloat32(
            charPlayerLocatorIndex + START_LOCATION_BYTE_SHIFTING,
            true
          ),
          y: view.getFloat32(
            charPlayerLocatorIndex + START_LOCATION_BYTE_SHIFTING + 4,
            true
          ),
          z: view.getFloat32(
            charPlayerLocatorIndex + START_LOCATION_BYTE_SHIFTING + 8,
            true
          )
        };
  
        charPlayerLocations.push(player);
      }
  
      res(charPlayerLocations);
    });
  }
  
  function hex2ascii(hexx: number) {
    var hex = hexx.toString();
    var str = "";
    for (var i = 0; i < hex.length && hex.substr(i, 2) !== "00"; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }
  
import {
  ResourceNodeType,
  SlugType,
  ResourceNodeQuality
} from "../__generated__";

export type MarkerSelection = {
  quality: { [k in ResourceNodeQuality]: boolean };
  nodes: { [k in ResourceNodeType]: boolean };
  slugs: { [k in SlugType]: boolean };
  pods: boolean;
};

enum SelectionMarkerValue {
  Q_IMPURE    = 1,
  Q_NORMAL    = 2,
  Q_PURE      = 4,
  Q_UNKNOWN   = 0,
  
  N_BAUXITE   = 8,
  N_CATERIUM  = 16,
  N_COAL      = 32,
  N_COPPER    = 64,
  N_GEYSER    = 128,
  N_IRON      = 256,
  N_LIMESTONE = 512,
  N_OIL       = 1024,
  N_QUARTZ    = 2048,
  N_SAM       = 4096,
  N_SULFUR    = 8192,
  N_UNKNOWN   = 16384,
  N_URANIUM   = 32768,
  
  S_GREEN     = 65536,
  S_YELLOW    = 131072,
  S_PURPLE    = 262144,

  PODS        = 524288
}


export function getDefaultMarkerSelection(hash: number) {
  let markers: MarkerSelection = {
    quality: {
      IMPURE: true,
      NORMAL: true,
      PURE: true,
      UNKNOWN: true
    },
    nodes: {
      BAUXITE: false,
      CATERIUM: false,
      COAL: false,
      COPPER: true,
      GEYSER: false,
      IRON: true,
      LIMESTONE: true,
      OIL: false,
      QUARTZ: false,
      SAM: false,
      SULFUR: false,
      UNKNOWN: false,
      URANIUM: false
    },
    slugs: {
      GREEN: false,
      YELLOW: false,
      PURPLE: false
    },
    pods: false
  };
  
  const binaryHash = "" + hash.toString(2);
  
  if (binaryHash !== "0") {
    markers["quality"]["IMPURE"] = false;
    markers["quality"]["NORMAL"] = false;
    markers["quality"]["PURE"] = false;
    markers["nodes"]["COPPER"] = false;
    markers["nodes"]["IRON"] = false;
    markers["nodes"]["LIMESTONE"] = false;
    
    let activeMarkers = [];
    
    for (let i = 0; i < binaryHash.length; i++) {
      if (binaryHash.charAt(i) === '1') {
        // @ts-ignore
        let enumIndex = SelectionMarkerValue[(Math.pow(2, binaryHash.length - 1 - i))]
        if (enumIndex !== undefined)
          activeMarkers.push(enumIndex);
      }
    }
    
    activeMarkers.forEach(m => {
      let [type, item] = m.split("_");
      
      switch (type) {
        case "Q":
          // @ts-ignore
          markers["quality"][item] = true;
        case "N":
          // @ts-ignore
          markers["nodes"][item] = true;
        case "S":
          // @ts-ignore
          markers["slugs"][item] = true;
        case "PODS":
          markers["pods"] = true;
      }
    })
  }

  return markers as MarkerSelection;
}

export function getMarkerSelectionHash(selection: MarkerSelection) {
  let filterHash = 0;
  
  Object.keys(selection).forEach(type => {
    switch (type) {
      case "quality":
      case "nodes":
      case "slugs":
        Object.keys(selection[type]).forEach(item => {
          const i = (type.charAt(0) + '_' + item).toUpperCase( );
          //@ts-ignore
          filterHash += selection[type][item] ? SelectionMarkerValue[i] : 0;
        });
      case "pods":
        filterHash += selection.pods ? SelectionMarkerValue["PODS"] : 0;
      default:
        filterHash += 0;
    }
  });
  
  return filterHash;
}
# script

Command-line scripts performing extraction/edition of data for the save files of Satisfactory

## Installation
1. Clone the repository [here](https://github.com/LancelotP/satisfactory-map)
2. Navigate to your terminal and change your directory to the `satisfactory-map/packages/script/`.
3. Run `yarn` to install node dependencies.
4. Run `yarn link` to creates a symbolic link between project directory and executable command.

## Overview
* [playerpos](#playerpos) - Retrieves or updates players locations for a save file of Satisfactory
	* [get](#get)
	* [set](#set)
* [extract](#extract) - Extracts differents objects into json files from a json-savefile of Satisfactory
* [gensave](#gensave) - Allows you to generate multiple save files by linking players to each targets

## playerpos

### get

You can retrieve players locations from the save file of Satisfactory with `get` command

```
Usage: get|g [options] <savefile>

Retrieves players locations from a save file of Satisfactory

Options:
  -i, --indexes <0,1,2,..>  specifies players indexes to retrieve
  -h, --help                output usage information
```
You can specify `-i` option for filtering players location :
```
$ playerpos get -i 0,1 mysave.sav
2 player locations have been found
[
  {
    "id": "1",
    "x": -41927.13671875,
    "y": 242589.21875,
    "z": -2100.65673828125
  },
  {
    "id": "0",
    "x": -47237.89453125,
    "y": 254333,
    "z": -2142.446044921875
  }
]
```

### set

You can update locations into the save file of Satisfactory with `set` command

```
Usage: set|s [options] <savefile>

Updates players locations into a save file of Satisfactory

Options:
  -o, --output <savefile>   specifies a different path to write save file
  -i, --indexes <0,1,2,..>  specifies players indexes to update
  --x <float>               specifies the new X axis value
  --y <float>               specifies the new Y axis value
  --z <float>               specifies the new Z axis value
  -h, --help                output usage information
```
You can specify `-i` option for filtering players location

```
$ playerpos set -i 0 mysave.sav --x=123 --y=456 --z=789
1 player locations have been changed
[
  {
    "x": 123,
    "y": 456,
    "z": 789
  }
]
```

You can specify each axis value with `--x`, `--y`, `--z` options (you must put a `=` when dealing with negative numbers, e.g `--x=-1.23`)

If you want to update only the height :
```
$ playerpos.js set mysave.sav --z=-5000
4 player locations have been changed
[
  {
    "z": 5000
  }
]
```

## extract

You can generate a `<json-savefile>` from a savefile of Satisfactory here: [satisfactory-save-format](https://github.com/bitowl/satisfactory-save-format)

```
Usage: extract [options] <json-savefile>

Extracts differents objects into json files from a <json-savefile> of Satisfactory

Options:
  -v, --version          output the version number
  -o, --output <folder>  specifies a folder to write extracted json files (default: "./data/extracts")
  -p, --pretty           specifies x offset
  -h, --help             output usage information
```

```
$ extract mysave.json --pretty
```

TODO extract.config.json

## gensave

Useful tool if you need to check for specific items in game. Generate save files then load, check, repeat

Note : make sure to check `data/extracts/RESOURCE_NODE.json` to understand the `<targets>` file structure. 

See [extract](extract) to generate a `<targets>` file

```
Usage: gensave [options] <savefile> <targets>

Allows you to generate multiple save files by linking players to each target locations from a <targets> file and a <savefile> of Satisfactory

Options:
  -v, --version             output the version number
  -o, --output <folder>     specifies a folder to write save files (default: "./data/gensaves")
  -i, --indexes <0,1,2,..>  specifies players indexes to update
  --x <float>               specifies x offset
  --y <float>               specifies y offset
  --z <float>               specifies z offset
  -h, --help                output usage information
```

You can specify `-i` option for filtering players location

```
$ gensave -i 0 mysave.sav data/extracts/RESOURCE_NODE.json
```

You can specify each offset axis value with `--x`, `--y`, `--z` options (you must put a `=` when dealing with negative numbers, e.g `--x=-1.23`)

If you want to offset only the height of each target locations :
```
$ gensave mysave.sav data/extracts/RESOURCE_NODE.json --z=500
```
# script

Command-line scripts performing extraction/edition of data for the save files of Satisfactory

## Installation
1. Clone the repository [here](https://github.com/LancelotP/satisfactory-map)
2. Navigate to your terminal and change your directory to the `satisfactory-map/packages/script/`.
3. Run `yarn` to install node dependencies.
4. Run `yarn link` to creates a symbolic link between project directory and executable command.

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
Usage: set|s [options] <savefile> <axes...>

Updates players locations into a save file of Satisfactory

Options:
  -i, --indexes <0,1,2,..>  specifies players indexes to update
  -x, --x                   specifies whether the X axis is filled
  -y, --y                   specifies whether the Y axis is filled
  -z, --z                   specifies whether the Z axis is filled
  -h, --help                output usage information
```
You can specify `-i` option for filtering players location

```
$ playerpos set -i 0 mysave.sav 123 456 789
1 player locations have been changed
[
  {
    "x": 123,
    "y": 456,
    "z": 789
  }
]
```

You can specify up to 3 `<axes...>` and map them with `-x`, `-y`, `-z` options, order matters (default mapping is eq. to ```-xyz```)

If you want to update only the height :
```
$ playerpos.js set -z mysave.sav 5000
4 player locations have been changed
[
  {
    "z": 5000
  }
]
```
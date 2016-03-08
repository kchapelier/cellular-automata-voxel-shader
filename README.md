# cellular-automata-voxel-shader

Generate a voxel shader (for MagicaVoxel) from a custom CA rule.

This is a work in progress.

## Installing and testing

With [npm](http://npmjs.org) do:

```
npm install cellular-automata-voxel-shader -g
```

## Usage

```bash
cavoxelshader rule outOfBoundValue
```

Return the code of the shader to stdout.

```bash
cavoxelshader info [filename]
```

Extracts the details of a given generated file (rule, outOfBoundValue and version) to stdout.

When used without filename, will list all the files of the current directory with their details to stdout.

## Examples

```bash
cavoxelshader "E 4..6 / 6 von-neumann" 0 > erode.txt
```

Here "E 4..6 / 6 von-neumann" is the rule and 0 is the out-of-bound value.

## General usage

In your console / terminal, go into the shader folder of your MagicaVoxel install and execute **cavoxelshader "E 4..6 / 6 von-neumann" 0 > erode.txt**. This will create a file called erode.txt containing the voxel shader.

Then in MagicaVoxel, load a model (for example monu1 or monu9) and execute **xs erode** in its console to execute it once. You can also execute **xs 5 erode**, to execute it 5 times, etc.

## Rule ?

The rule describes the formula applied on each cells to update its state.

It is recommended to use the custom "Extended" rule format. The command accepts many other rule formats (Life S/B, Generations S/B/C, Vote for Life, Cyclic R/T/C/N, LUKY and NLUKY) but they were originally designed for 2D, most of them allowing only values up to 9.

The format of a valid Extended rule is as follow :

**E survivalValues / birthValues neighbourhoodType neighbourhoodRange**

The **survivalValues** defines the counts of alive neighbours necessary for a cell to survive (stay at its current alive state).<br />
The **birthValues** defines the counts of alive neighbours necessary for a cell to be born (change state from dead to alive).
They are both list of numbers separated by commas (thus allowing number > 9). They can also contains ranges expressed with two dots, also very useful in 3D CA.

For example E 8,10..26 / 8..26 means :

* a cell must survive if it has a number of alive neighbours equals to 8 or somewhere between 10 and 26
* a cell must be born if it has a number of alive neighbours somewhere between 8 and 26.

The most common **neighbourhoodType**s are moore (the default) and von-neumann.<br />
The **neighbourhoodRange** defines the distance that the neighbourhood covers, its radius. Its default value is 1.

A moore neighbourhood (of range 1) basically includes all the cells with a least one corner touching the current cell. In 3D, this gives 26 neighbours for a given cell. A von-neumann neighbourhood (of range 1) includes only the cells directly adjacent to the current cells. In 3D, this gives 6 neighbours for a given cell.

The Wikipedia pages for those neighbourhood include more correct definitions and examples of how the von-neumann neighbourdhood expands with a range > 1. https://en.wikipedia.org/wiki/Moore_neighborhood  https://en.wikipedia.org/wiki/Von_Neumann_neighborhood

The Extended rule format also allows more unconventional neighbourhood types : corner (basically the 8 corners of the moore neighbourhood), edge (the edges of the moore neighbourhood), face (the faces of the moore neighbourdhood) and axis (all the cells directly aligned with one of the current cell's faces).

## Out-of-bound value ?

The **out-of-bound value** basically dictates how the cellular automata must deal with cells which are outside of the volume. Its possible values are 0 (out-of-bound values are always considered dead), 1 (out-of-bound values are always considered alive, useful to create CA expanding from the sides to the center), wrap (the cellular automata behave as if the volume was infinitely repeated in space, i.e. in a 64x64x64 volume the cell [43, 50, 64] would be wrapped to [43, 50, 0]) and clamp (the cellular automata get the nearest cell in the volume, i.e. in a 64x64x64 volume the cell [43, 50, 64] would be mapped to [43, 50, 63]).

## Changelog

### 0.3.0 (2016-03-08) :

* Implement the CLI info command.

### 0.2.2 (2016-03-03) :

* Smarter code generation.

### 0.2.0 (2016-03-02) :

* Add doc.
* Add support for "clamp" out-of-bound value.

### 0.1.0 (2016-02-07) :

* First implementation.

## License

MIT

# cellular-automata-voxel-shader

Generate a voxel shader (for MagicaVoxel) from a custom CA rule.

This is a work in progress.

## Installing and testing

With [npm](http://npmjs.org) do:

```
npm install cellular-automata-voxel-shader
```

## Usage

```bash
cavoxelshader rule outOfBoundValue
```

Return the code of the shader to stdout.

## Examples

```bash
cavoxelshader "E 1..6 / 5,6 von-neumann" 0 > shaderfile.txt
```

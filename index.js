"use strict";

const parser = require('cellular-automata-rule-parser');
const moore = require('moore');
const vonNeumann = require('von-neumann');
const unconventionalNeighbours = require('unconventional-neighbours');
const generateGlsl = require('./lib/cellular-automata-voxel-shader-glsl');

const neighbourhoodFunctions = {
  moore: moore,
  'von-neumann': vonNeumann,
  axis: unconventionalNeighbours.axis,
  corner: unconventionalNeighbours.corner,
  edge: unconventionalNeighbours.edge,
  face: unconventionalNeighbours.face
};

/**
 * Sort the neighbourhood from left to right, top to bottom, ...
 * @param {Array} a First neighbour
 * @param {Array} b Second neighbour
 * @returns {number}
 */
function neighbourhoodSorter (a, b) {
  a = a.join(',');
  b = b.join(',');
  return a > b ? 1 : a < b ? -1 : 0;
}

function getNeighbourhood (neighbourhoodType, neighbourhoodRange) {
  neighbourhoodType = !!neighbourhoodFunctions[neighbourhoodType] ? neighbourhoodType : 'moore';
  neighbourhoodRange = neighbourhoodRange || 1;

  const neighbourhood = neighbourhoodFunctions[neighbourhoodType](neighbourhoodRange, 3);
  neighbourhood.sort(neighbourhoodSorter);

  return neighbourhood;
}

module.exports = function generate (ruleString, outOfBoundValue) {
  const rule = parser(ruleString);

  if (!rule) {
    throw Error('Invalid ruleString : "' + ruleString + '"');
  }

  const neighbourhood = getNeighbourhood(rule.neighbourhoodType, rule.neighbourhoodRange);

  return generateGlsl(rule, neighbourhood, outOfBoundValue);
};
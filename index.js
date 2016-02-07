"use strict";

var parser = require('cellular-automata-rule-parser'),
    moore = require('moore'),
    vonNeumann = require('von-neumann'),
    unconventionalNeighbours = require('unconventional-neighbours'),
    generateGlsl = require('./lib/cellular-automata-voxel-shader-glsl');

var neighbourhoodFunctions = {
    'moore': moore,
    'von-neumann': vonNeumann,
    'axis': unconventionalNeighbours.axis,
    'corner': unconventionalNeighbours.corner,
    'edge': unconventionalNeighbours.edge,
    'face': unconventionalNeighbours.face
};

/**
 * Sort the neighbourhood from left to right, top to bottom, ...
 * @param {Array} a First neighbour
 * @param {Array} b Second neighbour
 * @returns {number}
 */
var neighbourhoodSorter = function neighbourhoodSorter (a, b) {
    a = a.join(',');
    b = b.join(',');
    return a > b ? 1 : a < b ? -1 : 0;
};

var getNeighbourhood = function getNeighbourhood (neighbourhoodType, neighbourhoodRange) {
    neighbourhoodType = !!neighbourhoodFunctions[neighbourhoodType] ? neighbourhoodType : 'moore';
    neighbourhoodRange = neighbourhoodRange || 1;

    var neighbourhood = neighbourhoodFunctions[neighbourhoodType](neighbourhoodRange, 3);
    neighbourhood.sort(neighbourhoodSorter);

    return neighbourhood;
};

var generate = function generate (ruleString, outOfBoundValue) {
    var rule = parser(ruleString),
        neighbourhood;

    if (!rule) {
        throw Error('Invalid ruleString : "' + ruleString + '"');
    }

    neighbourhood = getNeighbourhood(rule.neighbourhoodType, rule.neighbourhoodRange);

    return generateGlsl(rule, neighbourhood, outOfBoundValue);
};

module.exports = generate;

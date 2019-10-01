function createLib (execlib) {
  'use strict';
  return execlib.loadDependencies('client', ['allex:httpresponsefile:lib', 'allex:httpresponsefiledatamixin:lib'], require('./creator').bind(null, execlib));
}

module.exports = createLib;

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var bluebird = require("bluebird");;
var es6p = require('es6-promise').Promise;
var RSVP = require('rsvp');

suite
.add('Callback', function() {
  function make(cb) {
    cb(true);
  };

  make(function(result) {
    return true;
  });
})
.add('Native', function() {
  function make() {
    return new Promise(function(resolve, reject) {
      resolve(true);
    });
  };

  make().then(function(result) {
    return true;
  });
})
.add('Bluebird', function() {
  function make() {
    return new bluebird(function(resolve, reject) {
      resolve(true);
    });
  };

  make().then(function(result) {
    return true;
  });
})
.add('es6-promise', function() {
  function make() {
    return new es6p(function(resolve, reject) {
      resolve(true);
    });
  };

  make().then(function(result) {
    return true;
  });
})
.add('RSVP', function() {
  function make() {
    return new RSVP.Promise(function(resolve, reject) {
      resolve(true);
    });
  };

  make().then(function(result) {
    return true;
  });
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });

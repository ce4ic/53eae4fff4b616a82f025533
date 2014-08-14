var fs = require('fs');
var path = require('path');
var ape = require('ape-algorithm');
describe('Speed test', function () {
  var tests = [];
  fs.readdirSync(path.join(__dirname, 'spd')).forEach(function(fn) {
    if (!/\.json$/.test(fn)) return;
    tests.push(require(path.join(__dirname, 'spd', fn)));
  });
  tests.forEach(function(json) {
    var col2row;
    var col2row2;
    describe('Scale at: ' + json.length + ' x ' + json[0].data.length, function () {
      it('col2row', function () {
        col2row = ape.rowcol.col2row(json);
      });
      it('col2row2', function () {
        col2row2 = ape.rowcol.col2row2(json);
      });
      it('col2row should equal to col2row2', function () {
        col2row2.should.eql(col2row2);
      });  
    });
    
  });  
});

describe('Complexity test', function () {
  var tests = [];
  fs.readdirSync(path.join(__dirname, 'linear')).forEach(function(fn) {
    if (!/\.json$/.test(fn)) return;
    tests.push(require(path.join(__dirname, 'linear', fn)));
  });
  tests.forEach(function(json) {
    var scale = json.length + json[0].data.length;
    var toEval = JSON.stringify(json[0][0]);
    var linear;
    var col2row2;
    var col2row;
    describe('Scale at: ' + json.length + ' x ' + json[0].data.length, function () {
      it('linear', function () {
        var linear = new Date();
        for(var i=0; i<scale; ++i) {
          eval(toEval);
        }
        linear = new Date() - linear;
      });
      it('col2row2', function () {
        var col2row2 = new Date();
        ape.rowcol.col2row2(json);
        col2row2 = new Date() - col2row2;
      });
      it('col2row', function() {
        var col2row = new Date();
        ape.rowcol.col2row(json);
        col2row = new Date() - col2row;
      });  
    });
  });
});


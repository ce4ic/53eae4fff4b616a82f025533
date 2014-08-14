var fs = require('fs');
var path = require('path');
var async = require('async');
var argv = require('yargs').argv;
var n = argv.n || 10;
var o = argv.o && path.resolve(argv.o) || path.resolve(path.join(__dirname, '../test'));
var r = argv.r || 200;
var c = argv.c || 50;

var p = argv.p === undefined ? '' : argv.p;

var q = [];
for(var i=0; i<n; ++i) {
  q.push((function(fileIndex) {
    return function(done) {
      var json = [];
      for(var i=0; i<c; ++i) {
        var col = {
          field: 'field_' + i,
          data: []
        };
        for(var j=0; j<r; ++j) {
          col.data.push('field_' + i + '_' + j + '_' + Math.floor(Math.random() * 10000));
        }
        json.push(col);
      }
      fs.writeFile(path.join(o, (p ? p + '_' : '') + fileIndex + '.cols.json'), JSON.stringify(json), done);
    };
  })(i));
}

async.parallel(q, function(err) {
  if (err) throw err;
  console.log('Gen %d json files, %d rows and %d cols each.', n, r, c);
});

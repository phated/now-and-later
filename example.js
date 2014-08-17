'use strict';

var nowAndLater = require('./');

function fn1(done){
  console.log('fn1 called');
  done(null, 1);
}

function fn2(done){
  console.log('fn2 called');
  setTimeout(function(){
    console.log('fn2 timeout');
    done(null, 2);
  }, 500);
}

function fn3(done){
  done(new Error('fn3 threw'));
}

function before(fn, key){
  console.log('before', key);
}

function after(fn, key){
  console.log('after', key);
}

function error(fn, key){
  console.log('error', key);
}

var parallel = nowAndLater.parallel({
  fn1: fn1,
  fn2: fn2
}, {
  before: before,
  after: after,
  error: error
});

nowAndLater.series([parallel, fn1, fn2, fn3], {
  before: before,
  after: after,
  error: error
})(console.log);

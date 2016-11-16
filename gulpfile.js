var gulp = require('gulp'),
LiveServer = require('gulp-live-server');

gulp.task('serve', function(){
  var server = new LiveServer('server/main.js');
  server.start()
});

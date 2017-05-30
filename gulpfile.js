const { spawn } = require('child_process');
const gulp = require('gulp');

gulp.task('close-success', cb => {
  const child = spawn('pwd');

  child.on('close', () => {
    cb();
  });
});

gulp.task('resolve', () => new Promise((resolve) => {
  resolve();
}));

gulp.task('promise-resolve', () => Promise.resolve());

gulp.task('success', ['close-success', 'resolve', 'promise-resolve']);

gulp.task('close-error', cb => {
  const child = spawn('ls', ['foo']);

  child.on('close', code => {
    if (code !== 0) {
      cb(code);
    }
  });
});

gulp.task('error', cb => {
  const child = spawn('foo');

  child.on('error', err => {
    cb(err);
  });
});

gulp.task('stderr', cb => {
  const child = spawn('ls', ['foo']);

  child.stderr.on('data', data => {
    cb(data);
  });
});

gulp.task('reject', () => new Promise((resolve, reject) => {
  reject('reject');
}));

gulp.task('promise-reject', () => Promise.reject('promise-reject'));

gulp.task('fail', ['close-error', 'error', 'stderr', 'reject', 'promise-reject']);

gulp.task('default', ['success', 'fail']);


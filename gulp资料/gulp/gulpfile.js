//插件引用
var gulp = require('gulp'),//基础库
    runSequence = require('run-sequence'),
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检查
    uglify = require('gulp-uglify'),//js压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    rename = require('gulp-rename'),//重命名
    clean = require('gulp-clean'),//清空文件夹
    cache = require('gulp-cache'),//图片缓存，只有图片替换了才压缩
    csso = require('gulp-csso'),//css 合并
    notify = require('gulp-notify'),//更改提醒
    revCollector = require('gulp-rev-collector'),//自动添加版本号
    replace = require('gulp-replace');//替换

var gulp_src = './gulp_module/';
var st = require(gulp_src+'gulp_st');
var gulp_scss = require(gulp_src+'gulp_scss');
var gulp_sprite = require(gulp_src+'gulp_sprite');

//机构css
gulp.task('site', function() {
  return gulp_scss('site','index');
});

//平台css
gulp.task('platform', function() {
  return gulp_scss('platform','main');
});
//wo css
gulp.task('skinSass', function() {
    return gulp_scss('wo.blue.skin','skin_blue');
});
//添加版本号
gulp.task('rev', function () {
  return gulp.src(['rev/*.json','www/app/templates_origin_v2/style/index.css','www/app/templates_origin_v2/style/skin_blue.css'])
    .pipe(revCollector())
    .pipe(gulp.dest(st.dist.dir.css))
    .pipe(notify({ message: 'rev task complete' }));
});

//压缩图片
gulp.task('images', function() {
    return gulp.src(st.file.img)
    .pipe(cache(imagemin({
        optimizationLevel: 3, progressive: true, interlaced: true
    })))//cache 只压缩修改的图片
    .pipe(gulp.dest(st.dist.dir.img))
    //.pipe(notify({ message: 'Images task complete' }))
});

//雪碧图
gulp.task('sprite', function () {
    gulp_sprite('sicon','sprite');
});
// 生成会员等级雪碧图
gulp.task('lvsprite', function () {
    // 生成会员等级雪碧图
    gulp_sprite('lv-icon','lv');
});
// 生成sliderbar
gulp.task('lmsprite', function () {
    // 生成会员等级雪碧图
    gulp_sprite('lmicon','left.menu');
});

//js合并
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(livereload());
});
//开发构建
gulp.task('dev', function (done) {
  runSequence(
    ['sprite'],
    ['lvsprite'],
    ['site'],
    ['rev'],
  done);
});
//小沃开发构建
gulp.task('wo', function (done) {
    runSequence(
        ['skinSass'],
        ['rev'],
        done);
});
//清空
gulp.task('clean', function() {
    return gulp.src(['www/www/assets_v2/css/sitecss/', 'dist/assets/js', 'dist/assets/img'], {read: false})
    .pipe(clean());
});
//预设任务
gulp.task('default', ['clean'], function() {
    gulp.start('site');
});
//监听
gulp.task('watch', function() {
//监听css
  gulp.watch('www/www/dist/style/site/*.scss', ['site']);
  gulp.watch('www/www/dist/style/platform/*.scss', ['platform']);
//监听js
  //gulp.watch('src/scripts/**/*.js', ['scripts']);
//监听images
  gulp.watch('src/images/**/*', ['images']);

});
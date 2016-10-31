var gulp = require('gulp'),
    concat = require('gulp-concat'),//合并文件
    sass = require('gulp-sass'),//sass的编译
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),//更改提醒
    livereload = require('gulp-livereload'),//自动刷新页面
    st = require('./gulp_st'),
    rev = require('gulp-rev');//自动添加版本号

function gulp_scss(sourceName,destName) {
    gulp.src(st.file.css + sourceName+'.scss')
        .pipe(concat(destName+'.css'))
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer({
            browsers:st.autoprefixerBrowsers,
            cascade: true,//是否美化属性值
        }))
        .pipe(gulp.dest(st.file.css))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(minifycss({compatibility: 'ie8'}))
        //.pipe(gulp.dest(st.file.css))
        .pipe(rev())
        .pipe(rev.manifest({
            path: sourceName+'.json',
            merge:true
        }))
        .pipe(gulp.dest(st.dist.rev))
        .pipe(notify({ message: 'Site Styles task complete' }))
        .pipe(livereload());
}
module.exports = gulp_scss;
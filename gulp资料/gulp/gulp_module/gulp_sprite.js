var gulp = require('gulp'),
    spritesmith = require('gulp.spritesmith'),//合并雪碧图
    buffer = require('vinyl-buffer'),//缓冲
    imagemin = require('gulp-imagemin'),//图片压缩
    merge = require('merge-stream'),//合并流
    notify = require('gulp-notify'),//更改提醒
    st = require('./gulp_st'),
    rev = require('gulp-rev');//自动添加版本号

function gulp_sprite(fileName,spriteName) {
    // 生成雪碧图
    var spriteData = gulp.src(st.file.icon+fileName+'/*.png').pipe(spritesmith({
        imgName: '../img/'+spriteName+'.icon.png',
        cssName: 'mix.'+spriteName+'.icon.scss',
        padding:5,
        cssOpts: {
            cssSelector: function (sprite) {
                return o.spritePrefix + sprite.name; // 自定义className前缀
            }
        },
        cssFormat: 'scss'
    }));
    // 生成图并压缩
    var imgStream = spriteData.img
        .pipe(buffer()) // 生成图前先压缩
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest(st.dist.dir.img))
        .pipe(rev.manifest({
            path: spriteName+'.json',
            merge: true
        }))
        .pipe(notify({ message: spriteName+' finished' }))
        .pipe(gulp.dest(st.dist.rev));

    // 生成sass
    var cssStream = spriteData.css
        .pipe(gulp.dest(st.file.mix));

    return merge(imgStream, cssStream);
}

module.exports = gulp_sprite;
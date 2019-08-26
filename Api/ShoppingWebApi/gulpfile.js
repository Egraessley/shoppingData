var gulp = require('gulp');
var run = require('gulp-run-command').default;
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./tsconfig.json");
var del = require('del');
var runSequence = require('run-sequence');
var gls = require('gulp-live-server');

gulp.task("typescript", function()
{
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./dist"));
});
gulp.task("clean", function()
{
    return del("./dist",{force:true});
});
gulp.task('move-email-themes', function(){
    return gulp.src('./src/core/utils/email/views/**/*')
        .pipe(gulp.dest('./dist/core/utils/email/views'))
});
gulp.task('move-pdf-themes', function(){
    return gulp.src('./src/core/utils/pdf/views/**/*')
        .pipe(gulp.dest('./dist/core/utils/pdf/views'))
});
gulp.task("start", run("node dist/startApi"));
gulp.task("compileDoc", run("apidoc -i ./src -o ./doc"));
gulp.task("default", function(callback)
{
    runSequence('clean','typescript', 'move-email-themes', 'move-pdf-themes', callback);
});
gulp.task("build-prod", function(callback){
    runSequence('clean','typescript','move-email-themes','move-pdf-themes',callback);
});
gulp.task('watch',['default'], function(){

    var server = gls.new('dist/startApi.js');
    server.start();
    gulp.watch('src/core/**/*.ts', function(file){
        console.log('Watch!');
        runSequence('default', function () {
            server.stop().then(function () {
                server.start();
            })
        });
    });
    gulp.watch('src/core/**/*.pug', function(file){
        console.log('Watch!');
        runSequence('default', function () {
            server.stop().then(function () {
                server.start();
            })
        });
    });
    gulp.watch('src/core/**/*.hbs', function(file){
        console.log('Watch!');
        runSequence('default', function () {
            server.stop().then(function () {
                server.start();
            })
        });
    });


});

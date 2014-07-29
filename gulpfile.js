// Include gulp
var gulp = require('gulp'),

// Include Our Plugins
    // jshint      = require('gulp-jshint'),
    scss        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    prefix      = require('gulp-autoprefixer'),
    plumber     = require('gulp-plumber'),
    wait        = require('gulp-wait'),
    notify      = require('gulp-notify'),
    browserSync = require('browser-sync')

;


/*
     Javascript settings - Edit this section
     ========================================================================== */
/**
 * Specify which js files you want to include
 */
var jsFileList = [
    // './bower_components/foundation/js/foundation/foundation.js',
    // './bower_components/foundation/js/foundation/foundation.equalizer.js',
    // './bower_components/foundation/js/foundation/foundation.interchange.js',
    // './bower_components/foundation/js/foundation/foundation.magellan.js',
    // './bower_components/foundation/js/foundation/foundation.reveal.js',
    // './bower_components/foundation/js/foundation/foundation.tab.js',
    // './bower_components/q/q.js',
    // './bower_components/velocity/jquery.velocity.js',
    // './bower_components/velocity/velocity.ui.js',
    // './bower_components/Shifter/jquery.fs.shifter.js',
    // './bower_components/Wallpaper/jquery.fs.wallpaper.js',
    // './bower_components/slidr/slidr.js',
    './wp-content/themes/wildhorn/assets/js/jquery/jquery.isotope.min.js',
    // './bower_components/vault/dist/vault.js',
    // './bower_components/isotope-packery/packery-mode.pkgd.js',
    // './wp-content/themes/wildhorn/assets/js/codrops-morphing-button-fixed.js',
    './wp-content/themes/wildhorn/assets/js/video.js',
    './wp-content/themes/wildhorn/assets/js/big-video.js',
    './wp-content/themes/wildhorn/assets/js/jquery/jquery.hammer.min.js',
    './wp-content/themes/wildhorn/assets/js/jquery/jquery.migrate.js',
    './wp-content/themes/wildhorn/assets/js/underscore.min.js',
    './wp-content/themes/wildhorn/assets/js/eventemitter.min.js',
    './wp-content/themes/wildhorn/assets/js/scripts.js',
    // './wp-content/themes/wildhorn/assets/js/classie.js',
    // './wp-content/themes/wildhorn/assets/js/borderMenu.js',
    './bower_components/bowser/bowser.js',
    './bower_components/fancyselect/fancySelect.js',
    // './bower_components/velocity/jquery.velocity.js',
    // './bower_components/velocity/velocity.ui.js',
    './bower_components/gridforms/gridforms/gridforms.js',
    './wp-content/themes/wildhorn/assets/js/app.js',
    // './wp-content/themes/wildhorn/assets/js/init-foundation.js',
    // './wp-content/themes/wildhorn/assets/js/z-scripts.js'
];

/**
 * Specify your output directory
 */
var jsDistDir = './wp-content/themes/wildhorn/assets/js/min/';
var pluginJsDistDir = './wp-content/plugins/TheorySlider/js/min/';
var pluginSassDistDir = './wp-content/plugins/TheorySlider/css/';

/**
 * Specify the name of your compiled JS file
 * which will be placed in the directory you define above
 */
var jsFile = 'app.min.js';


/*
     Gulp tasks
     ========================================================================== */

// Lint Task
gulp.task('lint', function() {
    return gulp.src(jsFileList)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('build-scss', function() {
  sass_stream = scss({ includePaths: ['./bower_components/'] })
  gulp.src('./wp-content/themes/wildhorn/assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass_stream)
    .pipe(gulp.dest('./wp-content/themes/wildhorn/assets/css'))
    .pipe(browserSync.reload({stream:true}))
});

// Compile Our Sass and watch
gulp.task('sass', function() {
    sass_stream = scss({ includePaths: ['./bower_components/'] })
    gulp.src('./wp-content/themes/wildhorn/assets/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass_stream)
    .pipe(prefix("last 3 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('./wp-content/themes/wildhorn/assets/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify("sass built meow"))
    // .pipe(connect.reload());
});

// Compile Our Plugin Sass and watch
gulp.task('plugin-sass', function() {
    sass_plugin_stream = scss({ includePaths: ['./bower_components/'] })
    gulp.src('./wp-content/plugins/TheorySlider/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass_plugin_stream)
    .pipe(prefix( "last 1 version", "> 1%", "ie 8", "ie 7" ))
    .pipe(gulp.dest( pluginSassDistDir ))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify("plugin sass built meow"))
    // .pipe(connect.reload());
});

gulp.task('reload-php', function(){
    gulp.src(['./wp-content/themes/wildhorn/assets/**/*.php'])
    .pipe(plumber())
    .pipe(browserSync.reload({stream:true}));
});

// Concatenate & Minify JS
gulp.task('build-scripts', function() {
    return gulp.src(jsFileList)
        .pipe( plumber() )
        .pipe( concat( 'app.js' ) )
        .pipe( gulp.dest( jsDistDir ) )
        .pipe( rename( jsFile ) )
        .pipe(
            uglify({
                mangle: true, // mangle: Turn on or off mangling
                beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
                compress: true,
                // report: 'gzip', // report: Show file size report
                // outSourceMap    : jsDistDir + jsFile + '.map',
                // sourceMappingURL: jsFile + '.map',
                // sourceMapRoot: '../../'
            })
        )
        .pipe( gulp.dest( jsDistDir ))
        .pipe(wait(300))
        .pipe( browserSync.reload( { stream:true } ) )
        .pipe(notify("scriptz built meow"))
        // .pipe(connect.reload());
});


gulp.task('build-header-scripts', function() {
    var vendorJs = [
        // './bower_components/foundation/js/vendor/fastclick.js',
        // './bower_components/foundation/js/vendor/modernizr.js',
        // './bower_components/pace/pace.js',
        './wp-content/themes/wildhorn/assets/js/classie.js',
        './wp-content/themes/wildhorn/assets/js/borderMenu.js',
        './bower_components/modernizr/modernizr.js',
    ];
    return gulp.src(vendorJs)
        .pipe(plumber())
        .pipe(concat('app.header.js'))
        .pipe(gulp.dest(jsDistDir))
        .pipe(rename('app.header.min.js'))
        .pipe(
            uglify({
                mangle: true, // mangle: Turn on or off mangling
                beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
                compress: true,
                // report: 'gzip', // report: Show file size report
                // outSourceMap    : jsDistDir + jsFile + '.map',
                // sourceMappingURL: jsFile + '.map',
                // sourceMapRoot: '../../'
            })
        )
        .pipe(gulp.dest( jsDistDir ))
        .pipe(wait(300))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify("header scripts built"))
});


gulp.task('build-plugin-scripts', function() {
    var pluginJs = [
        // './bower_components/foundation/js/vendor/fastclick.js',
        // './bower_components/hammerjs/hammer.min.js',
        './wp-content/plugins/TheorySlider/js/classie.js',
        './wp-content/plugins/TheorySlider/js/main.js',
        // './wp-content/plugins/TheorySlider/js/borderMenu.js',
        // './wp-content/plugins/TheorySlider/js/jquery-easing-1.3.js'
    ];
    return gulp.src( pluginJs )
        .pipe( plumber() )
        .pipe( concat( 'theory.slider.js' ))
        .pipe( gulp.dest( pluginJsDistDir ))
        .pipe( rename( 'theory.slider.min.js' ))
        .pipe(
            uglify({
                mangle: true, // mangle: Turn on or off mangling
                beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
                compress: true,
                // report: 'gzip', // report: Show file size report
                // outSourceMap    : jsDistDir + jsFile + '.map',
                // sourceMappingURL: jsFile + '.map',
                // sourceMapRoot: '../../'
            })
        )
        .pipe(gulp.dest( pluginJsDistDir ))
        .pipe(wait(300))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify("plugin scriptz built"))
});

gulp.task('browserSync', function() {
    browserSync.init( null, {
        proxy: "bluedolphin.dev"
    });
});

gulp.task('dev', ['sass', 'plugin-sass', 'build-header-scripts', 'build-plugin-scripts', 'build-scripts', 'browserSync'], function () {
    gulp.watch("./wp-content/themes/wildhorn/assets/sass/**/*.scss", ['sass']);
    gulp.watch("./wp-content/themes/wildhorn/assets/js/**/*.js", ['build-scripts']);
    gulp.watch("./wp-content/plugins/TheorySlider/js/**/*.js", ['build-plugin-scripts']);
    gulp.watch("./wp-content/plugins/TheorySlider/sass/**/*.scss", ['plugin-sass']);
    gulp.watch("./wp-content/themes/wildhorn/assets/**/*.php", ['reload-php']);
});


'use strict';

const gulp = require('gulp');
var gutil = require("gulp-util");

let build = require('@microsoft/gulp-core-build');
let typescript = require('@microsoft/gulp-core-build-typescript').typescript;
let sass = require('@microsoft/gulp-core-build-sass').default;
var webpack = require('webpack');

// Builds the files using Microsoft gulp core build modules
let buildTask = build.task('build', build.parallel(typescript, sass));

// Custom task to bundle the files using webpack.
let bundleTask = build.subTask('bundlefiles', function (gulp, buildOptions, done) {

    // Bundle using webpack
    webpack({
        entry: "./lib/extensions/tenantGlobalNavBar/TenantGlobalNavBarApplicationCustomizer.js",
        output: {
            filename: "./dist/TopNavigation.js",
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
            })
        ]
    }, function (err, stats) {
        if (err) throw new gutil.PluginError("bundlefiles", err);
        gutil.log("bundlefiles", stats.toString({
            colors: true
        }));
        done();
    })
})


let bld = build.task('bundle', build.serial(buildTask, bundleTask));

build.initialize(gulp);



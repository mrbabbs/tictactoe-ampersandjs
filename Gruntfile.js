'use strict';

module.exports = function(grunt) {

    // Config.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            specs: {
                src: ['test/specs/**/spec.*.js'],
                dest: 'test/specs.js',
                options: {
                    browserifyOptions: {
                        debug: true,
                        paths: ["./node_modules", "./client"],
                    }
                }
            }
        },

        jasmine: {
            tests: {
                src: [],
                options: {
                    outfile: "test/_SpecRunner.html",
                    //keepRunner: true,
                    specs: "test/specs.js"
                }
            }
        }
    });

    // Load packages.
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask("test", ["browserify:specs", "jasmine"]);
}
'use strict';

module.exports = function (grunt) {

    /** load grunt tasks */
    require('load-grunt-tasks')(grunt);

    /** configure grunt */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['results'],
        env: {
            xunit: {
                XUNIT_FILE: "results/xunit-" + grunt.option("build-number") + ".xml"
            },
            xunite2e: {
                XUNIT_FILE: "results/xunit-e2e-" + grunt.option("build-number") + ".xml"
            }
        },
        mkdir: {
            results: {
                options: {
                    create: ['results']
                }
            }
        },
        instrument: {
            files: [
                './server.js',
                './config.js',
                './index.js',
                './routes/**/*.js',
                './lib/**/*.js'
            ],
            options: {
                lazy: true,
                basePath: 'results/coverage/instrument/'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: ["spec"],
                    require: 'coverage/blanket'
                },
                src: ['test/*.js']
            },
            teste2e: {
                options: {
                    reporter: ['spec'],
                    require: 'coverage/blanket'
                },
                src: ['node_modules/test-server-harness/bin/harness-mocha.js']
            },
            xunit: {
                options: {
                    reporter: "xunit-file"
                },
                src: ['test/*.js']
            },
            xunite2e: {
                options: {
                    reporter: "xunit-file"
                },
                src: ['node_modules/test-server-harness/bin/harness-mocha.js']
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: "results/coverage-" + grunt.option("build-number") + ".html"
                },
                src: ['test/*.js']
            },
            cobertura: {
                options: {
                    reporter: 'mocha-cobertura-reporter',
                    quiet: true,
                    captureFile: "results/coverage-" + grunt.option("build-number") + ".xml"
                },
                src: ['test/*.js']
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                commit: true,
                commitMessage: 'Daily Build v%VERSION%',
                commitFiles: ['package.json'],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Daily Build by Jenkins - v%VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescriptionOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        }
    });

    /* register all grunt tasks */
    grunt.registerTask('test', 'mochaTest:test');
    grunt.registerTask('teste2e', 'mochaTest:teste2e');
    grunt.registerTask('xunit', ['mkdir:results', 'env:xunit', 'mochaTest:xunit']);
    grunt.registerTask('xunite2e', ['mkdir:results', 'env:xunite2e', 'mochaTest:xunite2e'])
    grunt.registerTask('coverage', ['mkdir:results', 'mochaTest:test', 'mochaTest:coverage']);
    grunt.registerTask('cobertura', ['mkdir:results', 'mochaTest:test', 'mochaTest:cobertura']);

    /* set the default task to run */
    grunt.registerTask('default', 'test');
};

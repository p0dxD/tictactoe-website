'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    var serveStatic = require('serve-static')
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        watch: {
            css: {
                files: 'src/assets/scss/**/*.scss',
                tasks: ['compass:dev']
            },
            js: {
                files: ['src/assets/js/**/*.js'],
                tasks: ['copy:mainjs'],
            },
            html: {
                files: ['src/**/**/*.hbs'],
                tasks: ['assemble']
            },
            img: {
                files: ['src/assets/images/**/*.{jpg,gif,png}'],
                tasks: ['copy:img']
            },
            fonts: {
                files: ['src/assets/fonts/**/*.{otf,ttf,woff,eot}'],
                tasks: ['copy:fonts']
            },
            json: {
                files: ['src/data/**/*.json'],
                tasks: ['assemble']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    'src/**/*.hbs',
                    'src/assets/scss/**/*.scss',
                    'src/assets/js/*.js',
                    'src/assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    'src/data/**/*.json'
                ]
            }
        },//end watch 

        connect: {
            options: {
                port: 9000,
                // hostname: 'localhost', // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            serveStatic('build')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                            serveStatic('build')
                        ];
                    }
                }
            }
        },//end connect

        assemble: {
            options: {
                assets: 'src/assets',
                // plugins: ['permalinks'],
                partials: ['src/partials/**/*.hbs'],
                layoutdir: 'src/layouts',
                data: ['src/data/**/*.{json,yml}']
            },
            site: {
                options: {
                    layout: 'base.hbs',
                    assets: 'build/assets'
                },
                expand: true,
                cwd: 'src/pages',
                src: ['**/*.hbs'],
                dest: 'build/'
            }
        },//end assemble

        jshint: {
            all: [
                'src/assets/js/**/*.js'
            ]
        },

        compass: {
            build: {
                options: {
                    sassDir: 'src/assets/scss',
                    cssDir: 'build/assets/css',
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    sassDir: 'src/assets/scss',
                    cssDir: 'build/assets/css'
                }
            }
        },

        copy: {
            mainjs: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/js/',
                    src: '**/*',
                    dest: 'build/assets/js/'
                }, ],
            },
            img: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img/',
                    src: '**/*',
                    dest: 'build/assets/img/'
                }, ],
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/fonts/',
                    src: '**/*',
                    dest: 'build/assets/fonts/'
                }, ],
            },
            etc: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '*.{png,ico,jpg,gif,md,txt}',
                    dest: 'build/'
                }]
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            files: {
                src: 'build/assets/css/main.css',
                dest: 'build/assets/css/main.min.css'
            }
        },

        uglify: {
            
            mainjs: {
                src: 'build/assets/js/**/*.js',
                dest: 'build/assets/js/*.min.js'

            }
        },

        clean: {
            html: ['build/**/*.html'],
            js: ['build/assets/js'],
            css: ['build/assets/css'],
            img: ['build/assets/img']
        }
    });

    grunt.loadNpmTasks('assemble'); // Special case

    // Default task(s).
    grunt.registerTask('default', [
        'assemble',
        'compass:dev',
        'copy',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        // 'jshint',
        'assemble',
        'compass:build',
        'copy',
        'cssmin',
        // 'uglify'
    ]);

};
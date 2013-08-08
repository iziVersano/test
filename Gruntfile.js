'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [ 
                    'app/**/*.js',
                    'app/**/*.less',
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            },
            jst: {
                files: [
                    '<%= yeoman.app %>/scripts/templates/*.ejs'
                ],
                tasks: ['jst']
            },
            css: {
                files: ['app/**/*.less'],
                tasks: 'less'
            }
        },

        less: {
            all: {
                files: {
                    'app/styles/app.css': 'app/styles/app.less'
                },
                options: {
                    compress: true
                }
            }
        },

        connect: {
            options: {
                port: 8888,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            }
            // test: {
            //     options: {
            //         middleware: function (connect) {
            //             return [
            //                 mountFolder(connect, '.tmp'),
            //                 mountFolder(connect, 'test'),
            //                 mountFolder(connect, yeomanConfig.app)
            //             ];
            //         }
            //     }
            // },
            // dist: {
            //     options: {
            //         middleware: function (connect) {
            //             return [
            //                 mountFolder(connect, yeomanConfig.dist)
            //             ];
            //         }
            //     }
            // }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
               // 'app/**/*.js',
               // 'app/**/*.less',
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/specs/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '.tmp/spec',
                    src: '*.coffee',
                    dest: 'test/spec'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    dir: 'dist',
                    baseUrl: '<%= yeoman.app %>',
                    //optimize: 'none',
                   paths: {
                                           'underscore': '../vendor/underscore-1.4.4',
                                             'text': '../vendor/require.text-2.0.3',
                                             'domReady': '../vendor/require.domReady-2.0.1',
                                             'jquery': '../vendor/jquery-1.8.2',
                                             'backbone': '../vendor/backbone-0.9.2',
                                             'backbone.localStorage': '../vendor/backbone.localstorage-1.0.0',
                                             'slidesjs': '../vendor/jquery.slides',
                                             'backbone.nested': '../vendor/backbone.nested-1.1.2',
                                             'backbone.modelbinder-0.1.6': '../vendor/backbone.modelbinder-0.1.6',
                                             'backbone.layoutmanager': '../vendor/backbone.layoutmanager-0.6.6'
                   },
                   shim: {
                       backbone: {
                           //These script dependencies should be loaded before loading backbone.js
                           deps: ['underscore', 'jquery'],
                           //Once loaded, use the global 'Backbone' as the module value.
                           exports: 'Backbone'
                       },
                       underscore: {
                           exports: '_'
                       },
                       'backbone.localStorage': {
                             deps: ['backbone'],
                             exports: 'Backbone'
                       },
                       'backbone.layoutmanager': {
                             deps: ['backbone'],
                             exports: 'Backbone'
                       },
                       'backbone.nested': {
                             deps: ['backbone'],
                             exports: 'Backbone'
                       }
                   },
                   modules: [
                       {
                           name: 'main',
                           include: ['text', 'domReady']
                       }
                   ],
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    wrap: true,
                    optimizeCss: 'none', // handled by LESS
                    removeCombined: true,
                    keepBuildDir: true,
                    inlineText: true,
                    useStrict: true,
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^\./ // This will exlude any dot files, such as .git/, .DS_Store etc.
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
     
      

        concat: {
          dist: {
            files: {
              '<%= yeoman.dist %>/app/main.js': [
                '.tmp/scripts/{,*/}*.js',
                '<%= yeoman.app %>/{,*/}*.js'
              ]
            }
          }
        },

        uglify: {
                  dist: {
                    files: {
                      '<%= yeoman.dist %>/app/main.js': [
                        '<%= yeoman.dist %>/app/main.js'
                      ],
                    }
                  }
        },

        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
       copy: {
           dist: {
               files: {
                   '<%= yeoman.dist %>app/': 'app/**',
                   '<%= yeoman.dist %>vendor/': 'vendor/**',
                   '<%= yeoman.dist %>index.html': 'index.html'
               }
           }
       },
        // copy: {
        //     dist: {
        //         files: [{
        //             expand: true,
        //             dot: true,
        //             cwd: '<%= yeoman.app %>',
        //             dest: '<%= yeoman.dist %>',
        //             src: [
        //                 '*.{ico,txt}',
        //                 '.htaccess',
        //                 'images/{,*/}*.{webp,gif}'
        //             ]
        //         }]
        //     }
        // },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/app/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            grunt.log.write('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            return grunt.task.run(['build']);
        }

        grunt.task.run([
            //'clean:server',
            //'coffee:dist',
            //'createDefaultTemplate',
            //'jst',
            //'build',
            'connect',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'coffee',
        'createDefaultTemplate',
        'jst',
        'compass',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
       // 'coffee',
       // 'createDefaultTemplate',
        'jst',
       
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
     //   'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint'
       // 'test',
       // 'build'
    ]);
};

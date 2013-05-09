/*!
 * 
 * Grunt configuration http://gruntjs.com/

 */

module.exports = function(grunt) {
    'use strict';
    // Configuration
    grunt.initConfig({
        buildDirectory: '../build/', // Folder to build into
        pkg: '<json:package.json>', // Can pull information from project package.json
        meta: {
            banner: '/*!\n' +
                    ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %>\n' +
                    ' */'
        },
        clean: {
            beforeBuild: [
                '<%= buildDirectory %>'
            ],
            afterBuild: [
                '<%= buildDirectory %>app/data',
                '<%= buildDirectory %>app/**/*.less',
                '<%= buildDirectory %>app/lib',
                '<%= buildDirectory %>app/pages',
                '<%= buildDirectory %>app/widgets'
            ]
        },
        copy: {
            build: {
                files: {
                    '<%= buildDirectory %>app/': 'app/**',
                    '<%= buildDirectory %>vendor/': 'vendor/**',
                    '<%= buildDirectory %>index.html': 'index.html'
                }
            }
        },
        lint: {
            files: ["grunt.js", "app/**/*.js"],
            src: ['app/**/*.less']
        },
        // http://www.jshint.com/docs/
        jshint: {
            options: {
                curly: true,
                strict: true,
                eqeqeq: false,
                immed: true,
                latedef: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                browser: true,
                scripturl: true,
                laxcomma:true
            },
            globals: {
                define: true,
                require: true,
                console: true,
                alert: true,
                $: true,
                _: true,
                Backbone: true,
                Highcharts: true,
                google: true
            }
        },
        min: {
            build: {
              src: '<%= buildDirectory %>app/main.js',
              dest: '<%= buildDirectory %>app/main.js'
            }
        },
        uglify: {
            mangle: {toplevel: true},
            squeeze: {dead_code: false},
            codegen: {quote_keys: true}
        },
        concat: {
            js: {
                src: ['<banner>', '<file_strip_banner:<%= buildDirectory %>app/main.js>'],
                dest: '<%= buildDirectory %>app/main.js'
            },
            css: {
                src: ['<banner>', '<file_strip_banner:<%= buildDirectory %>app/styles/app.css>'],
                dest: '<%= buildDirectory %>app/styles/app.css'
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
        requirejs: {
            build: {
                options: {
                    appDir: '<%= buildDirectory %>',
                    baseUrl: 'app',
                    dir: '<%= buildDirectory %>',
                    paths: {
                        'text': '../vendor/require.text-2.0.3',
                        'domReady': '../vendor/require.domReady-2.0.1'
                    },
                    modules: [
                        {
                            name: 'main',
                            include: ['text', 'domReady']
                        }
                    ],
                    optimize: 'none', // handled by Grunt
                    optimizeCss: 'none', // handled by LESS
                    wrap: true,
                    preserveLicenseComments: false,
                    removeCombined: true,
                    keepBuildDir: true,
                    inlineText: true,
                    useStrict: true,
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^\./ // This will exlude any dot files, such as .git/, .DS_Store etc.
                }
            }
        },
        server: {
            port: 8888,
            base: './'
        },
        watch: {
            gruntfile: {
                files: ['grunt.js'],
                tasks: 'lint'
            },
            app: {
                files: ['app/**/*.js'],
                tasks: 'lint'
            },
            css: {
                files: ['app/**/*.less'],
                tasks: 'less'
            }
        }
    });
    // Load NPM tasks
    // These need to be in the project package.json file for installation
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Register tasks
    grunt.registerTask('default', 'launch');
    grunt.registerTask('build', 'less clean:beforeBuild copy:build requirejs:build clean:afterBuild min:build concat');
    grunt.registerTask('launch', 'server watch');
};

'use strict';
/*global require:true, module:false*/
module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    
    grunt.loadNpmTasks('grunt-contrib-less');

    var framework7 = {
        filename: 'framework7'
    };


    var customModules = grunt.file.readJSON('modules.json');
    var customBanner = '/*\n' +
                    ' * <%= pkg.name %> <%= pkg.version %> - Custom Build\n' +
                    ' *\n' +
                    ' * Included modules: <%= modulesList %>\n' +
                    ' *\n' +
                    ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
                    ' * The iDangero.us\n' +
                    ' * http://www.idangero.us/\n' +
                    ' *\n' +
                    ' * Created on: <%= grunt.template.today("mmmm d, yyyy, HH:MM") %>\n' +
                    '*/\n';

    // List of js files to concatenate
    var jsFilesList = [
        'www/www/src/js/wrap-start.js',
        'www/src/js/f7-intro.js',
        'www/src/js/views.js',
        'www/src/js/navbars.js',
        'www/src/js/searchbar.js',
        'www/src/js/messagebar.js',
        'www/src/js/xhr.js',
        'www/src/js/pages.js',
        'www/src/js/router.js',
        'www/src/js/modals.js',
        'www/src/js/panels.js',
        'www/src/js/messages.js',
        'www/src/js/swipeout.js',
        'www/src/js/sortable.js',
        'www/src/js/smart-select.js',
        'www/src/js/pull-to-refresh.js',
        'www/src/js/infinite-scroll.js',
        'www/src/js/scroll-toolbars.js',
        'www/src/js/tabs.js',
        'www/src/js/accordion.js',
        'www/src/js/fast-clicks.js',
        'www/src/js/clicks.js',
        'www/src/js/resize.js',
        'www/src/js/forms-handler.js',
        'www/src/js/push-state.js',
        'www/src/js/slider.js',
        'www/src/js/photo-browser.js',
        'www/src/js/notifications.js',
        'www/src/js/template7-templates.js',
        'www/src/js/plugins.js',
        'www/src/js/init.js',
        'www/src/js/f7-outro.js',
        'www/src/js/dom7-intro.js',
        'www/src/js/dom7-methods.js',
        'www/src/js/dom7-ajax.js',
        'www/src/js/dom7-utils.js',
        'www/src/js/dom7-outro.js',
        'www/src/js/proto-support.js',
        'www/src/js/proto-device.js',
        'www/src/js/proto-plugins.js',
        'www/src/js/wrap-end.js',
        'www/src/js/template7.js'
    ];

    // Project configuration.
    grunt.initConfig({
        framework7: framework7,
        // Metadata.
        pkg: grunt.file.readJSON('bower.json'),
        banner: '/*\n' +
            ' * <%= pkg.name %> <%= pkg.version %>\n' +
            ' * <%= pkg.description %>\n' +
            ' *\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
            ' * The iDangero.us\n' +
            ' * http://www.idangero.us/\n' +
            ' *\n' +
            ' * Licensed under <%= pkg.license.join(" & ") %>\n' +
            ' *\n' +
            ' * Released on: <%= grunt.template.today("mmmm d, yyyy") %>\n' +
            '*/\n',

        // Task configuration.
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: ''
                }
            }
        },
        open: {
            kitchen: {
                path: 'http://localhost:3000/kitchen-sink'
            }
        },
        less: {
            build: {
                options: {
                    paths: ['less'],
                    cleancss: false
                },
                files: {
                    'www/build/css/<%= framework7.filename %>.css' : ['www/src/less/<%= framework7.filename %>.less'],
                    'www/build/css/<%= framework7.filename %>.rtl.css' : ['www/src/less/<%= framework7.filename %>.rtl.less'],
                    'www/build/css/<%= framework7.filename %>.themes.css' : ['www/src/less/<%= framework7.filename %>.themes.less']
                }
            },
            dist: {
                options: {
                    paths: ['less'],
                    cleancss: true
                },
                files: {
                    'www/dist/css/<%= framework7.filename %>.min.css' : ['www/src/less/<%= framework7.filename %>.less'],
                    'www/dist/css/<%= framework7.filename %>.rtl.min.css' : ['www/src/less/<%= framework7.filename %>.rtl.less'],
                    'www/dist/css/<%= framework7.filename %>.themes.min.css' : ['www/src/less/<%= framework7.filename %>.themes.less']
                }
            },
            kitchen: {
                options: {
                    paths: ['www/kitchen-sink/less/'],
                    cleancss: false
                },
                files: {
                    'www/kitchen-sink/css/kitchen-sink.css' : 'www/kitchen-sink/less/kitchen-sink.less'
                }
            },
            examples: {
                options: {
                    cleancss: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'www/examples/tab-bar/less/',
                        src: ['*.less'],
                        dest: 'www/examples/tab-bar/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'www/examples/split-view/less/',
                        src: ['*.less'],
                        dest: 'www/examples/split-view/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'www/examples/split-view-panel/less/',
                        src: ['*.less'],
                        dest: 'www/examples/split-view-panel/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'www/examples/inline-pages/less/',
                        src: ['*.less'],
                        dest: 'www/examples/inline-pages/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'www/examples/template7-pages/less/',
                        src: ['*.less'],
                        dest: 'www/examples/template7-pages/css/',
                        ext: '.css'
                    }
                ]
            },
            apps: {
                options: {
                    cleancss: false
                },
                files: [
                   
                    {
                        expand: true,
                        cwd: 'www/less/',
                        src: ['*.less'],
                        dest: 'www/css/',
                        ext: '.css'
                    }
                ]
            },
            custom: {
                options: {
                    paths: ['less'],
                    cleancss: false
                },
                files: {
                    'www/custom/css/<%= framework7.filename %>.custom.css' : ['custom/<%= framework7.filename %>.custom.less'],
                }
            },
            custom_min: {
                options: {
                    paths: ['less'],
                    cleancss: true
                },
                files: {
                    'www/custom/css/<%= framework7.filename %>.custom.min.css' : ['custom/<%= framework7.filename %>.custom.less'],
                }
            },
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false,
                process: function (src, filename) {
                    if (filename.indexOf('.js') >= 0) {
                        var addIndent = '        ';
                        filename = filename.replace('www/src/js/', '');
                        if (filename === 'wrap-start.js' || filename === 'wrap-end.js' || filename === 'template7.js') {
                            addIndent = '';
                        }
                        var add4spaces = ('f7-intro.js f7-outro.js proto-device.js proto-plugins.js proto-support.js dom7-intro.js dom7-outro.js').split(' ');
                        if (add4spaces.indexOf(filename) >= 0) {
                            addIndent = '    ';
                        }
                        var add8spaces = ('dom7-methods.js dom7-ajax.js dom7-utils.js').split(' ');
                        if (add8spaces.indexOf(filename) >= 0) {
                            addIndent = '        ';
                        }
                        src = grunt.util.normalizelf(src);
                        return src.split(grunt.util.linefeed).map(function (line) {
                            return addIndent + line;
                        }).join(grunt.util.linefeed);
                    }
                    else return src;
                }
            },
            js: {
                src: jsFilesList,
                dest: 'www/build/js/<%= framework7.filename %>.js',
                sourceMap: true,
                options: {
                    sourceMap: true
                }
            },
            css_build: {
                src: ['www/build/css/<%= framework7.filename %>.css'],
                dest: 'www/build/css/<%= framework7.filename %>.css'
            },
            css_dist: {
                src: ['www/dist/css/<%= framework7.filename %>.min.css'],
                dest: 'www/dist/css/<%= framework7.filename %>.min.css'
            },
            js_custom: {
                options: {
                    banner: customBanner
                },
                src: '<%= modulesJsList %>',
                dest: 'www/custom/js/<%= framework7.filename %>.custom.js'
            },
            less_custom: {
                options: {
                    banner: '',
                },
                src: '<%= modulesLessList %>',
                dest: 'www/custom/<%= framework7.filename %>.custom.less'
            },
            css_custom: {
                options: {
                    banner: customBanner
                },
                files: {
                    'www/custom/css/<%= framework7.filename %>.custom.css' : ['custom/css/<%= framework7.filename %>.custom.css'],
                    'www/custom/css/<%= framework7.filename %>.custom.min.css' : ['custom/css/<%= framework7.filename %>.custom.min.css'],
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: true
            },
            dist: {
                src: ['www/dist/js/<%= framework7.filename %>.js'],
                dest: 'www/dist/js/<%= framework7.filename %>.min.js',
            },
            custom: {
                options: {
                    banner: customBanner
                },
                src: ['www/custom/js/<%= framework7.filename %>.custom.js'],
                dest: 'www/custom/js/<%= framework7.filename %>.custom.min.js',
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            build: {
                src: ['Gruntfile.js', 'www/build/js/framework7.js']
            },
            custom: {
                src: ['custom/js/<%= framework7.filename %>.custom.js']
            }
        },
        
        watch: {
            build: {
                files: ['www/src/**'],
                tasks: ['build'],
                options: {
                    livereload: true
                }
            },
            kitchen: {
                files: ['www/kitchen-sink/jade/**', 'www/kitchen-sink/less/**'],
                tasks: ['jade:kitchen', 'less:kitchen'],
                options: {
                    livereload: true
                }
            },
            examples: {
                files: [
                    'www/examples/tab-bar/jade/**', 'www/examples/tab-bar/less/**',
                    'www/examples/split-view/jade/**', 'www/examples/split-view/less/**',
                    'www/examples/split-view-panel/jade/**', 'www/examples/split-view-panel/less/**',
                    'www/examples/inline-pages/jade/**', 'www/examples/inline-pages/less/**',
                    'www/examples/template7-pages/jade/**', 'www/examples/template7-pages/less/**'
                ],
                tasks: ['jade:examples', 'less:examples'],
                options: {
                    livereload: true
                }
            },
            apps: {
                files: [
                    'www/jade/**', 'www/less/**',
                ],
                tasks: ['jade:apps', 'less:apps'],
                options: {
                    livereload: true
                }
            }
        },
        jade: {
            build: {
                options: {
                    pretty: true,
                },
                files: [{
                    expand: true,
                    cwd: 'www/src/templates/',
                    src: ['*.jade'],
                    dest: 'build/',
                    ext: '.html'
                }]
            },
            kitchen: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'www/kitchen-sink/jade/',
                    src: ['*.jade'],
                    dest: 'www/kitchen-sink/',
                    ext: '.html'
                }]
            },
            examples: {
                options: {
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'www/examples/tab-bar/jade/',
                        src: ['*.jade'],
                        dest: 'www/examples/tab-bar/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'www/examples/split-view/jade/',
                        src: ['*.jade'],
                        dest: 'www/examples/split-view/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'www/examples/split-view-panel/jade/',
                        src: ['*.jade'],
                        dest: 'www/examples/split-view-panel/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'www/examples/inline-pages/jade/',
                        src: ['*.jade'],
                        dest: 'www/examples/inline-pages/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'www/examples/template7-pages/jade/',
                        src: ['*.jade'],
                        dest: 'www/examples/template7-pages/',
                        ext: '.html'
                    }
                ]
            },
            apps: {
                options: {
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'www/jade/',
                        src: ['*.jade'],
                        dest: '',
                        ext: '.html'
                    }
                ]
            }
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'www/src/',
                        src: ['img/**'],
                        dest: 'www/build/'
                    },
                    {
                        expand: true,
                        cwd: 'www/src/my-app/',
                        src: ['my-app.css'],
                        dest: 'www/build/css/'
                    },
                    {
                        expand: true,
                        cwd: 'www/src/my-app/',
                        src: ['my-app.js'],
                        dest: 'www/build/js/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'www/build/',
                        src: ['**'],
                        dest: 'www/dist/'
                    }
                ]
            },
        },
    });

    // Default task.
    this.registerTask('default', ['build']);

    // Build a new version of the library
    this.registerTask('test', 'Test of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'concat:css_build',
        'jshint:build',
    ]);

    // Build a new version of the library
    this.registerTask('build', 'Builds a development version of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'concat:css_build',
        'jshint:build',
        'copy:build',
        'jade:build',
    ]);

    // Release
    this.registerTask('dist', 'Builds a distributable version of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'less:dist',
        'concat:css_build',
        'concat:css_dist',
        'jshint:build',
        'copy:build',
        'jade:build',
        'copy:dist',
        'uglify:dist'
    ]);


    // Kitchen Sink
    this.registerTask('kitchen', 'Builds a kithcen sink', [
        'build',
        'jade:kitchen',
        'less:kitchen'
    ]);
    this.registerTask('examples', 'Compile examples less and jade files', [
        'jade:examples',
        'less:examples'
    ]);
    this.registerTask('apps', 'Compile apps less and jade files', [
        'jade:apps',
        'less:apps'
    ]);

    // Server
    this.registerTask('server', 'Run server', [
        'connect',
        'open',
        'watch'
    ]);

    // Custom Build
    this.registerTask('custom', 'Include modules in custom build', function (modules) {
        if (modules) modules = modules.split(',');
        modules = modules || [];
        var modulesJsList = [], modulesLessList = [];
        var i, module;
        modulesJsList.push.apply(modulesJsList, customModules.core_intro.js);
        modulesLessList.push.apply(modulesLessList, customModules.core_intro.less);

        for (i = 0; i < modules.length; i++) {
            module = customModules[modules[i]];
            if (module.dependencies.length > 0) {
                modules.push.apply(modules, module.dependencies);
            }
        }
        for (i = 0; i < modules.length; i++) {
            module = customModules[modules[i]];
            if (!(module)) continue;

            if (module.js.length > 0) {
                modulesJsList.push.apply(modulesJsList, module.js);
            }
            if (module.less.length > 0) {
                modulesLessList.push.apply(modulesLessList, module.less);
            }
        }
        modulesJsList.push.apply(modulesJsList, customModules.core_outro.js);
        modulesLessList.push.apply(modulesLessList, customModules.core_outro.less);

        // Unique
        var uniqueJsList = [];
        var uniqueLessList = [];
        for (i = 0; i < modulesJsList.length; i++) {
            if (uniqueJsList.indexOf(modulesJsList[i]) < 0) uniqueJsList.push(modulesJsList[i]);
        }
        for (i = 0; i < modulesLessList.length; i++) {
            if (uniqueLessList.indexOf(modulesLessList[i]) < 0) uniqueLessList.push(modulesLessList[i]);
        }

        // Tasks vars
        grunt.config.set('modulesJsList', uniqueJsList);
        grunt.config.set('modulesLessList', uniqueLessList);
        grunt.config.set('modulesList', modules.join(', '));

        // Run tasks
        grunt.task.run([
            'concat:js_custom',
            'jshint:custom',
            'uglify:custom',
            'concat:less_custom',
            'less:custom',
            'less:custom_min',
            'concat:css_custom'
        ]);
    });

};

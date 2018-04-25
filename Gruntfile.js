module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlbuild: {
            dist: {
                src: 'src/html/index.html',
                dest: 'dist/',
            }
        },
        browserify: {
            main: {
                src: 'src/js/script.js',
                dest: 'dist/script.js'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015-ie']
            },
            dist: {
                files: {
                    'dist/script.js': 'src/js/script.js'
                }
            }
        },
        less: {
            build: {
                files: {
                    'dist/styles.css': 'src/less/styles.less'
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/style.min.css': 'dist/styles.css'
                }
            }
        },
        watch: {
            options: {
                reload: true
            },
            styles: {
                files: ['src/less/*.less'],
                tasks: ['less', 'cssmin']
            },
            scripts: {
                files: ['src/js/script.js'],
                tasks: ['babel', 'babel-polyfill']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/style.min.css',
                        'dist/script.js',
                        'dist/index.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dist'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.registerTask('default', ['browserify', 'less', 'htmlbuild', 'browserSync', 'watch']);
};
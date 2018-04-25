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
                src: 'src/js/script1.js',
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
                    'src/js/script1.js': 'src/js/script.js'
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
                tasks: ['browserify']
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('default', ['babel', 'browserify', 'less', 'htmlbuild', 'browserSync', 'watch']);
};
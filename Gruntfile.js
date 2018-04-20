module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
            // scripts: {
            //     files: ['src/js/script.js'],
            //     tasks: ['bsReload:css']
            // }
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

        // bsReload: {
        //     css: {
        //         reload: "index.html"
        //     },
        //     all: {
        //         reload: true
        //     }
        // }
    });


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['less', 'cssmin', 'browserSync', 'watch']);
};
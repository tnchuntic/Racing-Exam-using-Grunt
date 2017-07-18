module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        copy:{
            vendor:{
                files:[
                    {expand: true, cwd: 'node_modules/jquery/dist/', src: ['jquery.js','jquery.min.js'], dest: 'js/vendor/'},
                    {expand: true, cwd: 'node_modules/angular/', src: ['angular.js','angular.min.js'], dest: 'js/vendor/'},
                    {expand: true, cwd: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/', src: ['**'], dest: 'fonts/'},
                    {expand: true, cwd: 'node_modules/bootstrap-sass/assets/javascripts/', src: ['bootstrap.js','bootstrap.min.js'], dest: 'js/vendor/'},
                    {expand: true, cwd: 'node_modules/bootstrap-sass/assets/stylesheets/', src: ['**'], dest: 'scss/bootstrap/'},
                    {expand: true, cwd: 'node_modules/handlebars/dist/', src: ['handlebars.js','handlebars.min.js'], dest: 'js/vendor/'},
                ],
            },
        },
        compass:{
            dist: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'css',
                    fontsDir: 'fonts',
                    javascriptsDir: 'js',
                    imagesDir: 'images'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['compass']
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css', '!*.min.css.gzip'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        // jshint:{
        //
        // },
        concat:{
            vendor: {
                files: [
                    {
                        src: ['js/vendor/*.js','!js/vendor/*.min.js','!js/vendor/*.min.js.gzip'],
                        dest: 'js/vendor.js'
                    }
                ],
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: [
                    {
                        src: ['js/main.js','!js/main.min.js','js/main.min.js.gzip'],
                        dest: 'js/main.min.js'
                    },
                    {
                        src: ['js/vendor.js','!js/vendor.min.js','js/vendor.min.js.gzip'],
                        dest: 'js/vendor.min.js'
                    }
                ],
            },
        },
        // compress: {
        //     js: {
        //         options: {
        //             mode: 'gzip'
        //         },
        //         expand: true,
        //         cwd: 'js/',
        //         src: ['*.min.js','!*.js','!*.min.js.gzip'],
        //         dest: 'js/'
        //     }
        // },
        modernizr: {
            dist: {
                "crawl": false,
                "customTests": [],
                "dest": "js/vendor/modernizr.min.js",
                "tests": [],
                "options": [
                    "setClasses"
                ],
                "uglify": true
            }
        }
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks("grunt-modernizr");
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-compress');

    // Register task(s).
    grunt.registerTask('init', ['copy']);
    grunt.registerTask('build', ['modernizr','compass','concat']);
    grunt.registerTask('fullbuild', ['compass','modernizr','concat','uglify','cssmin']);
};
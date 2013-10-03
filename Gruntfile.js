module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['assets/js/lib/*.js', 'assets/js/app.js'],
        dest: 'assets/min/app.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy h:MM:ss") %> */\n'
      },
      dist: {
        files: {
          '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'assets/js/app.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          window: true,
          _: true,
          module: true,
          document: true
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy h:MM:ss") %> */\n'
        },
        files: {
          'assets/min/app.css': ['assets/css/lib/*.css', 'assets/css/*.css']
        }
      }
    },
    md5: {
      compile: {
        files: {
          'assets/min/': ['assets/min/app.js', 'assets/min/app.css']
        },
        options: {
          encoding: null,
          keepBasename: true,
          keepExtension: true,
          afterEach: function(fileChange, options){
            
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-md5');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'md5']);

};

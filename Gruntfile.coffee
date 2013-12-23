module.exports = (grunt) ->

  grunt.initConfig
    jshint:
      files: ['javascripts/*.js']
      options:
        globals:
          Backbone: true
          Zepto: true
          _: true
    jst:
      compile:
        files:
          'templates/compiled.js': ["templates/*.jst"]

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-jst'

  grunt.registerTask 'default', ['jshint', 'jst']

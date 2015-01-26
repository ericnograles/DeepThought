/**
 * Runs Mocha unit tests
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

  // Unit tests
  grunt.config.set('mochaTest', {
    test: {
      options: {
        reporter: 'spec'
      },
      src: ['tests/**/*.spec.js']
    },

    xunit: {
      options: {
        run: true,
        log: true,
        reporter: 'xunit'
      },
      src: ['tests/**/*.spec.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};

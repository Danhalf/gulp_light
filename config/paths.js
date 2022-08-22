module.exports = {
   srcPath: {
      html: ['src/**/*.html', 'src/**/*.pug'],
      styles: ['src/styles/**/*.scss', 'src/styles/**/*.styl', 'src/styles/**/*.css'],
      scripts: ['src/scripts/**/*.coffee', 'src/scripts/**/*.ts', 'src/scripts/**/*.js'],
      images: 'src/img/**',
   },

   destPath: {
      html: 'dist/',
      styles: 'dist/css/',
      scripts: 'dist/js/',
      images: 'dist/img/'
   }
}
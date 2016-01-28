# gulp-guide-page-generator

> A guide page generator for gulp


## Install

```
$ npm install --save-dev gulp-guide-page-generator
```


## Usage

```js
var gulp = require('gulp');
var guidePageGenerator = require('gulp-guide-page-generator');

gulp.task('default', function () {
	return gulp.src('src/**')
	    .pipe(gulp.dest('dist'))
		.pipe(guidePageGenerator())
		.pipe(gulp.dest('dist'));
});
```


## API

### guidePageGenerator(options)

#### options

##### title

Type: `string`
Default: `页面导航`

Guide page title.

##### template

Type: `string`
Default: `./pages-guide.html`

Guide page template, e.g: [pages-guide.html](./pages-guide.html).

##### filename

Type: `string`
Default: `pages-guide.html`

Output guide page file name.


## License

MIT © [obingo](https://github.com/obingo)

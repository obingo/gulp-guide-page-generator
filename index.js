/*
 * Copyright (c) 2016 xsbchen
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var template = require('lodash.template');
var through = require('through2');

var PLUGIN_NAME = 'gulp-guide-page-generator';

function unixifyPath(filepath) {
  if (process.platform === 'win32') {
    return filepath.replace(/\\/g, '/');
  } else {
    return filepath;
  }
}

function getPageTitle(filePath) {
  var text = fs.readFileSync(filePath);
  var result = text.toString().match(/<title[^>]*>([^<]+)<\/title>/);
  return result ? result[1] : path.basename(filePath, path.extname(filePath));
}

module.exports = function (options) {
  options = options || {};
  options.template = options.template || (__dirname + '/pages-guide.html');
  options.title = options.title || '页面导航';
  options.filename = options.filename || 'pages-guide.html';

  var siteMap = [];
  var lastDir = null;

  return through.obj(function (file, encoding, callback) {
    if (file.stat.isDirectory()) {
      lastDir = {
        title: path.basename(file.relative),
        path: unixifyPath(file.relative),
        pages: []
      };
      siteMap.push(lastDir);
    } else if (file.stat.isFile()) {
      lastDir.pages.push({
        title: getPageTitle(file.path),
        name: path.basename(file.path),
        path: unixifyPath(file.relative)
      });
    }
    callback();
  }, function (callback) {
    var self = this;
    fs.stat(options.template, function (err, stats) {
      if (err) {
        return callback(err);
      }

      if (stats.isFile()) {
        fs.readFile(options.template, 'utf8', function (err, data) {
          if (err) {
            return callback(err);
          }

          var compiled = template(data);
          var contents = compiled({title: options.title, siteMap: siteMap});
          var file = new File({path: options.filename, contents: new Buffer(contents)});
          self.push(file);
          callback();
        });
      }
    });
  });
};

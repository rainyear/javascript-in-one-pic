/*
 * opml2json.js
 * Copyright (C) 2015 rainy <me@rainy.im>
 *
 * Distributed under terms of the MIT license.
 */
var xml2js = require('xml2js');
var fs          = require('fs');

var parser = new xml2js.Parser();
var KMData = {
  root: {
    data: {
        // title
    },
    children: [
        // body
    ]
  }
};
var parseChildren = function (father) {
  if (father.hasOwnProperty("outline")) {
    var children = father.outline.map(function (child) {
      return parseChildren(child);
    });
    return {
      data: {
        text: father['$'].text.toString()
      },
      children: children
    }
  }else{
    return {
      data: {
        text: father['$'].text.toString()
      }
    }
  }
};
fs.readFile(__dirname + "/js in one pic.opml", function (err, data) {
  parser.parseString(data, function (err, result) {
    // var head = result.opml.head;
    var body   = result.opml.body[0].outline[0];
    var parsed = parseChildren(body);

    console.log(parsed);

    KMData.root.data.text = parsed.data.text;
    KMData.root.data.hyperlink = "https://github.com/rainyear";

    KMData.root.children = parsed.children;

    fs.writeFile(__dirname + "/js in one pic.json", JSON.stringify(KMData, null, 2));
  });
});

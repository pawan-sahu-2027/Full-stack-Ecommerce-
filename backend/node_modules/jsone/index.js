var dottedRegex = /^\.[$A-Z_][0-9A-Z_$]*/i;
var singleQuoteRegex = /^\['(?:[^'\\]|\\.)*'\]/;
var doubleQuoteRegex = /^\["(?:[^"\\]|\\.)*"\]/;
var integerRegex = /^\[[0-9]+\]/;

function parse(ref) {
  var remaining = ref[0] == '[' ? ref : '.' + ref;
  var keys = [];
  var matched, match, key;
  while (remaining.length > 0) {
    matched = false;
    match = dottedRegex.exec(remaining);
    if (!matched && match) {
      keys.push(match[0].substr(1));
      remaining = remaining.substr(Math.max(match[0].length, 1)); // prevent infinite loop
      matched = true;
    }
    match = singleQuoteRegex.exec(remaining);
    if (!matched && match) {
      key = JSON.parse('"' + match[0].substr(2, match[0].length - 4).replace(/(?:\\)"/, "\\\"") + '"');
      if (/^[0-9]+$/.exec(key)) key = parseInt(key);
      keys.push(key);
      remaining = remaining.substr(Math.max(match[0].length, 1)); // prevent infinite loop
      matched = true;
    }
    match = doubleQuoteRegex.exec(remaining);
    if (!matched && match) {
      key = JSON.parse(match[0].substr(1, match[0].length - 2));
      if (/^[0-9]+$/.exec(key)) key = parseInt(key);
      keys.push(key);
      remaining = remaining.substr(Math.max(match[0].length, 1)); // prevent infinite loop
      matched = true;
    }
    match = integerRegex.exec(remaining);
    if (!matched && match) {
      key = JSON.parse(match[0].substr(1, match[0].length - 2));
      if (/^[0-9]+$/.exec(key)) key = parseInt(key);
      keys.push(key);
      remaining = remaining.substr(Math.max(match[0].length, 1)); // prevent infinite loop
      matched = true;
    }
    if (!matched) return null;
  }
  return keys;
}

function stringify(keys) {
}

exports.parse = parse;
exports.stringify = stringify;

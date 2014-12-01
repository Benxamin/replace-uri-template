var QUERY_PARAM = ['?', '&'];

/**
 * Expose the replacement function.
 */

module.exports = replaceUriTemplate;

/**
 * Replace a URI template within a tokenized URL.
 * 
 * @param {String} uri - uri template (tokenized validation URL)
 * @param {String} value - what the token should actually be translated into.
 * @return {String} uri - original URI with token replaced by value.
 * @api public
 */

function replaceUriTemplate(uri, value) {
  if (2 != arguments.length) throw TypeError("replaceUriTemplate() requires two string parameters: URI Template and Value");
  return uri.replace(/\{(\+|#|\.|\/|;|\?|&)?(\w+)\}/, function(match, op, key) {
    if (~QUERY_PARAM.indexOf(op)) return op + key + '=' + encodeURIComponent(value);
    return op ? op + value : value;
  });
}

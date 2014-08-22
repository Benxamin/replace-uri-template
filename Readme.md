# replaceUriTemplate

Replaces a URI template with the given value, per the [hyper+json spec, validation extension](https://github.com/hypergroup/hyper-json/blob/master/extensions/validate-link.md).


## Example
```js
var replaceToken = require('replace-uri-template');
var newUrl = replaceToken('http://example.com/{?param}&key=123', 'newValue')
// newURl => "http://example.com/?param=newValue&key=123"
```

## License

MIT

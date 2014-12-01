/**
 * Module Dependencies
 */
 
var replace = require('..'),
  assert = require('assert');

/**
 * Tests
 */
var val = 'test123';

describe('replace', function() {

  describe('token missing parameter', function() {
    it('should throw new TypeError', function() {
      (function() {
        replace(val);
      }).should.throw();
    });
    it('should throw new TypeError', function() {
      (function() {
        replace('http://example.com{/param}/path/?foo=bar');
      }).should.throw();
    });
  });

  describe('Replacement value is zero (O)', function() {
    it('should return a normalized URL with the zero substituted', function() {
      var val = 0;
      replace('http://example.com{?param}', val).should.equal('http://example.com?param='+val);
      replace('http://example.com{&param}', val).should.equal('http://example.com&param='+val);
      replace('http://example.com?{+param}', val).should.equal('http://example.com?+'+val);
      replace('http://example.com?{#param}', val).should.equal('http://example.com?#'+val);
      replace('http://example.com?{.param}', val).should.equal('http://example.com?.'+val);
      replace('http://example.com?{;param}', val).should.equal('http://example.com?;'+val);
    });
  });

  describe('token adjacent to domain name', function() {
    it('should return normalized URL', function() {
      replace('http://example.com{/param}/path/?foo=bar', val).should.equal('http://example.com/'+val+'/path/?foo=bar');
      replace('http://example.com{+param}/path/?foo=bar', val).should.equal('http://example.com+'+val+'/path/?foo=bar');
      replace('http://example.com{#param}/path/?foo=bar', val).should.equal('http://example.com#'+val+'/path/?foo=bar');
      replace('http://example.com{.param}/path/?foo=bar', val).should.equal('http://example.com.'+val+'/path/?foo=bar');
      replace('http://example.com{;param}/path/?foo=bar', val).should.equal('http://example.com;'+val+'/path/?foo=bar');
    });
  });
  describe('token is within location', function() {
    it('should return normalized URL', function() {
      replace('http://example.com/foo{/param}/path/?foo=bar', val).should.equal('http://example.com/foo/'+val+'/path/?foo=bar');
      replace('http://example.com/foo{+param}/path/?foo=bar', val).should.equal('http://example.com/foo+'+val+'/path/?foo=bar');
      replace('http://example.com/foo{#param}/path/?foo=bar', val).should.equal('http://example.com/foo#'+val+'/path/?foo=bar');
      replace('http://example.com/foo{.param}/path/?foo=bar', val).should.equal('http://example.com/foo.'+val+'/path/?foo=bar');
      replace('http://example.com/foo{;param}/path/?foo=bar', val).should.equal('http://example.com/foo;'+val+'/path/?foo=bar');

      replace('http://example.com/foo/{/param}/path/?foo=bar', val).should.equal('http://example.com/foo//'+val+'/path/?foo=bar');
      replace('http://example.com/foo/{+param}/path/?foo=bar', val).should.equal('http://example.com/foo/+'+val+'/path/?foo=bar');
      replace('http://example.com/foo/{#param}/path/?foo=bar', val).should.equal('http://example.com/foo/#'+val+'/path/?foo=bar');
      replace('http://example.com/foo/{.param}/path/?foo=bar', val).should.equal('http://example.com/foo/.'+val+'/path/?foo=bar');
      replace('http://example.com/foo/{;param}/path/?foo=bar', val).should.equal('http://example.com/foo/;'+val+'/path/?foo=bar');
    });
  });
  describe('token is query parameter adjacent to domain', function() {
    it('should return normalized URL', function() {
      replace('http://example.com{?param}', val).should.equal('http://example.com?param='+val);
      replace('http://example.com{&param}', val).should.equal('http://example.com&param='+val);
      replace('http://example.com?{+param}', val).should.equal('http://example.com?+'+val);
      replace('http://example.com?{#param}', val).should.equal('http://example.com?#'+val);
      replace('http://example.com?{.param}', val).should.equal('http://example.com?.'+val);
      replace('http://example.com?{;param}', val).should.equal('http://example.com?;'+val);
    });
  });
  describe('token is first query parameter', function() {
    it('should return normalized URL', function() {
      replace('http://example.com/{?param}', val).should.equal('http://example.com/?param='+val);
      replace('http://example.com/{&param}', val).should.equal('http://example.com/&param='+val);
      replace('http://example.com/?{+param}', val).should.equal('http://example.com/?+'+val);
      replace('http://example.com/?{#param}', val).should.equal('http://example.com/?#'+val);
      replace('http://example.com/?{.param}', val).should.equal('http://example.com/?.'+val);
      replace('http://example.com/?{;param}', val).should.equal('http://example.com/?;'+val);
    });
  });
  describe('token is first of several query parameters', function() {
    it('should return normalized URL', function() {
      replace('http://example.com/{?param}&foo=bar&fuz=buz', val).should.equal('http://example.com/?param='+val+'&foo=bar&fuz=buz');
      replace('http://example.com/{&param}&foo=bar&fuz=buz', val).should.equal('http://example.com/&param='+val+'&foo=bar&fuz=buz');
      replace('http://example.com/?{+param}&foo=bar&fuz=buz', val).should.equal('http://example.com/?+'+val+'&foo=bar&fuz=buz');
      replace('http://example.com/?{#param}&foo=bar&fuz=buz', val).should.equal('http://example.com/?#'+val+'&foo=bar&fuz=buz');
      replace('http://example.com/?{.param}&foo=bar&fuz=buz', val).should.equal('http://example.com/?.'+val+'&foo=bar&fuz=buz');
      replace('http://example.com/?{;param}&foo=bar&fuz=buz', val).should.equal('http://example.com/?;'+val+'&foo=bar&fuz=buz');
    });
  });
  describe('token is one of several query parameters', function() {
    it('should return normalized URL', function() {
      replace('http://example.com/?foo=bar{&param}&fuz=buz', val).should.equal('http://example.com/?foo=bar&param='+val+'&fuz=buz');
      replace('http://example.com/?foo=bar&{param}&fuz=buz', val).should.equal('http://example.com/?foo=bar&'+val+'&fuz=buz');
    });
  });
  describe('token is last query parameter', function() {
    it('should return normalized URL', function() {
      replace('http://example.com/?foo=bar&fuz=buz{&param}', val).should.equal('http://example.com/?foo=bar&fuz=buz&param='+val);
      replace('http://example.com/?foo=bar&fuz=buz&{param}', val).should.equal('http://example.com/?foo=bar&fuz=buz&'+val);
    });
  });
});
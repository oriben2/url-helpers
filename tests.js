var chai      = require('chai')
  , expect    = chai.expect
  , helpers = require('./');

describe('compareUrlDomains', function() {
  var first = '//notaurl';
  var second = 'http://www.aurl.com';
  var result = helpers.compareUrlDomains(first, second);
  it('should return null when one of the urls isn\'t a url', function() {
    expect(result).to.equal(null);
  });

  first = 'www.a-valid.url.com';
  var result1 = helpers.compareUrlDomains(first, second);
  it('should return -1/1 when domains aren\'t the same', function() {
    expect(result1).to.equal(1);
  });

  first = 'blog.aurl.com';
  result2 = helpers.compareUrlDomains(first, second);
  it('should return 0 when domains are the same', function() {
    expect(result2).to.equal(0);
  });
});
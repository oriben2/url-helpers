var parseDomain = require('parse-domain');
var url = require('url');

var domainFromUrl = exports.domainFromUrl = function (first) {
  if (first.hasOwnProperty('domain')) {
    return first;
  }
  return parseDomain(first.toLowerCase());
};

var joinHostnameComponents = exports.joinHostnameComponents = function(parsed) {
  if (parsed.subdomain.length) {
    return (parsed.subdomain + "." + parsed.domain + "." + parsed.tld);
  } else {
    return (parsed.domain + "." + parsed.tld);
  }
};

var normalizedHostname = exports.normalizedHostname = function(urlString) {
  var parsed = domainFromUrl(urlString);
  if (!parsed || !parsed.hasOwnProperty('domain')) {
    return null;
  }
  return joinHostnameComponents(parsed);
};

var normalizedHostnames = exports.normalizedHostnames = function(urlString) {
  var parsed = domainFromUrl(urlString);
  if (!parsed.domain) {
    return null;
  }

  var joined = joinHostnameComponents(parsed);
  var hostnames = [joined];
  if (parsed.subdomain.length > 0) {
    if (parsed.subdomain === 'www.') {
      return hostnames.concat(parsed.domain + '.' + parsed.tld);
    }
    return hostnames;
  } else {
    return hostnames.concat('www.' + joined);
  }
};

var domainInUrlCollection = exports.domainInUrlCollection = function (first, coll) {
  if (!(coll instanceof Array)) {
    return compareUrlDomains(first, coll) === 0;
  }

  return coll.some(function(second) {
    return compareUrlDomains(first, second) === 0;
  });
};

var compareUrlDomains = exports.compareUrlDomains = function (first, second) {
  first = domainFromUrl(first);
  second = domainFromUrl(second);
  if (!first || !second) {
    return null;
  }
  if (first.tld.toLowerCase() != second.tld.toLowerCase()) {
    return -1;
  }
  return first.domain.toLowerCase().localeCompare(second.domain.toLowerCase())
};
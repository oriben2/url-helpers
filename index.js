var parseDomain = require('parse-domain');

var domainFromUrl = exports.domainFromUrl = function (first) {
  if (first.hasOwnProperty('domain')) {
    return first;
  }
  return parseDomain(first);
};

var normalizedHostnames = exports.normalizedHostnames = function(urlString) {	
  var parsed = parseDomain(urlString);
  if (!parsed.domain) {
  	return undefined;
  }
  var hostnames = [];
  if (parsed.subdomain.length) {
  	hostnames.push(parsed.subdomain + "." + parsed.domain + "." + parsed.tld);
  } else {
  	hostnames = hostnames.concat([parsed.domain + "." + parsed.tld, "www." + parsed.domain + "." + parsed.tld]);
  }

  return hostnames.map(Function.prototype.call, String.prototype.toLowerCase);
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
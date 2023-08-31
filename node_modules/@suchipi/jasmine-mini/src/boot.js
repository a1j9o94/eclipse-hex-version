module.exports = function(jasmineRequire) {
  var jasmine = jasmineRequire.core(jasmineRequire);

  var env = jasmine.getEnv({ suppressLoadErrors: true });

  var jasmineInterface = jasmineRequire.interface(jasmine, env);

  jasmine.interface = jasmineInterface;

  return jasmine;
};

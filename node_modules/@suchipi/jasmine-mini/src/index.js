var CompletionReporter = require("./reporters/completion_reporter"),
  ConsoleSpecFilter = require("./filters/console_spec_filter"),
  ConsoleReporter = require("./reporters/console_reporter");

function Jasmine(options) {
  options = options || {};
  var jasmineCore = options.jasmineCore || require("./core");
  this.jasmine = jasmineCore.boot(jasmineCore);
  this.specDir = "";
  this.env = this.jasmine.getEnv({ suppressLoadErrors: true });
  this.reportersCount = 0;
  this.completionReporter = new CompletionReporter();
  this.onCompleteCallbackAdded = false;
  this.showingColors = true;
  this.reporter = new ConsoleReporter();
  this.addReporter(this.reporter);
  this.defaultReporterConfigured = false;

  this.coreVersion = function() {
    return jasmineCore.version();
  };
}

Jasmine.prototype.randomizeTests = function(value) {
  this.env.randomizeTests(value);
};

Jasmine.prototype.seed = function(value) {
  this.env.seed(value);
};

Jasmine.prototype.showColors = function(value) {
  this.showingColors = value;
};

Jasmine.prototype.addReporter = function(reporter) {
  this.env.addReporter(reporter);
  this.reportersCount++;
};

Jasmine.prototype.clearReporters = function() {
  this.env.clearReporters();
  this.reportersCount = 0;
};

Jasmine.prototype.provideFallbackReporter = function(reporter) {
  this.env.provideFallbackReporter(reporter);
};

Jasmine.prototype.configureDefaultReporter = function(options) {
  options.timer = options.timer || new this.jasmine.Timer();
  options.print = options.print || console.log;
  options.showColors = options.hasOwnProperty("showColors")
    ? options.showColors
    : true;
  options.jasmineCorePath = options.jasmineCorePath || this.jasmineCorePath;

  this.reporter.setOptions(options);
  this.defaultReporterConfigured = true;
};

Jasmine.prototype.addMatchers = function(matchers) {
  this.env.addMatchers(matchers);
};

Jasmine.prototype.loadConfig = function(config) {
  this.specDir = config.spec_dir || this.specDir;

  if (config.stopSpecOnExpectationFailure !== undefined) {
    this.env.throwOnExpectationFailure(config.stopSpecOnExpectationFailure);
  }

  if (config.stopOnSpecFailure !== undefined) {
    this.env.stopOnSpecFailure(config.stopOnSpecFailure);
  }

  if (config.random !== undefined) {
    this.env.randomizeTests(config.random);
  }
};

Jasmine.prototype.onComplete = function(onCompleteCallback) {
  this.completionReporter.onComplete(onCompleteCallback);
};

Jasmine.prototype.stopSpecOnExpectationFailure = function(value) {
  this.env.throwOnExpectationFailure(value);
};

Jasmine.prototype.stopOnSpecFailure = function(value) {
  this.env.stopOnSpecFailure(value);
};

Jasmine.prototype.getInterface = function() {
  return this.jasmine.interface;
};

Jasmine.prototype.execute = function(filterString) {
  if (!this.defaultReporterConfigured) {
    this.configureDefaultReporter({ showColors: this.showingColors });
  }

  if (filterString) {
    var specFilter = new ConsoleSpecFilter({
      filterString: filterString
    });
    this.env.specFilter = function(spec) {
      return specFilter.matches(spec.getFullName());
    };
  }

  this.addReporter(this.completionReporter);
  this.env.execute();
};

Jasmine.run = function runJasmine(callback) {
  var output = "";
  var j = new Jasmine();

  j.configureDefaultReporter({
    print: function print(str) {
      output = output + str;
    },
    showColors: false
  });

  callback(j.getInterface());

  /* global Promise */
  return new Promise(function(resolve, reject) {
    j.onComplete(function(results) {
      if (results.overallStatus === "failed") {
        reject(new Error("Test run failed: \n" + output));
      } else {
        resolve(output);
      }
    });

    j.execute();
  });
};

module.exports = Jasmine;

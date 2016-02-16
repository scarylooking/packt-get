var page = require('webpage').create();
var credentials = require('./secrets').credentials;
var loadInProgress = false;
var claimUrl = null;
var testindex = 0;

page.onConsoleMessage = function(msg) {
  console.log('CON >> ' + msg);
};

page.onAlert = function(msg) {
  console.log('ALT >> ' + msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
};

phantom.onError = function(msg, trace) {
  console.log('ERR >> ' + msg);
  phantom.exit(1);
};

page.onLoadFinished = function(status) {
  loadInProgress = false;
  if (status !== 'success') {
    console.log('ERR >> Failed to load page');
    phantom.exit(1);
  }
};

function loadPackt() {
  console.log("Loading Packt...");
  page.open('https://www.packtpub.com/packt/offers/free-learning');

  console.log("Injecting jQuery...");
  page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
}

function getClaimUrl() {
  console.log("Getting claim URI...");

  claimUrl = page.evaluate(function() {
    return $(".twelve-days-claim").attr('href');
  });

  if (!claimUrl) {
    throw "Failed to locate claim URL.";
  } else {
    console.log('>> https://www.packtpub.com' + claimUrl);
  }
}

function loginToPacktAccount() {
  console.log("Logging in to Packt account...");

  page.evaluate(function(creds) {
    $("#email").val(creds.username);
    $("#password").val(creds.password);
    $("#edit-submit-1").click();
  }, credentials);
}

function clickClaimButton() {
  console.log("Clicking claim button...");

  page.evaluate(function() {
    $(".twelve-days-claim input").click();
  });
}

function navigateToClaimedTitleListingPage() {
  console.log("Loading claimed titles list...");
  page.open('https://www.packtpub.com/account/my-ebooks');
}

function getClaimedTitle() {
  var title = page.evaluate(function() {
    return $($(".product-line")[0]).attr('title');
  });

  console.log(">> Claimed: " + title);
}

function executeStep() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    steps[testindex]();
    //page.render(testindex + ".png");
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    //page.render(testindex + ".png");
    phantom.exit();
  }
}

var steps = [
  loadPackt,
  getClaimUrl,
  loginToPacktAccount,
  clickClaimButton,
  navigateToClaimedTitleListingPage,
  getClaimedTitle
];

interval = setInterval(executeStep, 10);

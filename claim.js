var page = require('webpage').create();
var credentials = require('./secrets').credentials;
var loadInProgress = false;
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

page.onLoadFinished = function(status) {
  loadInProgress = false;
  if (status !== 'success') {
    console.error('Something went wrong');
    phantom.exit();
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

  claim_url = page.evaluate(function() {
    return $(".twelve-days-claim").attr('href');
  });

  console.log('>> https://www.packtpub.com' + claim_url);
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

function getClaimedTitle() {
  console.log("Loading claimed titles list...");

  page.open('https://www.packtpub.com/account/my-ebooks');

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
  getClaimedTitle
];

interval = setInterval(executeStep, 500);

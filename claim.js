var credentials = require('./secrets').credentials;
var casper = require('casper').create();

casper.start('https://www.packtpub.com/', function() {
  if (!credentials.username) {
    this.echo('Username missing!', 'ERROR');
    this.exit();
  }

  this.echo('Logging in to Packt as ' + credentials.username + '...', 'COMMENT');

  if (!credentials.password) {
    this.echo('Password missing!', 'ERROR');
    this.exit();
  }

  this.fill('form#packt-user-login-form', {
    'email': credentials.username,
    'password': credentials.password
  }, true);
});

casper.thenOpen('https://www.packtpub.com/packt/offers/free-learning', function() {
  this.echo('Clicking claim button...', 'COMMENT');
  this.click('a.twelve-days-claim');
});

casper.then(function() {
  this.echo('Claimed: ' + this.evaluate(function() {
    return document.querySelector('.product-info .title').firstChild.nodeValue.trim();
  }), 'INFO');
});

casper.run(function() {
  this.exit();
});

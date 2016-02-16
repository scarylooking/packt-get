var credentials = require('./secrets').credentials;
var casper = require('casper').create();

var todaysTitle = "";

casper.start('https://www.packtpub.com/packt/offers/free-learning', function() {
  todaysTitle = this.evaluate(function() {
    return document.querySelector('.dotd-title h2').firstChild.nodeValue.trim();
  });

  this.echo('Todays free eBook is: ' + todaysTitle, 'COMMENT');
});

casper.then(function() {
  if (!credentials.username) {
    this.echo('ERROR: Username missing from secrets.js', 'ERROR');
    this.exit();
  }

  this.echo('Logging in to Packt as ' + credentials.username + '...', 'COMMENT');

  if (!credentials.password) {
    this.echo('ERROR: Password missing from secrets.js!', 'ERROR');
    this.exit();
  }

  this.fill('form#packt-user-login-form', {
    'email': credentials.username,
    'password': credentials.password
  }, true);
});

casper.then(function() {
  if (this.exists('.messages.error')) {
    this.echo('ERROR: Login Failed!', 'ERROR');
    this.exit();
  } else {
    this.echo('Login OK!', 'INFO');
  }
});

casper.then(function() {
  if (!this.exists('a.twelve-days-claim')) {
    this.echo('ERROR: Claim button is missing!', 'ERROR');
    this.exit();
  } else {
    this.echo('Claiming eBook...', 'COMMENT');
    this.click('a.twelve-days-claim');
  }
});

casper.thenOpen('https://www.packtpub.com/account/my-ebooks', function() {
  var claimedTitle = this.evaluate(function() {
    return document.querySelector('.product-info .title').firstChild.nodeValue.trim();
  });

  if (claimedTitle.toUpperCase().indexOf(todaysTitle.toUpperCase()) > -1) {
    this.echo('Success!', 'GREEN_BAR');
  } else {
    this.echo('ERROR: The last book in your library doesn\'t match todays title. Maybe you already claimed it?', 'ERROR');

    this.wait(15000, function() {
      this.exit();
    });
  }
});

casper.run(function() {
  this.exit();
});

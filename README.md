# packt-get
An automated tool that gets the Packt free eBook of the day

## Requirements
* [PhantomJS 2.1.1+](http://phantomjs.org/download.html)
* [Casper 1.1+](http://casperjs.org/)
* [Python 3.5.1+](https://www.python.org/)

##Setup
* Install **PhantomJS** somewhere (for example *c:\phantomjs*).
* Install **CasperJS** somewhere (for example *c:\casperjs*).
* Install Python, making sure to check **Add Python to environment variables**.
* Add the PhantomJS and CasperJS path to your PATH environment variable.
* Create a file called **secrets.js** in the *packt-get* directory like this...

```javascript
module.exports = {
    credentials: {
      username: "YOUR_PACKT_USERNAME",
      password: "YOUR_PACKT_PASSWORD"
    }
};
```

* Run the following command in the command line from the *packt-get* directory...

`casperjs claim.js`

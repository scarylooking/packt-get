# packt-get
An automated tool that gets the packt free eBook of the day

## Requirements
* [PhantomJS 2.1.1](http://phantomjs.org/download.html)

##Setup
* Extract **phantomjs.exe** into the *packt-get* directory.
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

`phantomjs claim.js`

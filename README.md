# packt-get
An automated tool that gets the Packt free eBook of the day

**I'm pretty sure this doesn't work anymore**

## Requirements
* [PhantomJS 2.1.1](http://phantomjs.org/download.html)
* [CasperJS 1.1](http://casperjs.org/)
* [Python 3.5.1](https://www.python.org/)

##Setup
* Install **PhantomJS**.
* Install **CasperJS**.
* Install **Python** making sure to check **Add Python to environment variables**.
* Add the **PhantomJS** and **CasperJS** path to your **PATH** environment variable.
* Create a file called **secrets.js** in the **packt-get** directory like this...

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

##Scheduled Task
You can create a scheduled task to automatically get the eBook of the day when you login to Windows...

* Open Task Scheduler
* **Action** > **Create Task**...
* Setup any triggers you want.
* Create a new action to **Start a program**
* Make sure to give the full path to **casper.exe** in the **program/script** field, for example *c:\casperjs\bin\casperjs.exe*
* Enter **claim.js** into the **Arguments** field
* Enter the path to the **packt-get** directory in the **Start in** field

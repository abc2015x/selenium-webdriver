var assert = require('assert'),
    $driver = require('selenium-webdriver');

var $browser = new $driver.Builder().forBrowser('chrome').build();
$browser.waitForElement = function (locatorOrElement, timeoutMsOpt) {
        return $browser.wait($driver.until.elementLocated(locatorOrElement), timeoutMsOpt || 1000, 'Timed-out waiting for element to be located using: ' + locatorOrElement);
      };
$browser.waitForAndFindElement = function (locatorOrElement, timeoutMsOpt) {
        return $browser.waitForElement(locatorOrElement, timeoutMsOpt)
          .then(function (element) {
            return $browser.wait($driver.until.elementIsVisible(element), timeoutMsOpt || 1000, 'Timed-out waiting for element to be visible using: ' + locatorOrElement)
              .then(function () {
                return element;
              });
          });
        };

//var driver = new webdriver.Builder().forBrowser('chrome').build();

//$browser.manage().window().setSize(2732,2732);
$browser.get('http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_random').then(function(){
  return $browser.switchTo().frame('iframeResult');
    })
.then(function(){
  return $browser.findElement($driver.By.xpath('/html/body/button')).then(function(element){
    return element.click();   });  })
.then(function(){
  return $browser.findElement($driver.By.id('demo')).getText();
})
.then(function(value){
  console.log(value);
  return assert(value > 0.5, "Value Greater than 0.5");
})
.catch(function(ex) {
  console.log("inside catch");
  console.error(ex);
})
.finally(function(){
 return console.log("end of the script");
});



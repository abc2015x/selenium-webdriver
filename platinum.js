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
$browser.manage().window().setSize(2732,2732);
$browser.get("https://www.palacecinemas.com.au/")
.then(function(){
    //navigate to palace platinum
    $browser.waitForElement($driver.By.xpath("//*[@id='header']/div[2]/nav/ul/li[9]/a"),5000).click();
}).then (function(){
    //choose days on platina page.
    $browser.waitForElement($driver.By.xpath("//*[@id='bycinema']/div/div[2]/div/ul/li[3]"),5000).click();
})
;
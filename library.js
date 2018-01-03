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
$browser.get("https://www.palacecinemas.com.au/")
.then(function(){
    return $browser.findElement($driver.By.id("search-box")).sendKeys("Stars Wars ");
}).then(function(){
$browser.findElement($driver.By.className("icon icon-searchnew")).click();
}).then(function(){
    $browser.waitForElement($driver.By.className("result"),5000);
}).then(function(){
    //title = $browser.findElement($driver.By.xpath("//*[@id='main']/div[3]/div/ul/li[1]/div/a/div[2]/div/span"));
    return $browser.findElement($driver.By.xpath("//*[@id='main']/div[3]/div/ul/li[1]/div/a")).click();
}).then(function(){
    $browser.findElement($driver.By.className("jcf-select-opener")).click();
    return $browser.findElement($driver.By.xpath("/html/body/div[8]/div/span/span/ul/li[3]/span")).click();
}).then(function(){
    $browser.waitForElement($driver.By.className("go-next active"),10000);
}).then(function(){
    return $browser.waitForElement($driver.By.xpath("//*[@id='bymovie']/div/div[2]/div/ul/li[2]"),15000).click();
}).then(function(){
    //return $browser.findElement($driver.By.xpath("//*[@id='bymovie']/div/div[3]/div/ul/li[2]/span[1]/a")).click();
    //navigate to palace platinum
    $browser.waitForElement($driver.By.xpath("//*[@id='header']/div[2]/nav/ul/li[9]/a"),5000).click();
}).then (function(){
    $browser.waitForElement($driver.By.xpath("//*[@id='bycinema']/div/div[2]/div/ul/li[3]"),5000).click();
})
;
// $browser.close(5000);
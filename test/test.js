const {Builder,By,Key} = require('selenium-webdriver');
const fs = require('fs')
const prompt = require('prompt');
const { log } = require('console');
require('chromedriver')

async function sample() {
    let driver = await new Builder().forBrowser("chrome").build();
    driver.manage().window().maximize()

    //paytm home page
    await driver.get("https://paytm.com");
    await driver.executeScript("window.scroll(0,1000)");

    //selecting flights
    let flight = await driver.findElement(By.xpath('//*[@id="app"]/section[4]/div/div/div/div[2]'));
    await flight.click();

    //choose from and to
    await driver.executeScript('window.scroll(0,220)')
    let from = await driver.findElement(By.id('text-box'))
    await from.click();
    await driver.findElement(By.xpath('//*[@id="flightsBookingForm"]/div[2]/div[2]/div[1]/div[2]/div/div/div[2]/div/div/div[1]/div[2]')).click()

    let to = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/div[2]/div/div[1]/div/div/div[2]/div[4]/div[1]/div[1]/input'))
    await to.click()
    await driver.findElement(By.xpath('//*[@id="flightsBookingForm"]/div[2]/div[4]/div[1]/div[2]/div/div/div[3]/div/div/div[1]/div[2]')).click()

    //date pick
    await driver.findElement(By.className('QbC4')).click()
    await driver.findElement(By.xpath('//*[@id="datePickerOnward"]/div[2]/div/div[3]/table/tbody/tr[4]/td[4]/div/div')).click()
    await driver.findElement(By.className('button')).click()

    await driver.sleep(3000)

    //selecting flight
    let stop = await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div/div/div/div[2]/div/div[1]/div[3]/div[1]/div[6]/div[2]')).getText()
    let takeoff = await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div/div/div/div[2]/div/div[1]/div[3]/div[1]/div[3]/div[1]')).getText();
    let reach = await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div/div/div/div[2]/div/div[1]/div[3]/div[1]/div[5]/div')).getText();
    await driver.sleep(3000)
    console.log('how many STOPS :'+stop);
    console.log('Take Off time :'+takeoff);
    console.log('Reach Time :'+reach); 
    await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/div/div/div[2]/div/div[1]/div[3]/div[1]')).click()
 
    //switching to flight tab
    let handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);

    await driver.executeScript('window.scroll(0,300)')
    await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div/div/div/div[3]/div[1]/div[1]/div[2]/div[2]/div/div[3]/button')).click()
    await driver.findElement(By.xpath('//*[@id="flights-review-traveller-details"]/div[2]/div[2]/div/div/a')).click()
    await driver.sleep(3000)
    await driver.switchTo().frame(0)

    //login
    await driver.findElement(By.className('info')).click();
    await driver.sleep(10000)
    await driver.switchTo().defaultContent()
    
    //adding a user
    await driver.sleep(2000)
    await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/div/div/div[3]/div[1]/div[3]/div[2]/div[2]/div/div[2]/div/div[1]/div/div/div[2]/div/div[1]/div/div[1]')).click();    
    await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/div/div/div[3]/div[1]/div[3]/div[2]/div[2]/div/div[2]/div/div[1]/div/div/div[2]/div/div[2]/div[1]/div/input')).sendKeys('Arun')
    await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/div/div/div[3]/div[1]/div[3]/div[2]/div[2]/div/div[2]/div/div[1]/div/div/div[2]/div/div[2]/div[2]/div/input')).sendKeys('kumar')

    await driver.findElement(By.xpath('//*[@id="flights-review-traveller-details"]/div[2]/div[2]/div/div[3]/div/button')).click()
    await driver.findElement(By.xpath('//*[@id="flights-review-ancillary"]/div[2]/div/div[1]/div/div[2]/div[1]')).click();

    //getting meals details
    await driver.sleep(2000)
    let meals = await driver.findElements(By.className('_2AV5'));
    await driver.sleep(10000)
    await Promise.all(meals.map(async(meal)=>{
      let res = await meal.getText()
      console.log(res);
    }))     

    let screenshot =await driver.takeScreenshot();
    fs.writeFileSync('screen1.png',screenshot,'base64')

}
sample()
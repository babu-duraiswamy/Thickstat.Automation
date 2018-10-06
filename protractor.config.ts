import { BrowserDriver } from './index';
import { Config } from 'protractor';

export let config: Config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,
  baseUrl : "https://athena.test.thickstat.ai/#/login",
  specs: ['./e2e/specs/testSpec.js'],
  params : {
    athenaProcessingTimeOut : 120000,
    explicitWaitTimeout : 30000
  },
  onPrepare: () => {
    BrowserDriver.setPageLoadTimeout(60000);
    BrowserDriver.setImplicitTimeOut(5000);
    BrowserDriver.waitForAngularEnabled(false);
    BrowserDriver.navigateToUrl(config.baseUrl);
    BrowserDriver.maximize();    
  },
  allScriptsTimeout: 90000,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  }
};
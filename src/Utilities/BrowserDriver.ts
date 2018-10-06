import { browser, ExpectedConditions } from "protractor";

export module BrowserDriver {
    export function navigateToUrl(url : string) {
        let navigateTo = new Promise<void>((resolve, reject) => {
            browser.navigate().to(url).then(() => {
                resolve();
            }).catch(error => {
                reject("Error Navigating to url {url}. Error: " + error);
            });
        })

        return navigateTo;
    }

    export function maximize() {
        browser.manage().window().maximize();
    }

    export function waitForAngularEnabled(enabled : boolean) {
        browser.waitForAngularEnabled(enabled);
    }

    export function setPageLoadTimeout(maxTimeOut : number){
        browser.manage().timeouts().pageLoadTimeout(maxTimeOut);
    }

    export function setImplicitTimeOut(maxTimeOut : number) {
        browser.manage().timeouts().implicitlyWait(maxTimeOut);
    }

    export function waitForUrlMatches(matchText : string) {
        let waitForUrl = new Promise<void>((resolve, reject) => {
            browser.wait(ExpectedConditions.urlContains(matchText), 60000).then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        })

        return waitForUrl;
    }
}
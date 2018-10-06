import { Locator, ElementFinder, element, browser } from "protractor";
import { getLocator } from "../Utilities/Locate";
import { Exception } from "../Exception/Exception";

export class UiElement {

    private locatorType: string;
    private locatorValue: string;
    private by: Locator;
    private explicitTimeOut = +browser.params.explicitWaitTimeout;

    constructor(locatortype: string, locatorvalue: string) {
        this.locatorType = locatortype;
        this.locatorValue = locatorvalue;
        this.by = getLocator(locatortype, locatorvalue);
    }

    public getElement(): ElementFinder {
        try {
            return element(this.by);
        }
        catch (error) {
            throw new Exception("Unable to find element with LocatorType: " + this.locatorType + " Locator Value: " + this.locatorValue);
        }
    }

    public getTextValue() : Promise<string> {
        let textValue = new Promise<string>((resolve, reject) => {
            try{
                resolve(this.getElement().getText());
            }
            catch(error) {
                reject("Error getting text value. error: " + error);
            }
        })

        return textValue;
    }

    public getAttribute(attributename: string) : Promise<string> {
        let attributeValue = new Promise<string>(async (resolve, reject) => {
            try {
                resolve(this.getElement().getAttribute(attributename));
            }
            catch (error) {
                reject(error);
            }
        })

        return attributeValue;
    }

    public getCssAttribute(attributename: string) : Promise<string> {
        let attributeValue = new Promise<string>((resolve, reject) => {
            try {
                resolve(this.getElement().getCssValue(attributename));
            }
            catch (error) {
                reject(error);
            }
        })

        return attributeValue;
    }

    public click(): Promise<void> {
        let click = new Promise<void>((resolve, reject) => {
            try {
                this.getElement().click();
                resolve();
            }
            catch (error) {
                reject(error);
            }
        })

        return click;
    }

    public isEnabled(): Promise<boolean> {
        let isEnabled = new Promise<boolean>((resolve, reject) => {
            try {
                this.getElement().isEnabled().then(enabled => {
                    resolve(enabled);
                })
            }
            catch (error) {
                reject(error);
            }
        })

        return isEnabled;
    }

    public isDisplayed(): Promise<boolean> {
        let isDisplayed= new Promise<boolean>((resolve, reject) => {
            try {
                this.getElement().isDisplayed().then(displayed => {
                    resolve(displayed);
                })
            }
            catch (error) {
                reject(error);
            }
        })

        return isDisplayed;
    }

    public waitTillPresent(maxTimeout? : number) : Promise<void> {
        let waitTillPresent = new Promise<void>((resolve, reject) => {
            browser.wait(() => {
                this.getElement().isPresent();
                resolve();
            }, this.explicitTimeOut).catch(error => {
                reject("Error Waiting for element to be present. Error Message: " + error);
            });
        })

        return waitTillPresent;
    }

    public waitTillEnabled(maxTimeout? : number) : Promise<void> {
        let waitTillEnabled = new Promise<void>((resolve, reject) => {
            browser.wait(() => {
                this.getElement().isEnabled();
                resolve();
            }, this.explicitTimeOut).catch(error => {
                reject("Error Waiting for element to be enabled. Error Message: " + error);
            });
        })

        return waitTillEnabled;
    }

    public waitTillDisplayed() : Promise<void> {
        let waitTillDisplayed = new Promise<void>((resolve, reject) => {
            browser.wait(() => {
                this.getElement().isDisplayed();
                resolve();
            }, this.explicitTimeOut).catch(error => {
                reject("Error Waiting for element to be displayed. Error Message: " + error);
            });
        })

        return waitTillDisplayed;
    }
}
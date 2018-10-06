import { UiElement } from "./UiElement";
import { Locate } from "../Utilities/Locate";
import { Textbox } from "./Textbox";
import { Key, browser } from "protractor";

export class ChatWindow {

    private currentResponseTextSelector: string;
    private currentResponseHyperlinkSelector : string;
    private autoSuggestSelector: string;
    private autosuggestOptionSelector: string;
    private textboxSelector: string;
    private processingIndicatorSelector: string;

    constructor() {
        this.currentResponseTextSelector = "//li[@class= 'ans-content left ng-scope'][last()]//div[@class= 'content']";
        this.currentResponseHyperlinkSelector = "//li[@class= 'ans-content left ng-scope'][last()]//li//a[normalize-space(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')) = 'HYPERLINKTEXT']";
        this.autoSuggestSelector = "//div[contains(@class, 'autocomplete')]";
        this.autosuggestOptionSelector = this.autoSuggestSelector + "//ul//div[normalize-space(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')) = 'OPTIONTEXT']//parent::li";
        this.textboxSelector = this.autoSuggestSelector + "//input";
        this.processingIndicatorSelector = "div[ng-show='typingIndicator'][class*='ng-hide']";
    }

    public getResponseText(): Promise<string> {
        let currentResponse = new Promise<string>((resolve, reject) => {
            try {
                let response = new UiElement(Locate.byXpath, this.currentResponseTextSelector);
                resolve(response.getTextValue());
            }
            catch (error) {
                reject("Error getting response text. Error: " + error);
            }
        })

        return currentResponse;
    }

    public selectHyperlinkInTheLatestResponse(hyperlinkText : string): Promise<void> {
        let selectHyperlink= new Promise<void>((resolve, reject) => {
            try {
                let response = new UiElement(Locate.byXpath, this.currentResponseHyperlinkSelector.replace("HYPERLINKTEXT", hyperlinkText.toLowerCase()));
                response.click();
                this.waitForAthenaProcessing();
                resolve();
            }
            catch (error) {
                reject("Error selecting hyperlink. Error: " + error);
            }
        })

        return selectHyperlink;
    }

    public typeAndSelectOption(searchText: string, optionText: string): Promise<void> {
        let search = new Promise<void>((resolve, reject) => {
            try {
                let searchtextbox: Textbox = new Textbox(Locate.byXpath, this.textboxSelector);
                searchtextbox.click();
                searchtextbox.setText(searchText);
                let selectOption = new UiElement(Locate.byXpath, this.autosuggestOptionSelector.replace("OPTIONTEXT", optionText));
                selectOption.click();
                searchtextbox = new Textbox(Locate.byXpath, this.textboxSelector);
                searchtextbox.waitTillPresent();
                searchtextbox.setText(Key.ENTER);
                this.waitForAthenaProcessing();
                resolve();
            }
            catch (error) {
                reject(error);
            }
        })

        return search;
    }

    public waitForAthenaProcessing() {
        let waitForChatProcessing = new Promise<void>((resolve, reject) => {
            try {
                let typingIndicatorHidden = new UiElement(Locate.byCss, this.processingIndicatorSelector);
                typingIndicatorHidden.waitTillPresent(+browser.params.athenaProcessingTimeOut);
                resolve();
            }
            catch (error) {
                reject("Error waiting for processing indicator to disappear.  Error: " + error);
            }
        })

        return waitForChatProcessing;
    }
}
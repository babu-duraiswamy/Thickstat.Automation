import { UiElement } from "./UiElement";
import { Locate } from "../Utilities/Locate";
import { Textbox } from "./Textbox";

export class DatasetList{
    private listItemTextSelector : string;

    constructor() {
        this.listItemTextSelector = "//div[@class ='data-set-list']//li//div[@class ='ng-binding' and translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = 'ITEMTEXT']";
    }

    public select(itemText : string) : Promise<void> {
        let selectItem = new Promise<void>(async (resolve, reject) => {
            try{
                let listItem = new UiElement(Locate.byXpath, this.listItemTextSelector.replace("ITEMTEXT", itemText.toLowerCase()));
                await listItem.waitTillPresent();
                await listItem.click();
                resolve();
            }
            catch(error) {
                reject(error);
            }
        })

        return selectItem;
    }

    public search(searchText : string) : Promise<void> {
        var search = new Promise<void>(async (resolve, reject) => {
            try{
                var searchTextBox = new Textbox(Locate.byCss, "input[placeholder = 'Search by domain name']");
                await searchTextBox.setText(searchText);
                resolve();
            }
            catch(error) {
                reject(error);
            }
        })

        return search;
    }
}
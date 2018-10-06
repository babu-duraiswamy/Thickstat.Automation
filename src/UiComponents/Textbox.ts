import { UiElement } from "./UiElement";

export class Textbox extends UiElement {
    constructor(locatorType : string, locatorValue : string) {
        super(locatorType, locatorValue);
    }

    public setText(value : string) : void {
        this.getElement().sendKeys(value);
    }

    public clearText() : void {
        this.getElement().clear();
    }
}
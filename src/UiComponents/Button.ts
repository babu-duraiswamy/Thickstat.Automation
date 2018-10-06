import { UiElement } from "./UiElement";

export class Button extends UiElement{
    constructor(locatorType : string, locatorValue : string) {
        super(locatorType, locatorValue);
    }

    public submit() : void {
        this.getElement().submit();
    }
}
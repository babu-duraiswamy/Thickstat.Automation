import { by, Locator } from 'protractor';
import { Exception } from '../Exception/Exception';

export class Locate {
    public static readonly byXpath = "xpath";
    public static readonly byCss = "css";
    public static readonly byId = "id";
    public static readonly byName = "name";
    public static readonly byModel = "model";
    public static readonly byBinding = "binding";
    public static readonly byRepeater = "repeater";
    public static readonly byClassName = "classname";
}

export function getLocator(locatorType: string, locatorValue: string) : Locator {
    switch (locatorType) {
        case "xpath":
            return by.xpath(locatorValue);
        case "css":
            return by.css(locatorValue);
        case "id":
            return by.id(locatorValue);
        case "name":
            return by.name(locatorValue);
        case "model":
            return by.model(locatorValue);
        case "binding":
            return by.binding(locatorValue);
        case "repeater":
            return by.repeater(locatorValue);
        case "classname":
            return by.className(locatorValue);
        default:
            throw new Exception("Not a valid locator: " + locatorType);
    }
}
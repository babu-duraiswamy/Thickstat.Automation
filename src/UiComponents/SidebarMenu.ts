import { UiElement } from "./UiElement";
import { Locate } from "../Utilities/Locate";

export class SidebarMenu extends UiElement{

    constructor(menuText : string){
        super(Locate.byXpath, "//ul[@id = 'menu']//span[text() = 'MENUTEXT']//parent::a".replace("MENUTEXT", menuText));
    }

    public select() : Promise<void> {
        var select = new Promise<void>(async (resolve, reject) => {
            try{
                await this.waitTillPresent();
                await this.click();
                resolve();
            }
            catch(error) {
                reject(error);
            }
        })

        return select;
    }
}
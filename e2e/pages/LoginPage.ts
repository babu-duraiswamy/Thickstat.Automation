import { Textbox, Button, Locate, UiElement, BrowserDriver } from '../../index';

export class LoginPage {

    private emailTextbox: Textbox = new Textbox(Locate.byModel, "email");
    private passwordTextbox: Textbox = new Textbox(Locate.byModel, "pass");
    private loginButton: Button = new Button(Locate.byName, "go");
    private headerLogo: UiElement = new UiElement(Locate.byCss, "i.header-logo");

    public async login(email: string, password: string) {
        let login = new Promise<void>((resolve, reject) => {
            try{
                this.emailTextbox.waitTillPresent();
                this.emailTextbox.setText(email);
                this.passwordTextbox.setText(password);
                this.loginButton.click();
                this.headerLogo.waitTillPresent();
                BrowserDriver.waitForUrlMatches("dashboard");
                resolve();
            }
            catch(error){
                reject(error);
            }
        })
        return login;
    }
}
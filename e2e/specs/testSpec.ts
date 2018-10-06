import {} from 'jasmine';
import { BrowserDriver } from '../../src/Utilities/BrowserDriver';
import { LoginPage } from '../pages/Loginpage';
import { HomePage } from '../pages/HomePage';

describe("Chat Window", () => {

    let loginpage : LoginPage = new LoginPage();
    let homePage : HomePage = new HomePage();

    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        let email : string = "babu.duraiswamy@thickstat.com";
        let password : string = "ts@1234";       
        loginpage.login(email, password);
    })

    it("test", () => {
        BrowserDriver.waitForAngularEnabled(true);
        homePage.searchAndSelectDomain("Mavpak - SupplyChain");
        homePage.queryAndGetResponse("order", "count").then((val) => {
            console.log(val);
        })
    })
})


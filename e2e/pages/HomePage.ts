import { DatasetList, ChatWindow } from "../../index";

export class HomePage {
    private dataSetList : DatasetList = new DatasetList();
    private chatWindow : ChatWindow = new ChatWindow();

    public searchAndSelectDomain(searchText : string) {
        this.dataSetList.search(searchText);
        this.dataSetList.select(searchText);
    }

    public queryAndGetResponse(queryText : string, autoCompleteMenuText : string) {
        this.chatWindow.typeAndSelectOption(queryText, autoCompleteMenuText);
        return this.chatWindow.getResponseText();
    }

    public selectHyperlink(text : string) {
        this.chatWindow.selectHyperlinkInTheLatestResponse(text);
    }
}
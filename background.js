var contextSelection = {
  "id": "baseString",
  "title": "Send To Calendar",
  "contexts": ["selection"]

};



chrome.contextMenus.create(contextSelection);

chrome.contextMenus.onClicked.addListener(function(parseData){
  if(parseData.menuItemId == "baseString" && parseData.selectionText){
    window.open( 
      "http://www.google.com/calendar/event?action=TEMPLATE", "_blank"); 
  }
})
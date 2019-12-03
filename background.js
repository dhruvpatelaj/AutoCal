


var contextSelection = {
  "id": "baseString",
  "title": "Send To Calendar",
  "contexts": ["selection"]

};


var title;
var date;
//....

/** BACKEND  */

chrome.contextMenus.create(contextSelection);

chrome.contextMenus.onClicked.addListener(function(parseData){
  
  
  if(parseData.menuItemId == "baseString" && parseData.selectionText){
    
      //PUT your code here
    //thealgo()
      title = "meeting"
    //fillForm(<parameters>)
  }
})

//function thealgo


/** BACKEND  */


//function fillForm(title, location, date, time){


//listener for submit button that calls oauth function


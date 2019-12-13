


var contextSelection = {
  "id": "baseString",
  "title": "Send To Calendar",
  "contexts": ["selection"]

};




var title;
var date;
var time;
var endTime;
var loc;
var description;
//....

/** BACKEND  */




chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create(contextSelection);
});

chrome.contextMenus.onClicked.addListener(function(parseData){


  //DO THIS
  
//DO THIS


  if(parseData.menuItemId == "baseString" && parseData.selectionText){

    var selection = parseData.selectionText;
    eventRecognition(selection)
    //alert(title + "\n" + date + "\n" + time + "\n" + endTime + "\n" + loc);

    chrome.storage.sync.set({'eventTitle': title}, function () {

    });

    chrome.storage.sync.set({'location': loc}, function () {

    });

    chrome.storage.sync.set({'date': date}, function () {

    });

    chrome.storage.sync.set({'startTime': time}, function () {

    });

    chrome.storage.sync.set({'endTime': endTime}, function () {

    });


  }




   chrome.tabs.create({
      url: chrome.extension.getURL('popup.html'),
      active: false
  }, function(tab) {
      // After the tab has been created, open a window to inject the tab
      chrome.windows.create({
          tabId: tab.id,
          type: 'popup',
          focused: true,
          width: 200,
          height: 350
      });




  });

})


function eventRecognition(selection)
{
    titleFinder(selection);
    dateFinder(selection);
    timeFinder(selection);
    locFinder(selection);
    //alert(parseData.selectionText)
}

function titleFinder(selection)
{
  var temp = "";
  var temp2  ="";
  var flag = false;
  title = "";
  var select = selection.toLowerCase();
  var key = select.search(/(app|appointment|meeting|doctor|Club|Lesson|Deadline|Application|Party|Event|Dance|Show|Performance|Concert|Cook|Cooking|Clean|Cleaning|Wash|Washing|Print|Work|Internship|Job|Review|Study|Class|Recitation|Lecture|Lab|Drive|Commute|Fair|Playdate|Interview|Celebration|Hike|Bike|Football|Soccer|Ride|Tutor|Tutoring|Train|Training|Work|Mandatory|Optional|Volunteer|Anniversary|Birthday|Write|Paint|Draw|Practice|Review|Midterm|Test|exam|practicum|quiz|Final|Title|Event|Vacation|trip|retreat|camp|Breakfast|Lunch|Dinner|break)/i);
  if(key != -1){
    var counter = key;
    while(flag == false){
      if(select[counter] == ' '){
        break;
      }
      temp = temp + select[counter];
      counter++;
    }
    var res = select.split(" ");
    for(var i=0;i < res.length;i++){
      if(temp == res[i] && (i-1)!=-1){
        title = res[i-1] + " " + res[i]
        break;
      }
    }
    if(title == ""){
      title = temp;
    }
  }else{
    title = "No event title";
  }
}


function dateFinder(selection){
    date = "";
    var d = selection.match(/(([0-2][0-9])|([1-9]))((\/)|(-))(([3][0-1])|([0-2][0-9])|([1-9]))((\/)|(-))((\d{4})|(\d{2}))/gi); //finds dates in mm/dd/yyy, m/d/yy, and same using dashes
    if(d == null){
      var d = selection.match(/(([0-2][0-9])|([1-9]))((\/)|(-))(([3][0-1])|([0-2][0-9])|([1-9]))/gi); //finds dates in  mm/dd, m/d,
    }
    if(d == null){
      var d = selection.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Jan.|Feb.|Mar.|Apr.|May.|Jun.|Jul.|Aug.|Sep.|Oct.|Nov.|Dec.|January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2}/gi);
    }
    date = d;
}

//helper function for adding 12 to pm times, except for 12pm
function pmAdd(hour)
{
    //hour will be startHour or endHour, in string format
    hour = parseInt(hour);
    //check that it isn't 12pm, otherwise add 12
    if (hour != 12)
    {
        hour = (hour + 12) % 24;
    }
    return hour;
}

function timeFinder(selection)
{
    "use strict";
    //first clear the variables
    time = "";
    endTime = "";

    //add 5 spaces to end of selection to catch edgecase of AM or PM being the last char
    //since I search for a space or period or comma after the AM
    selection = selection + "     ";

    //first search for times in colon format like: 6:30, 9:20, 12:00
    var colonTime = selection.match(/([0-9]{1,2})(:[0-5][0-9])/gi);

    //initialization of the time parts
    var startHour, startMinute, endHour, endMinute;

    //flag for no endtime detected
    var no_endTime;

    var am_index = -1;
    var pm_index = -1;
    var am_index2 = -1;
    var pm_index2 = -1;
    var am_pm_count = 0;

    var time_index = -1;
    var endTime_index = -1;

    //if anything in colon format have been found, then assume
    //them to be the start and end time. If no end time, it returns undefined
    if (colonTime != undefined)
    {
        // startHour = colonTime[0].substring(0,2);
        // startMinute = colonTime[0].substring(3,6);

        //first store time in their appropriate variables
        time = colonTime[0];
        endTime = colonTime[1];

        //if no endtime found, set flag
        if (endTime == undefined)
        {
            no_endTime = true;
        }
        else
        {
            no_endTime = false;
        }

//================this finds locations of all AMs and all PMs, and make sure there arent more than 2 detected============
//I cannot add 0 to the front of (time) 1:00 yet, because I need the index of 1:00, not 01:00,as the latter may not exist

        //find indexes of first AM and first PM, case insensitive
        // these regex searches catch number (maybe a whitespace) before the am, and a space or end after....
        am_index = selection.search(/[0-9](\s?)am(\s|,|.)/gi);
        pm_index = selection.search(/[0-9](\s?)pm(\s|,|.)/gi);


        //finds if there is second AM in text
        if (am_index != -1)
        {
            am_pm_count++;
            //do not recount the first AM, so take substring that definitely wil not include it
            am_index2 = selection.substring(am_index+3).search(/[0-9](\s?)am(\s|,|.)/gi);

            //re-add the substring part removed
            if (am_index2 != -1)
            {
                am_index2 += (am_index+3);
                am_pm_count++;
            }
        }
        //finds if there is second PM in text
        if (pm_index != -1)
        {
            am_pm_count++;
            pm_index2 = selection.substring(pm_index+3).search(/[0-9](\s?)pm(\s|,|.)/gi);
            if (pm_index2 != -1)
            {
                pm_index2 += (pm_index+3);
                am_pm_count++;
            }
        }

        //check that no more than 2 AMs or PMs are detected
        //xxxxxxxxxxx should return empty variables probably?
        if (am_pm_count > 2)
        {
            alert("too many ams or pms");
        }

        time_index = selection.search(time);
        if (no_endTime == false)
        {
            endTime_index = selection.search(endTime);
        }

        //alert(am_index + " " + am_index2 + " " + pm_index + " " + pm_index2 + " " + am_pm_count + " "+ time_index + " " + endTime_index);

//==========================================================================================================

// ++++++++++++++++++++ performing PM +12 calculations and shit ++++++++++++++++++++++++++++++++

        //need colonTime to be 00:00 format, so length of 5
        if (colonTime[0].length != 5)
        {
            colonTime[0] = "0" + colonTime[0];
        }
        if (no_endTime == false && colonTime[1].length != 5)
        {
            colonTime[1] = "0" + colonTime[1];
        }
        startHour = colonTime[0].substring(0, 2);
        startMinute = colonTime[0].substring(3, 6);

        if (no_endTime == false)
        {
            endHour = colonTime[1].substring(0, 2);
            endMinute = colonTime[1].substring(3, 6);
        }

        //testing
        //alert("before: " + startHour + ":" + startMinute + " - " + endHour + ":" + endMinute);

        //PM correction by adding 12 to the startHour or endHour
        //if no pm found, do nothing
        if (pm_index == -1)
        {

        }
        //THERE MUST BE A PM NOW FOR ALL BELOW
        //if no endtime and there is a PM, add 12 to startHour
        else if (no_endTime == true)
        {
            //mod by 24 just in case someone puts 17:00pm or some shit
            startHour = pmAdd(startHour);
            //(parseInt(startHour)+ 12) % 24;
        }
        //thee is a pm and an endtime now for all below

        //if there is NOT a second pm index, then do +12 to both times
        //12:00-2:00pm and 12:00pm-2 will both be true
        else if (pm_index2 != -1)
        {
            startHour = pmAdd(startHour);
            endHour = pmAdd(endHour);
        }
        //if there is 1 pm and no AM and it comes after both times, apply +12 to both
        else if (pm_index2 == -1 && am_index == -1 && pm_index > endTime_index)
        {
            startHour = pmAdd(startHour);
            endHour = pmAdd(endHour);
        }
        //if there is only 1 pm, and it comes before the endtime index, then apply +12 only to startHour
        //11:00pm - 2:00am
        else if (pm_index2 == -1 && pm_index < endTime_index)
        {
            startHour = pmAdd(startHour);
        }
        //there must be an 11:00AM and then a 2PM sort of deal
        //apply +12 to endHour only
        else
        {
            endHour = pmAdd(endHour);
        }
        //testing
        //alert("after: " + startHour + ":" + startMinute + " - " + endHour + ":" + endMinute);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

        //if no endTime found
        if (no_endTime == true)
        {
            //default endtime is 1 hour after start time
            //mod 24 to make sure it is a valid time
            endHour = (parseInt(startHour) + 1) % 24
            endMinute = startMinute;

        }
        //in case the minute times are 60 or greater
        if (parseInt(startMinute) > 59)
        {
            startMinute = parseInt(startMinute) % 60;
            startMinute = startMinute + "0";
        }
        if (parseInt(endMinute) > 59)
        {
            endMinute = parseInt(endMinute) % 60;
            endMinute = endMinute + "0";
        }

        //assemble the final strings!
        time = startHour + ":" + startMinute + ":00";
        endTime = endHour + ":" + endMinute + ":00";

        return;
    }
    else //fuck no colontime found. need to look for AM or PM
    {
        //not finished... sorry

        // this don't do anything yet
        //search() returns-1 if none found

        // var position_of_first_num = selection.search(/[0-9]/gi);
        // var am_pm = selection.search(/am|pm/gi);
        // var space = selection.search(/../gi);
        //
        // var full = selection.match(/[0-9](\s?)(am|pm)/mi);
        // var fullIndex = full.index;

        //time =  "hehexd";
        //full + " : " + fullIndex;
        //position_of_first_num + ", " + am_pm + ", " + space;

        //time = startHour + ":" + startMinute + ":00";
    }
}

function locFinder(selection){
    loc = "";
    var d = selection.match(/([A-Za-z0-9]{0,20}\s(Room|Building|Entrance|exit|hallway|wing|department|tower|Floor|Theater|Museum|High School|Elementary School)\s[A-Za-z0-9]{0,10})/gi);
    if(d == null){
      d = selection.match(/([A-Za-z0-9]{0,20}\s(Middle School|Hall|Stadium|Lab|Laboratory|cafe|coffee|shop|mall|library|restaurant|diner|office|desk|printer)\s[A-Za-z0-9]{0,10})/gi);
    }
    if(d == null){
      d = selection.match(/([A-Za-z0-9]{0,20}\s(complex|park|House|Church|Temple|Mosque|store|bank|beach|pool|lake|court|soccer field|football field|Rec Center)\s[A-Za-z0-9]{0,10})/gi);
    }
    if(d == null){
      d = selection.match(/([A-Za-z0-9]{0,20}\s(field|West|East|North|South|street|avenue|circle|court|drive|road|loop|boulevard|lane|parkway|place|way)\s[A-Za-z0-9]{0,10})/gi);
    }
    if(d == null){
      d = selection.match(/([A-Za-z0-9]{0,20}\s(Hall|Center|Gymnasium|Gym|Museum|Classroom|Lecture Hall|Bar|Club|Lodge|Gun Range|Gallery|Church|Stadium|Hardware Store)\s[A-Za-z0-9]{0,10})/gi);
    }
    if(d == null){
      d = selection.match(/([A-Za-z0-9]{0,20}\s(Mosque|Altar|Factory|Brewery|Cattery|Pet Shop|Pet Store|Dog Races|Horse Races|Home|House|Lab|Laboratory|Mill|Farm)\s[A-Za-z0-9]{0,10})/gi);
    }
    if(d == null){
      d = selection.match(/([A-Za-z0-9]{0,20}\s(Store|Market|Supermarket|Cinema|Opera|Theater|Movies|Awards Show|Doctor|Station|Locksmith|Bakery|Parole Office)\s[A-Za-z0-9]{0,10})/gi);
    }
    if(d == null){
      d = selection.match(/(Room|Building|Entrance|exit|hallway|wing|department|tower|Floor|Theater|Museum|High School|Elementary School|Store|Market|Supermarket|Cinema|Opera|Theater|Movies|Awards Show|Doctor|Station|Locksmith|Bakery|Parole Office|Middle School|Hall|Stadium|Lab|Laboratory|cafe|coffee|shop|mall|library|restaurant|diner|office|desk|printer|complex|park|House|Church|Temple|Mosque|store|bank|beach|pool|lake|court|soccer field|football field|Rec Center|field|West|East|North|South|street|avenue|circle|court|drive|road|loop|boulevard|lane|parkway|place|way|Hall|Center|Gymnasium|Gym|Museum|Classroom|Lecture Hall|Bar|Club|Lodge|Gun Range|Gallery|Church|Stadium|Hardware Store|Mosque|Altar|Factory|Brewery|Cattery|Pet Shop|Pet Store|Dog Races|Horse Races|Home|House|Lab|Laboratory|Mill|Farm|Store|Market|Supermarket|Cinema|Opera|Theater|Movies|Awards Show|Doctor|Station|Locksmith|Bakery|Parole Office)/gi);
    }
    if(d == null){
      loc = "no location";
    }
    else{
      loc = d;
    }
}
/** BACKEND  */


//function fillForm(title, location, date, time){


//listener for submit button that calls oauth function

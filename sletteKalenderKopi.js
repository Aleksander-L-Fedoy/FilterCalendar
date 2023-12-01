const schoolCalendarId = 'example@group.calendar.google.com'; 
const workCalendarId = 'example@group.calendar.google.com'; 


function deleteAllEventsInSchoolCalendar(){
  deleteAllEventsInTargetCalendar(schoolCalendarId);  
}


function deleteAllEventsInWorkCalendar(){
  deleteAllEventsInTargetCalendar(workCalendarId);
}


function deleteAllEventsInTargetCalendar(targetCalendarId) {
  const targetCalendar = CalendarApp.getCalendarById(targetCalendarId);
  
  if (!targetCalendar) {
    Logger.log("Kunne ikke finne kalenderen med ID: " + targetCalendarId);
    return;
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30);

  const events = targetCalendar.getEvents(startDate, endDate);
  
  if (events.length === 0) {
    Logger.log("Ingen hendelser å slette i kalenderen: " + targetCalendarId);
    return;
  }

  for (let i = 0; i < events.length; i++) {
    events[i].deleteEvent();
  }

  Logger.log(events.length + " hendelser slettet fra kalenderen: " + targetCalendarId);
}


function deleteAllEventsInMainCalendar() {
  const mainCalendarId = 'aleksander.fedoy@gmail.com'; // Erstatt med din Google e-postadresse
  const mainCalendar = CalendarApp.getCalendarById(mainCalendarId);
  
  if (!mainCalendar) {
    Logger.log("Kunne ikke finne kalenderen med ID: " + mainCalendarId);
    return;
  }
  
  const startDate = new Date();
  const endDate = new Date();
  
  const events = mainCalendar.getEvents(startDate, endDate);
  
  if (events.length === 0) {
    Logger.log("Ingen hendelser å slette i kalenderen: " + mainCalendarId);
    return;
  }
  
  for (let i = 0; i < events.length; i++) {
    events[i].deleteEvent();
  }
  
  Logger.log(events.length + " hendelser slettet fra kalenderen: " + mainCalendarId);
}

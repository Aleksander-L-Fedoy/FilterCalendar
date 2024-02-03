const sourceCalendarId = 'example@import.calendar.google.com';
const courseCalendarId = 'example@import.calendar.google.com';
const schoolCalendarId = 'example@group.calendar.google.com'; 
const workCalendarId = 'example@group.calendar.google.com'; 

const sourceCalendar = CalendarApp.getCalendarById(sourceCalendarId);
const courseCalendar = CalendarApp.getCalendarById(courseCalendarId);
const schoolCalendar = CalendarApp.getCalendarById(schoolCalendarId);
const workCalendar = CalendarApp.getCalendarById(workCalendarId);

const startDate = new Date();
const endDate = new Date();
endDate.setDate(startDate.getDate() + 30);

function copyFilteredEvents() {
  
  deleteAllEventsInTargetCalendar(schoolCalendarId);
  deleteAllEventsInTargetCalendar(workCalendarId);

  addMeetings();
  addDeadline()

  addSpesificCourse()

  const events = sourceCalendar.getEvents(startDate, endDate);

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const eventStartTime = event.getStartTime();
    const eventEndTime = event.getEndTime();
    const eventTitle = event.getTitle();
    const eventLocation = event.getLocation();

    if (eventTitle.includes("Gruppe 8")) {
      Logger.log(eventTitle + " " + eventStartTime + " " + eventLocation);
      workCalendar.createEvent(eventTitle, eventStartTime, eventEndTime, {
        location: eventLocation,
      });
    } else if (
      !eventTitle.includes("INF101") &&
      !eventTitle.includes("INF265")
    ) {
      Logger.log(eventTitle + " " + eventStartTime + " " + eventLocation);
      schoolCalendar.createEvent(eventTitle, eventStartTime, eventEndTime, {
        location: eventLocation,
      });
    }
  }
}

function addMeetings() {
  const eventTitle = "INF101 Gruppeledermøte";
  const eventLocation = "Kremle, møterommet i fjerde etasje på Høytek";

  let currentDate = new Date();
  while (currentDate <= endDate) {
    if (isTuesday(currentDate) || isFriday(currentDate)) {
      let eventStartTime = new Date(currentDate);
      eventStartTime.setHours(11, 0, 0, 0);

      let eventEndTime = new Date(currentDate);
      eventEndTime.setHours(12, 0, 0, 0);

      Logger.log(eventTitle + " " + eventStartTime + " " + eventLocation);
      workCalendar.createEvent(eventTitle, eventStartTime, eventEndTime, {
        location: eventLocation,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

function addDeadline() {
  const eventTitle = "Frist Quiz i INF265";
  const eventLocation = "MittUiB";

  let currentDate = new Date();
  while (currentDate <= endDate) {
    if (isTuesday(currentDate)) {
      let eventStartTime = new Date(currentDate);
      eventStartTime.setHours(12, 0, 0, 0);

      let eventEndTime = new Date(currentDate);
      eventEndTime.setHours(13, 0, 0, 0);

      Logger.log(eventTitle + " " + eventStartTime + " " + eventLocation);
      schoolCalendar.createEvent(eventTitle, eventStartTime, eventEndTime, {
        location: eventLocation,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

function addSpesificCourse() {
  const events = courseCalendar.getEvents(startDate, endDate);

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const eventStartTime = event.getStartTime();
    const eventEndTime = event.getEndTime();
    const eventTitle = event.getTitle();
    const eventLocation = event.getLocation();

    Logger.log(eventTitle + " " + eventStartTime + " " + eventLocation);
    schoolCalendar.createEvent(eventTitle, eventStartTime, eventEndTime, {
      location: eventLocation,
    });
  }
}

function deleteAllEventsInTargetCalendar(targetCalendarId) {
  const targetCalendar = CalendarApp.getCalendarById(targetCalendarId);
  if (!targetCalendar) {
    Logger.log("Kunne ikke finne kalenderen med ID: " + targetCalendarId);
    return;
  }

  const events = targetCalendar.getEvents(startDate, endDate);

  if (events.length === 0) {
    Logger.log(
      "Ingen hendelser å slette i kalenderen: " + targetCalendar.getName()
    );
    return;
  }

  Logger.log("Antall hendelser som skal slettes: " + events.length);

  for (let i = 0; i < events.length; i++) {
    events[i].deleteEvent();
  }

  Logger.log("Hendelser slettet.");
}

function isMonday(date) {
  return date.getDay() === 1;
}

function isTuesday(date) {
  return date.getDay() === 2;
}

function isWednesday(date) {
  return date.getDay() === 3;
}

function isFriday(date) {
  return date.getDay() === 5;
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

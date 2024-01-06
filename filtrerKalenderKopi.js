function copyFilteredEvents() {
  const sourceCalendarId = 'example@import.calendar.google.com';
  const schoolCalendarId = 'example@group.calendar.google.com'; 
  const workCalendarId = 'example@group.calendar.google.com'; 

  const sourceCalendar = CalendarApp.getCalendarById(sourceCalendarId);
  const schoolCalendar = CalendarApp.getCalendarById(schoolCalendarId);
  const workCalendar = CalendarApp.getCalendarById(workCalendarId);

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30);

  deleteAllEventsInTargetCalendar(schoolCalendarId, startDate, endDate);
  deleteAllEventsInTargetCalendar(workCalendarId, startDate, endDate);

  const events = sourceCalendar.getEvents(startDate, endDate);

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const eventStartTime = event.getStartTime();
    const eventEndTime = event.getEndTime();
    const eventTitle = event.getTitle();
    const eventLocation = event.getLocation();
    const weekNumber = getWeekNumber(eventStartTime);

    if (weekNumber == 45 || weekNumber == 46) {
      if (isTuesday(eventStartTime)) {
        if (
          eventTitle.includes("Gruppe 19") ||
          eventTitle.includes("Gruppe 22")
        ) {
          Logger.log(eventTitle + " " + eventStartTime + " " + eventLocation);
          workCalendar.createEvent(eventTitle, eventStartTime, eventEndTime, {
            location: eventLocation,
          });
        }
      }
    }
    if (!eventTitle.includes("INF100")) {
      Logger.log(eventTitle + " " + eventStartTime + " " + eventLocation);
      schoolCalendar.createEvent(eventTitle, eventStartTime, eventEndTime, {
        location: eventLocation,
      });
    }
  }
}

function deleteAllEventsInTargetCalendar(targetCalendarId, startDate, endDate) {
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

function loadEvents() {
  chrome.storage.local.get(['calendarEvents'], (result) => {
    const events = result.calendarEvents || [];
    events.forEach(event => {  
      calendar.addEvent({
        title: event.title,
        start: new Date(event.start),
        allDay: event.allDay
      });
    });
  });
}

function saveEvents() {
  const events = calendar.getEvents().map(event => ({
    title: event.title,
    start: event.start.toISOString(),
    allDay: event.allDay
  }));
  
  chrome.storage.local.set({ calendarEvents: events });
}

document.getElementById("add").addEventListener("click", () => {
  var dateStr = document.getElementById("date").value; 
  var text = document.getElementById("event").value;   

  var date = new Date(dateStr + 'T00:00:00'); // will be in local time

  if (!isNaN(date.valueOf())) { // valid?
    calendar.addEvent({
      title: text,
      start: date,
      allDay: true
    });

    saveEvents();
    alert('Data Adicionada!');
  } else {
    alert('Data invalida.');
  }

});

document.getElementById("options").addEventListener("click", () => {
  if (document.getElementById("oculto").style.display === "none") {
    document.getElementById("oculto").style.display = "block";
  } else {
    document.getElementById("oculto").style.display = "none";
  }
});



document.addEventListener('DOMContentLoaded', () => {
  loadEvents();
});
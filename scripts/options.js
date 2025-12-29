const eventosPadrao = [
    { title: 'Ano Novo', start: '2000-01-01', allDay: true, recorrente: true },
    { title: 'Dia das Mães', start: '2000-05-11', allDay: true, recorrente: true },
    { title: 'Meu Aniversário', start: '2000-08-20', allDay: true, recorrente: true }, // Mude a data aqui
    { title: 'Natal', start: '2000-12-25', allDay: true, recorrente: true }
];

function loadEvents() {
  const anoAtual = new Date().getFullYear();
  
  chrome.storage.local.get(['calendarEvents'], (result) => {
    let events = result.calendarEvents;

    if (!events || events.length === 0) {
      events = eventosPadrao;
      chrome.storage.local.set({ calendarEvents: events });
    }

    events.forEach(event => {  
      if (event.recorrente) {
        const dataBase = new Date(event.start);
        
        for (let i = -1; i <= 5; i++) {
            const anoAlvo = anoAtual + i;
            
            const dataProjetada = new Date(dataBase);
            dataProjetada.setFullYear(anoAlvo);

            calendar.addEvent({
                title: event.title,
                start: dataProjetada,
                allDay: event.allDay,
                extendedProps: { originalStart: event.start, recorrente: true } 
            });
        }
      } else {
        calendar.addEvent({
            title: event.title,
            start: new Date(event.start),
            allDay: event.allDay,
            extendedProps: { recorrente: false }
        });
      }
    });
  });
}

function saveEvents() {
  const events = calendar.getEvents().map(event => ({
    title: event.title,
    start: event.start.toISOString(),
    allDay: event.allDay,
    recorrente: event.extendedProps?.recorrente || false
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
var calendar;

function capitalize(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    aspectRatio: 2.3,
    // initialDate: '2025-12-07',
    locale: 'pt-br',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true ,
    events: [

    ],
    
    eventClick: function(info) {
      if (confirm(`Deseja excluir "${info.event.title}"?`)) {
        info.event.remove();
        if (typeof saveEvents === 'function') {
          saveEvents();
        }
      }
    },

    dateClick: function(info) {
    let title = prompt('Nome do evento:');
    
      if (title) {
        calendar.addEvent({
          title: capitalize(title),
          start: info.dateStr,
          allDay: info.allDay
        });
        if (typeof saveEvents === 'function') {
            saveEvents();
          }
      }
    },

    eventDrop: function(info) {
      if (typeof saveEvents === 'function') {
        saveEvents();
      }
    },

    eventResize: function(info) {
      if (typeof saveEvents === 'function') {
        saveEvents();
      }
    },

    eventMouseEnter: function(info) {
      info.el.style.transform = 'scale(1.02)';
      info.el.style.transition = 'transform 0.2s';
      info.el.style.cursor = 'pointer';
      info.el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    },

    eventMouseLeave: function(info) {
      info.el.style.transform = 'scale(1)';
      info.el.style.boxShadow = 'none';
    }
  });

  calendar.render();
});

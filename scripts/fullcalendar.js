var calendar;

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
    editable: false,
    selectable: false,
    events: [
    //   {
    //     title: 'Ano Novo',
    //     start: '2025-12-07',
    //     end: '2025-12-10'
    //   },
    //   {
    //     groupId: '999',
    //     title: 'Repeating Event',
    //     start: '2025-12-09T16:00:00'
    //   },
    //   {
    //     groupId: '999',
    //     title: 'Repeating Event',
    //     start: '2025-12-16T16:00:00'
    //   },
    //   {
    //     title: 'Conference',
    //     start: '2025-12-11',
    //     end: '2025-12-13'
    //   },
    //   {
    //     title: 'Meeting',
    //     start: '2025-12-12T10:30:00',
    //     end: '2025-12-12T12:30:00'
    //   },
    //   {
    //     title: 'Lunch',
    //     start: '2025-12-12T12:00:00'
    //   },
    //   {
    //     title: 'Meeting',
    //     start: '2025-12-12T14:30:00'
    //   },
    //   {
    //     title: 'Birthday Party',
    //     start: '2025-12-13T07:00:00'
    //   },
    //   {
    //     title: 'Click for Google',
    //     url: 'https://google.com/',
    //     start: '2025-12-28'
    //   }
    ],
    eventClick: function(info) {
      if (confirm(`Deseja excluir "${info.event.title}"?`)) {
        info.event.remove();
        if (typeof saveEvents === 'function') {
          saveEvents();
        }
      }
    }
  });

  calendar.render();
});

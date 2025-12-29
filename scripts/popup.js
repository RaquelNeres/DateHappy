const dataAtual = new Date();
dataAtual.setHours(0, 0, 0, 0);

function loadEvents() {
  chrome.storage.local.get(['calendarEvents'], (result) => {
    const events = result.calendarEvents || [];
    
    const containerHoje = document.getElementById('today-events');
    const containerSemana = document.getElementById('week-events');

    if(containerHoje) containerHoje.innerHTML = "";
    if(containerSemana) containerSemana.innerHTML = "";

    // Ordena por data 
    events.sort((a, b) => new Date(a.start) - new Date(b.start));

    events.forEach(event => {  
        const dataCalend = new Date(event.start);
        dataCalend.setHours(0, 0, 0, 0);
        
        const difMs = dataCalend - dataAtual;
        const diasDif = Math.ceil(difMs / (1000 * 60 * 60 * 24));

        if (diasDif === 0) {
            if (containerHoje) {
                const div = document.createElement('div');
                div.textContent = event.title;
                containerHoje.appendChild(div);
            }
        } 
        
        else if (diasDif > 0 && diasDif < 7) {
            if (containerSemana) {
                let classe = '';
                event.title = event.title.charAt(0).toUpperCase() + event.title.slice(1);
                
                if (event.title === 'Casamento') classe = 'modo-casamento';
                else if (event.title === 'Aniversário') classe = 'modo-aniversario';
                else if (event.title === 'Ano Novo') classe = 'modo-anonovo';
                else if (event.title === 'Natal') classe = 'modo-natal';
                else if (event.title === 'Confraternização') classe = 'evento-confraternizacao';
                else if (event.title === 'Festa') classe = 'evento-festa';
                else if (event.title === 'Feriado') classe = 'evento-feriado';
                else{
                    classe = 'evento';
                }
                
                const div = document.createElement('div');
                div.className = `evento-item ${classe}`;
                div.innerText = `${event.title} (em ${diasDif} dias)`;
                containerSemana.appendChild(div);
            }
        }
    });
    
    if (containerHoje.innerText === "") {
        containerHoje.textContent = "Nenhum evento hoje.";
        containerHoje.style.padding = "30px";
    }
    if (containerSemana.innerText === "") {
        containerSemana.textContent = "Nada planejado para os próximos dias.";
        containerSemana.classList = 'evento-week';
    }

    Datas();
  });
}

function Datas() {
    const container = document.getElementById('today-events');
    
    if (!container) return;
    const textoConteudo = container.innerText.charAt(0).toUpperCase() + container.innerText.slice(1);
    container.classList.add('gifs');

    if (textoConteudo.includes('Natal')) {
        container.classList.add('modo-natal');
        container.textContent = "";
    } else if (textoConteudo.includes('Carnaval')) {
        container.classList.add('modo-carnaval');
        container.textContent = "";
    } else if (textoConteudo.includes('Dia Das Maes')) {
        container.classList.add('modo-mae');
        container.textContent = "";
    } else if (textoConteudo.includes('Dia Dos Pais')) {
        container.classList.add('modo-pai');
        container.textContent = "";
    } else if (textoConteudo.includes('Ano Novo')) {
        container.classList.add('modo-anonovo');
        container.textContent = "";
    } else if (textoConteudo.includes('Pascoa')) {
        container.classList.add('modo-pascoa');
        container.textContent = "";
    } else if (textoConteudo.includes('Halloween')) {
        container.classList.add('modo-halloween');
        container.textContent = "";
    } else if (textoConteudo.includes('Casamento')) {
        container.classList.add('modo-casamento');
        container.textContent = "";
    } else if (textoConteudo.includes('Feriado')) {
        container.classList.add('evento-feriado');
        // container.textContent = "";
    } else if (textoConteudo.includes('Festa')) {
        container.classList.add('evento-festa');
        // container.textContent = "";
    }  else if (textoConteudo.includes('Confraternização')) {
        container.classList.add('evento-confraternizacao');
        // container.textContent = "";
    } else if (textoConteudo.includes('Aniversario')) {
        container.classList.add('modo-aniversario');
        container.textContent = "";
    } 
    else{
        container.style.padding = "30px";
        container.style.color = "white";
        container.classList.add('evento-today')
    }
}

loadEvents();
(function() {
    verificarTodosEventos();

    function verificarTodosEventos() {
        const agora = new Date();
        chrome.storage.local.get(['calendarEvents'], (result) => {
            const events = result.calendarEvents || [];
            events.forEach(event => verificarEvento(event, agora));
        });
    }

    function verificarEvento(event, agora) {
        const dataEvento = new Date(event.start);
        
        if (isMesmoDia(dataEvento, agora) && event.allDay) {
            const config = getNotificationConfig(event.title);
            if (config) {
                const idNotificacao = `dia-${event.title}-${dataEvento.getDate()}`;
                mostrarNotificacao(config, idNotificacao, config.tipo || 'esquerda-direita');
            }
        }
        
        verificarLembreteHora(event, agora);
    }

    function isMesmoDia(data1, data2) {
        return data1.getDate() === data2.getDate() &&
               data1.getMonth() === data2.getMonth() &&
               data1.getFullYear() === data2.getFullYear();
    }

    function verificarLembreteHora(event, agora) {
        if (event.allDay) return;

        const dataEvento = new Date(event.start);
        const diferencaMs = dataEvento - agora;
        const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
        
        const configCoelho = {
            gif: 'coelho.gif', 
            cor: '#ff6b6b', 
            tipo: 'fixo'
        };

        if (diferencaMinutos >= 58 && diferencaMinutos <= 62) {
            mostrarNotificacao({
                ...configCoelho,
                mensagem: `Falta 1 hora: ${event.title}`
            }, `hora-60-${event.title}`, 'fixo');
        }
        else if (diferencaMinutos >= 28 && diferencaMinutos <= 32) {
            mostrarNotificacao({
                ...configCoelho,
                mensagem: `Corre! 30 min: ${event.title}`
            }, `hora-30-${event.title}`, 'fixo');
        }
        else if (diferencaMinutos >= -5 && diferencaMinutos <= 5) {
             mostrarNotificacao({
                ...configCoelho,
                mensagem: `É AGORA: ${event.title}`,
                cor: '#ff0000' 
            }, `hora-agora-${event.title}`, 'fixo');
        }
    }

    function getNotificationConfig(titulo) {
        const tituloLower = titulo.toLowerCase();
        
        const configs = {
            'natal': { mensagem: 'Feliz Natal!', gif: 'rena.gif', tipo: 'direita-esquerda' },
            'ano novo': { mensagem: 'Feliz Ano Novo!', gif: 'fogos.gif', tipo: 'esquerda-direita' },
            'festa': { mensagem: 'Hora da Festa!', gif: 'cat.gif', tipo: 'esquerda-direita' },
            'pascoa': { mensagem: 'Feliz Páscoa!', gif: 'easter.gif', tipo: 'direita-esquerda'},
            'halloween': { mensagem: 'Feliz Halloween!', gif: 'abobora.gif', tipo: 'direita-esquerda'},
            'dia das maes': { mensagem: 'Feliz Dia das Mães!', gif: 'mae.gif', tipo: 'mae'},
            'dia dos pais': { mensagem: 'Feliz Dia dos Pais!', gif: 'dad.gif', tipo: 'esquerda-direita'},
            'carnaval': { mensagem: 'Carnaval!', gif: 'carnaval1.gif', tipo: 'esquerda-direita'}
        };
        
        for (let [chave, config] of Object.entries(configs)) {
            if (tituloLower.includes(chave)) return config;
        }
        
        return {
            mensagem: `Hoje: ${titulo}`,
            gif: 'cat.gif',
            tipo: 'esquerda-direita'
        };
    }

    function mostrarNotificacao(config, idUnico, tipo) {
        if (document.getElementById(idUnico)) return;

        const runnerWrapper = document.createElement('div');
        runnerWrapper.id = idUnico;

        const speechBubble = document.createElement('div');
        speechBubble.className = 'event-speech';
        speechBubble.innerText = config.mensagem;

        const img = document.createElement('img');
        img.src = chrome.runtime.getURL(`gifs/${config.gif}`);

        runnerWrapper.appendChild(speechBubble);
        runnerWrapper.appendChild(img);
        document.body.appendChild(runnerWrapper);

        if (tipo === 'fixo') {
            runnerWrapper.className = 'event-notification-fixo';
            
            setTimeout(() => {
                if (document.body.contains(runnerWrapper)) {
                    runnerWrapper.remove();
                }
            }, 10000); // 10 seg
            
        } else if (tipo == 'mae'){
            runnerWrapper.className = 'event-mae-fixo';
            
            setTimeout(() => {
                if (document.body.contains(runnerWrapper)) {
                    runnerWrapper.remove();
                }
            }, 10000); // 10 seg

        } else if (tipo === 'direita-esquerda') {
            runnerWrapper.className = 'event-notification-direita';
            
            setTimeout(() => {
                if (document.body.contains(runnerWrapper)) {
                    runnerWrapper.remove();
                }
            }, 610000); // 10 min
            
        } else {
            runnerWrapper.className = 'event-notification-esquerda';
            
            const notificacoesAtivas = document.querySelectorAll('.event-notification-esquerda');
            const quantidade = notificacoesAtivas.length - 1;
            const alturaBottom = 20 + (quantidade * 90);
            runnerWrapper.style.bottom = `${alturaBottom}px`;
            
            setTimeout(() => {
                if (document.body.contains(runnerWrapper)) {
                    runnerWrapper.remove();
                }
            }, 610000); // 10 min
        }
    }
    // 5 min
    setInterval(verificarTodosEventos, 5 * 60 * 1000);
})();
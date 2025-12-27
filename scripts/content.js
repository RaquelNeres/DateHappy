(function() {
    // Data de hoje em horário local
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth();
    const anoHoje = hoje.getFullYear();

    chrome.storage.local.get(['calendarEvents'], (result) => {
        const events = result.calendarEvents || [];
        
        const eventoHoje = events.find(event => {
            // Cria Date a partir do ISO string
            const dataEvento = new Date(event.start);
            
            // Pega dia/mês/ano do evento
            const diaEvento = dataEvento.getDate();
            const mesEvento = dataEvento.getMonth();
            const anoEvento = dataEvento.getFullYear();

            // Compara dia, mês e ano
            const ehHoje = (diaEvento === diaHoje && mesEvento === mesHoje && anoEvento === anoHoje);
            const ehNatal = event.title.toLowerCase().includes('natal');
            
            return ehHoje && ehNatal;
        });

        if (eventoHoje) {
            mostrarRena();
        };
    });

    function mostrarRena() {
        try {            
            const runnerWrapper = document.createElement('div');
            runnerWrapper.className = 'natal-runner';

            const speechBubble = document.createElement('div');
            speechBubble.className = 'natal-speech';
            speechBubble.innerText = 'Feliz Natal!';

            const img = document.createElement('img');
            // IMPORTANTE: O arquivo deve se chamar "rena.gif" (sem espaços)
            img.src = chrome.runtime.getURL("gifs/rena.gif"); 

            runnerWrapper.appendChild(speechBubble);
            runnerWrapper.appendChild(img);
            document.body.appendChild(runnerWrapper);
        } catch (e) {
            console.error("DateHappy: ❌ Erro ao criar a rena:", e);
        }
    }
})();
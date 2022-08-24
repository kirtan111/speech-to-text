const recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new recognitionSvc();

document.querySelector('#start').addEventListener('click', () => {
    const startBtn = document.querySelector('#start');
    recognition.lang = document.querySelector('#lang').value || 'en-GB';
    recognition.continuous = true;

    recognition.onresult = (event) => {
        const accumulatedResult = [];
        for (const result of event.results) {
            accumulatedResult.push(`${result[0].transcript}`);
        }
        document.querySelector('#transcription').innerHTML = accumulatedResult;
    };

    if (startBtn.classList.contains('listening')) recognition.stop();
    else {
        recognition.start();
    }
    startBtn.classList.toggle('listening');
    // audiostart
    // audioend
});

document.querySelector('#transcription').addEventListener('click', (e) => {
    navigator.clipboard.writeText(e.target.innerText).then(() => {
        document.getElementById('tooltip').classList.add('active');
        setTimeout(() => {
            document.getElementById('tooltip').classList.remove('active');
        }, 3100);
    });

});

setTimeout(() => {
    document.getElementById('tooltip').classList.remove('init');
}, 3100);
function calcularMagnitude(amplitude, deltaT) {
    return Math.log10(amplitude) + 3 * Math.log10(8 * deltaT) - 2.92;
}

function calcularEnergia(magnitude) {
    const E0 = 7 * Math.pow(10, -3);
    return E0 * Math.pow(10, 1.5 * magnitude);
}

function obterEfeitos(magnitude) {
    if (magnitude < 3.5) {
        return "Geralmente não sentido, mas gravado.";
    } else if (magnitude <= 5.4) {
        return "Às vezes sentido, mas raramente causa danos.";
    } else if (magnitude <= 6.0) {
        return "No máximo causa pequenos danos a prédios bem construídos, mas pode danificar seriamente casas mal construídas em regiões próximas.";
    } else if (magnitude <= 6.9) {
        return "Pode ser destrutivo em áreas em torno de até 100 km do epicentro.";
    } else if (magnitude <= 7.9) {
        return "Grande terremoto. Pode causar sérios danos numa grande faixa.";
    } else { 
        return "Enorme terremoto. Pode causar graves danos em muitas áreas mesmo que estejam a centenas de quilômetros.";
    }
}

const amplitudeInput = document.getElementById('amplitude');
const deltaTInput = document.getElementById('deltaT');
const calculateBtn = document.getElementById('calculateBtn');
const resultsDiv = document.getElementById('results');
const errorDiv = document.getElementById('error-message');

const magnitudeValueSpan = document.getElementById('magnitudeValue');
const energiaValueSpan = document.getElementById('energiaValue');
const efeitosValueP = document.getElementById('efeitosValue');

calculateBtn.addEventListener('click', () => {
    resultsDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');

    const amplitude = parseFloat(amplitudeInput.value);
    const deltaT = parseFloat(deltaTInput.value);

    if (isNaN(amplitude) || isNaN(deltaT) || amplitude <= 0 || deltaT <= 0) {
        errorDiv.textContent = "Erro: Por favor, insira valores numéricos positivos para ambos os campos.";
        errorDiv.classList.remove('hidden');
        return;
    }

    const magnitude = calcularMagnitude(amplitude, deltaT);
    const energia = calcularEnergia(magnitude);
    const efeitos = obterEfeitos(magnitude);

    magnitudeValueSpan.textContent = `${magnitude.toFixed(2)} na Escala Richter`;
    energiaValueSpan.textContent = `${Math.round(energia).toLocaleString('pt-BR')} kWh`;
    efeitosValueP.textContent = efeitos;

    resultsDiv.classList.remove('hidden');
});

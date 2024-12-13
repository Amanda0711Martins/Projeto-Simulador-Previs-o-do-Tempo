const cidadeSelect = document.getElementById('cidade');
const resultadoDiv = document.getElementById('resultado');
const apiKey = 'YOUR_API_KEY'; // Substitua pela sua chave da OpenWeatherMap

function buscarPrevisao() {
    const cidade = cidadeSelect.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperatura = data.main.temp;
            const condicao = data.weather[0].main;

            resultadoDiv.innerHTML = `
                <h2>${cidade}</h2>
                <p>Temperatura: ${temperatura}°C</p>
                <p>Condição: ${condicao}</p>
            `;

            // Mudar o fundo de acordo com a condição
            document.body.classList.remove('sol', 'chuva');
            document.body.classList.add(condicao.toLowerCase());
        })
        .catch(error => {
            console.error('Erro ao buscar a previsão:', error);
        });
}
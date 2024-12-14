document.addEventListener('DOMContentLoaded', () => {
    const cidadeSelect = document.getElementById('cidade');
    const resultadoDiv = document.getElementById('resultado');

    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            // Preenche a lista de cidades no select
            data.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.cidade;
                option.textContent = cidade.cidade;
                cidadeSelect.appendChild(option);
            });

            // Função para buscar a previsão
            function buscarPrevisao() {
                const cidadeSelecionada = cidadeSelect.value;
                const previsao = data.find(cidade => cidade.cidade === cidadeSelecionada);

                if (previsao) {
                    resultadoDiv.innerHTML = `
                        <div class="previsao ${previsao.condicao.toLowerCase()}">
                            <h2>${previsao.cidade}</h2>
                            <img src="icons/${previsao.condicao.toLowerCase()}.png" alt="${previsao.condicao}">
                            <p>Temperatura: ${previsao.temperatura}°C</p>
                            <p>Condição: ${previsao.condicao}</p>
                        </div>
                    `;
                } else {
                    resultadoDiv.innerHTML = 'Cidade não encontrada';
                }
            }

            // Adiciona o evento de clique ao botão
            const botaoBuscar = document.querySelector('button');
            botaoBuscar.addEventListener('click', buscarPrevisao);
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
            resultadoDiv.innerHTML = 'Erro ao carregar os dados da previsão.';
        });
});
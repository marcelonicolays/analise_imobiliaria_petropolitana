document.getElementById('propertyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        cidade: document.getElementById('cidade').value,
        bairro: document.getElementById('bairro').value,
        tamanho: parseFloat(document.getElementById('tamanho').value),
        quartos: document.getElementById('quartos').value,
        banheiros: document.getElementById('banheiros').value,
        iptu: parseFloat(document.getElementById('iptu').value),
        condominio: parseFloat(document.getElementById('condominio').value)
    };

    // Simular cálculo do valor do imóvel
    const valorImovel = calcularValorImovel(formData);
    
    // Exibir resultados
    document.getElementById('resultValue').textContent = formatarMoeda(valorImovel);
    document.getElementById('resultLocation').textContent = `${formData.cidade} / ${formData.bairro}`;
    document.getElementById('resultSize').textContent = `${formData.tamanho} m²`;
    document.getElementById('resultRooms').textContent = `${formData.quartos} quartos, ${formData.banheiros} banheiros`;
    document.getElementById('resultCosts').textContent = formatarMoeda(formData.iptu + formData.condominio);
    
    // Mostrar container de resultados
    document.getElementById('resultContainer').style.display = 'block';
    
    // Rolar para o resultado
    document.getElementById('resultContainer').scrollIntoView({ behavior: 'smooth' });
});

// Adicionar evento para o botão "Novo Cálculo"
document.getElementById('btnNewCalculation').addEventListener('click', function() {
    // Limpar o formulário
    document.getElementById('propertyForm').reset();
    
    // Definir cidade como Petrópolis novamente
    document.getElementById('cidade').value = "Petrópolis";
    
    // Esconder a seção de resultados
    document.getElementById('resultContainer').style.display = 'none';
    
    // Rolar de volta para o topo do formulário
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
});

// Função simulada para cálculo do valor do imóvel em Petrópolis
function calcularValorImovel(dados) {
    // Lógica de cálculo adaptada para a realidade de Petrópolis
    // Valores base mais realistas para a região
    
    let valorBasePorM2;
    
    // Ajuste do valor base por bairro (valores ilustrativos)
    switch(dados.bairro) {
        case 'Centro':
            valorBasePorM2 = 8000;
            break;
        case 'Quitandinha':
            valorBasePorM2 = 7500;
            break;
        case 'Itaipava':
            valorBasePorM2 = 6000;
            break;
        case 'Corrêas':
            valorBasePorM2 = 5500;
            break;
        case 'Alto da Serra':
            valorBasePorM2 = 5000;
            break;
        default:
            valorBasePorM2 = 4500;
    }
    
    const ajusteQuartos = (parseInt(dados.quartos) - 2) * 0.08; // +8% por quarto acima de 2
    const ajusteBanheiros = (parseInt(dados.banheiros) - 1) * 0.05; // +5% por banheiro acima de 1
    
    // Ajuste por IPTU e condomínio (valores mais altos indicam localização melhor)
    const ajusteCustos = (dados.iptu + dados.condominio) > 1500 ? 0.15 : 0;
    
    const valorCalculado = dados.tamanho * valorBasePorM2 * (1 + ajusteQuartos + ajusteBanheiros + ajusteCustos);
    
    // Adicionar variação aleatória para simular diferentes avaliações
    const variacao = 0.85 + (Math.random() * 0.3); // Entre 85% e 115% do valor
    return Math.round(valorCalculado * variacao);
}

// Função para formatar valores em moeda brasileira
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}
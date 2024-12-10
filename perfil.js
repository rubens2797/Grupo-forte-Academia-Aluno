// Função para alterar o objetivo do usuário
function alterarObjetivo() {
    const novoObjetivo = document.getElementById('novo-objetivo').value;
    if (novoObjetivo.trim() !== "") {
        document.getElementById('objetivo').textContent = "Objetivo: " + novoObjetivo;
        alert("Objetivo alterado com sucesso!");
    } else {
        alert("Por favor, digite um objetivo válido.");
    }
    document.getElementById('novo-objetivo').value = "";
}

// Função para registrar as medidas corporais
function registrarMedidas() {
    const peso = document.getElementById('peso-input').value;
    const cintura = document.getElementById('cintura-input').value;
    const quadril = document.getElementById('quadril-input').value;

    if (peso && cintura && quadril) {
        const medidasRegistro = document.getElementById('ultima-medida');
        medidasRegistro.innerHTML = `
            Peso: ${peso} kg<br>
            Cintura: ${cintura} cm<br>
            Quadril: ${quadril} cm
        `;
        alert("Medidas registradas com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos de medidas.");
    }
}

// Função para registrar o consumo de água
function registrarAgua() {
    const aguaConsumida = document.getElementById('agua-consumida').value;

    if (aguaConsumida && !isNaN(aguaConsumida)) {
        document.getElementById('agua-registrada').innerHTML = `${aguaConsumida} ml`;
        alert("Consumo de água registrado com sucesso!");
    } else {
        alert("Por favor, insira a quantidade de água consumida.");
    }
}

// Função para registrar as calorias consumidas
function registrarAlimentacao() {
    const calorias = document.getElementById('calorias').value;

    if (calorias && !isNaN(calorias)) {
        alert(`Calorias consumidas registradas: ${calorias}`);
    } else {
        alert("Por favor, insira a quantidade de calorias consumidas.");
    }
}

// Função para salvar notificações
function salvarNotificacoes() {
    const lembreteHidratacao = document.getElementById('notificacao-hidratacao').checked;
    alert(lembreteHidratacao ? "Lembrete de hidratação ativado!" : "Lembrete de hidratação desativado.");
}

// Função para registrar suplemento
function registrarSuplemento() {
    const suplemento = document.getElementById('suplemento').value;
    const dose = document.getElementById('dose').value;

    if (suplemento && dose) {
        alert(`Suplemento registrado: ${suplemento} - Dose: ${dose}`);
    } else {
        alert("Por favor, preencha todos os campos de suplemento.");
    }
}

// Função para registrar lesão
function registrarLesao() {
    const lesao = document.getElementById('lesao').value;
    if (lesao.trim() !== "") {
        alert(`Lesão registrada: ${lesao}`);
    } else {
        alert("Por favor, descreva qualquer sintoma ou lesão.");
    }
}

// Função para gerar relatório
function gerarRelatorio() {
    const relatorio = `
        <ul>
            <li>Total de calorias queimadas: 1200 kcal</li>
            <li>Total de treinos realizados: 5</li>
            <li>Progresso do peso: 75kg → 70kg (meta atingida)</li>
        </ul>
    `;
    document.getElementById('relatorio-resultado').innerHTML = relatorio;
}

// Função para visualizar histórico
function visualizarHistorico() {
    const historico = `
        <ul>
            <li>01/11/2024: Peso - 75kg, Medidas - 95cm</li>
            <li>08/11/2024: Peso - 74kg, Medidas - 94cm</li>
            <li>15/11/2024: Peso - 73kg, Medidas - 93cm</li>
        </ul>
    `;
    document.getElementById('historico-resultado').innerHTML = historico;
}

// Função para ver vídeos
function verVideos() {
    window.location.href = "https://www.youtube.com/results?search_query=treino+musculação";
}

// Função para registrar a meta de peso
function registrarMeta() {
    const metaPeso = document.getElementById('meta-peso').value;
    if (metaPeso && !isNaN(metaPeso)) {
        alert(`Meta de peso definida: ${metaPeso} kg`);
    } else {
        alert('Por favor, insira um peso válido para sua meta.');
    }
}

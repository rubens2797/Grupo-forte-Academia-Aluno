// Dados fictícios dos pagamentos de uma academia
const dadosPagamentos = {
    "123.456.789-00": {
        futuros: [
            { descricao: "Mensalidade Janeiro", valor: "150,00", vencimento: "2024-12-01", formaPagamento: "Boleto", id: 1 },
            { descricao: "Mensalidade Fevereiro", valor: "150,00", vencimento: "2024-02-01", formaPagamento: "Cartão de Crédito", id: 5 },
            { descricao: "Mensalidade Março", valor: "150,00", vencimento: "2024-03-01", formaPagamento: "PIX", id: 6 }
        ],
        vencidos: [
            { descricao: "Mensalidade Outubro", valor: "150,00", vencimento: "2024-10-01", formaPagamento: "Boleto", id: 2 }
        ],
        pagos: [
            { descricao: "Mensalidade Setembro", valor: "150,00", pagamento: "2024-09-10", formaPagamento: "Cartão de Débito", id: 3 }
        ]
    },
    "987.654.321-00": {
        futuros: [
            { descricao: "Mensalidade Novembro", valor: "150,00", vencimento: "2024-11-05", formaPagamento: "Cartão de Crédito", id: 4 }
        ],
        vencidos: [],
        pagos: []
    }
};

// Função para validar o formato do CPF
function validarCpf(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato: XXX.XXX.XXX-XX
    return regex.test(cpf);
}

// Função para verificar o CPF e exibir os pagamentos pendentes
function verificarCpf() {
    const cpf = document.getElementById('cpf').value.trim();
    const erroCpf = document.getElementById('erro-cpf');
    const cpfNaoEncontrado = document.getElementById('cpf-nao-encontrado');
    const infoPagamento = document.getElementById('informacao-pagamento');

    // Limpar mensagens de erro
    erroCpf.style.display = 'none';
    cpfNaoEncontrado.style.display = 'none';
    infoPagamento.style.display = 'none';

    // Validar CPF
    if (!validarCpf(cpf)) {
        erroCpf.style.display = 'block';
        return;
    }

    // Verificar se o CPF existe
    if (!dadosPagamentos[cpf]) {
        cpfNaoEncontrado.style.display = 'block';
        return;
    }

    // Exibir informações de pagamentos
    exibirPagamentos(cpf);
}

// Função para exibir boletos pagos, futuros e vencidos
function exibirPagamentos(cpf) {
    const futurosTable = document.getElementById('futuros-table').getElementsByTagName('tbody')[0];
    const vencidosTable = document.getElementById('vencidos-table').getElementsByTagName('tbody')[0];
    const pagosTable = document.getElementById('pagos-table').getElementsByTagName('tbody')[0];

    // Limpar as tabelas
    futurosTable.innerHTML = '';
    vencidosTable.innerHTML = '';
    pagosTable.innerHTML = '';

    const pagamentos = dadosPagamentos[cpf];

    // Função para adicionar uma linha à tabela
    function adicionarLinha(tabela, descricao, valor, vencimento, formaPagamento, id) {
        const row = tabela.insertRow();
        row.insertCell(0).textContent = descricao;
        row.insertCell(1).textContent = valor;
        row.insertCell(2).textContent = vencimento;
        row.insertCell(3).textContent = formaPagamento;

        const acoesCell = row.insertCell(4);
        const visualizarBtn = document.createElement('button');
        visualizarBtn.textContent = 'Ver Boleto';
        visualizarBtn.onclick = function() {
            mostrarBoleto(descricao, valor, vencimento, id);
        };
        acoesCell.appendChild(visualizarBtn);

        if (tabela === futurosTable || tabela === vencidosTable) {
            const pagarBtn = document.createElement('button');
            pagarBtn.textContent = 'Pagar na Unidade';
            pagarBtn.onclick = function() {
                pagarNaUnidade(cpf, id);
            };
            acoesCell.appendChild(pagarBtn);
        }
    }

    // Exibir boletos futuros
    pagamentos.futuros.forEach(boleto => {
        adicionarLinha(futurosTable, boleto.descricao, boleto.valor, boleto.vencimento, boleto.formaPagamento, boleto.id);
    });

    // Exibir boletos vencidos
    pagamentos.vencidos.forEach(boleto => {
        adicionarLinha(vencidosTable, boleto.descricao, boleto.valor, boleto.vencimento, boleto.formaPagamento, boleto.id);
    });

    // Exibir boletos pagos
    pagamentos.pagos.forEach(boleto => {
        adicionarLinha(pagosTable, boleto.descricao, boleto.valor, boleto.pagamento, boleto.formaPagamento, boleto.id);
    });

    // Mostrar as informações
    document.getElementById('informacao-pagamento').style.display = 'block';
}

// Função para mostrar o boleto no modal
function mostrarBoleto(descricao, valor, vencimento, id) {
    document.getElementById('boleto-descricao').textContent = descricao;
    document.getElementById('boleto-valor').textContent = valor;
    document.getElementById('boleto-vencimento').textContent = vencimento;

    // Gerar código de barras (número fictício do boleto)
    const numeroBoleto = "12345678901234567890123456789012345678901234567890"; // Exemplo de número do boleto
    JsBarcode("#boleto-codigo-barra", numeroBoleto, {
        format: "CODE128", // Padrão de código de barras usado para boletos
        displayValue: false, // Não exibir o número abaixo do código de barras
        width: 2,  // Largura das barras
        height: 50,  // Altura do código de barras
        margin: 10  // Margem ao redor do código de barras
    });

    // Exemplo de URL de boleto (poderia ser uma URL dinâmica)
    const boletoUrl = 'https://via.placeholder.com/400x200?text=Boleto+de+Exemplo+ID+' + id;
    document.getElementById('boleto-imagem').src = boletoUrl;

    // Exibir o modal
    document.getElementById('boleto-modal').style.display = 'flex';
}

// Função para fechar o modal do boleto
function fecharBoleto() {
    document.getElementById('boleto-modal').style.display = 'none';
}

// Função para marcar o boleto como pago na unidade
function pagarNaUnidade(cpf, id) {
    const formaPagamento = document.getElementById('formaPagamento').value;  // Captura a forma de pagamento selecionada
    const pagamentos = dadosPagamentos[cpf];
    const boletoIndex = pagamentos.futuros.findIndex(boleto => boleto.id === id) || pagamentos.vencidos.findIndex(boleto => boleto.id === id);

    if (boletoIndex > -1) {
        const boleto = pagamentos.futuros.splice(boletoIndex, 1)[0] || pagamentos.vencidos.splice(boletoIndex, 1)[0];
        boleto.pagamento = new Date().toISOString().split('T')[0];
        boleto.formaPagamento = formaPagamento;  // Atualiza a forma de pagamento para o valor selecionado
        pagamentos.pagos.push(boleto);

        exibirPagamentos(cpf); // Atualiza a visualização dos pagamentos
    }
}

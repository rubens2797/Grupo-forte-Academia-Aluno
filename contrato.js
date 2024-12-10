// script.js

function assinarContrato() {
    const signature = document.getElementById("signature").value;
    const agreementChecked = document.getElementById("agreement").checked;

    // Verificar se o aluno digitou o nome e se ele concordou com os termos
    if (signature.trim() === "") {
        alert("Por favor, digite seu nome para assinar.");
        return;
    }

    if (!agreementChecked) {
        alert("Você deve concordar com os termos e condições antes de assinar.");
        return;
    }

    // Simular contrato assinado
    const contratoAssinado = `
        Contrato de Prestação de Serviços de Academia
        -------------------------------------------
        Contrato assinado por: ${signature}
        
        Termos e condições:
        - O aluno se compromete a frequentar regularmente a academia...
        - O valor da mensalidade é de R$ 150,00...
        - O aluno concorda com o cancelamento e regras da academia...

        (Outros termos do contrato)
    `;

    // Exibir contrato assinado na tela
    document.getElementById("signed-contract-text").textContent = contratoAssinado;

    // Mostrar a seção de download
    document.getElementById("download-section").style.display = "block";
}

function baixarContrato() {
    const assinatura = document.getElementById("signature").value;
    const contratoAssinado = `
        Contrato de Prestação de Serviços de Academia
        -------------------------------------------
        Contrato assinado por: ${assinatura}
        
        Termos e condições:
        - O aluno se compromete a frequentar regularmente a academia...
        - O valor da mensalidade é de R$ 150,00...
        - O aluno concorda com o cancelamento e regras da academia...

        (Outros termos do contrato)
    `;

    // Criar um Blob com o contrato assinado
    const blob = new Blob([contratoAssinado], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Criar um link para o download
    const link = document.createElement("a");
    link.href = url;
    link.download = "contrato_assinado.txt";
    
    // Simular o clique para iniciar o download
    link.click();

    // Limpar o URL criado
    URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
    const groupList = document.querySelectorAll('#group-list li');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const mediaInput = document.getElementById('media-input');
    const sendMediaBtn = document.getElementById('send-media-btn');
    const chatbotBtn = document.getElementById('chatbot-btn');
    let currentGroup = 'Musculação';  // Grupo padrão ao iniciar

    // Alterar grupo de treino ao clicar
    groupList.forEach(group => {
        group.addEventListener('click', () => {
            currentGroup = group.getAttribute('data-group');
            chatMessages.innerHTML = `<div class="system-message">Você entrou no grupo: ${currentGroup}</div>`;
        });
    });

    // Enviar mensagem de texto
    sendMessageBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            appendMessage('Você', message);
            messageInput.value = '';  // Limpa o campo
            // Aqui você poderia emitir a mensagem para um servidor ou API, se necessário
        }
    });

    // Função para adicionar uma mensagem no chat
    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${sender}</strong>: ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;  // Rolagem automática para o final
    }

    // Enviar mídia (imagem ou vídeo)
    sendMediaBtn.addEventListener('click', () => {
        mediaInput.click();  // Simula o clique no input de mídia
    });

    mediaInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            const mediaElement = document.createElement(file.type.startsWith('image') ? 'img' : 'video');
            mediaElement.src = fileURL;
            mediaElement.controls = true;  // Para vídeos
            mediaElement.classList.add('media-message');
            chatMessages.appendChild(mediaElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;  // Rolagem automática
        }
    });

    // Chatbot interação
    chatbotBtn.addEventListener('click', () => {
        appendMessage('Chatbot', 'Em que posso te ajudar?');
    });
});

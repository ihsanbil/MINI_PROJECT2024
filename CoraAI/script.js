const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion-list .suggestion");
const toggleThemeButton = document.querySelector("#toggle-theme-button");
const deleteChatButton = document.querySelector("#delete-chat-button");

let userMessage = null;
let isResponseGenerating = false;

// API Keys dan URL
const API_KEY = "AIzaSyBZ0YW4oYH7WWa75I-ZWfsK7bgfYWhDl-8";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Load data dari localStorage
const loadLocalStorageData = () => {
    const savedChats = localStorage.getItem("savedChats");
    const isLightMode = localStorage.getItem("themeColor") === "light_mode";

    document.body.classList.toggle("light_mode", isLightMode);
    toggleThemeButton.innerHTML = isLightMode ? "dark_mode" : "light_mode";

    chatList.innerHTML = savedChats || "";
    document.body.classList.toggle("hide-header", savedChats);
    chatList.scrollTo(0, chatList.scrollHeight);
};

loadLocalStorageData();

// Membuat elemen pesan
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

// Format teks respons AI
const formatAIResponse = (response) => {
    // Mengganti pola teks menjadi format HTML (judul, subjudul, isi, teks tebal, teks miring, teks kode)
    return response
        .replace(/\n\n/g, '<br>') // Ganti paragraf baru
        .replace(/^#\s(.*)/gm, '<h2>$1</h2>') // Judul utama (#)
        .replace(/^##\s(.*)/gm, '<h3>$1</h3>') // Subjudul (##)
        .replace(/^###\s(.*)/gm, '<p><strong>$1</strong></p>') // Sub-subjudul (###)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Teks tebal **text**
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Teks miring *text*
        .replace(/`(.*?)`/g, '<code>$1</code>') // Teks kode `text`
        .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>'); // Blok kode multi baris
};

document.getElementById('image-prompt').addEventListener('click', function() {
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
        let file = event.target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append('image', file);

            fetch('/api/analyze-image', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Gambar berhasil dianalisa!');
                    let messageContainer = document.querySelector('.chat-list');
                    let messageElement = document.createElement('div');
                    messageElement.classList.add('message', 'incoming');
                    messageElement.innerHTML = `
                        <div class="avatar"><img src="Avatar.jpg" alt="User Avatar"></div>
                        <div class="text">${data.analysis}</div>
                    `;
                    messageContainer.appendChild(messageElement);
                } else {
                    alert('Gagal menganalisa gambar.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat mengirim gambar.');
            });
        }
    };
    fileInput.click();
});





// Efek mengetik
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
    const words = text.split(' ');
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {
        textElement.innerHTML += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
        incomingMessageDiv.querySelector(".icon").classList.add("hide");

        if (currentWordIndex === words.length) {
            clearInterval(typingInterval);
            isResponseGenerating = false;
            incomingMessageDiv.querySelector(".icon").classList.remove("hide");
            localStorage.setItem("savedChats", chatList.innerHTML);
        }
        chatList.scrollTo(0, chatList.scrollHeight);
    }, 50);
};

// Generate respons API
const generateAPIResponse = async (incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector(".text");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: userMessage }] }]
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        const rawResponse = data?.candidates[0].content.parts[0].text;
        const formattedResponse = formatAIResponse(rawResponse);
        showTypingEffect(formattedResponse, textElement, incomingMessageDiv);
    } catch (error) {
        isResponseGenerating = false;
        textElement.innerText = error.message;
        textElement.classList.add("error");
    } finally {
        incomingMessageDiv.classList.remove("loading");
    }
};

// Animasi loading saat AI merespons
const showLoadingAnimation = () => {
    const html = `<div class="message-content">
                    <img src="Cora.png" alt="user-image" class="avatar">
                    <p class="text"></p>
                    <div class="loading-indicator">
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                    </div>
                </div>
                <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    chatList.scrollTo(0, chatList.scrollHeight);
    generateAPIResponse(incomingMessageDiv);
};

// Menyalin teks pesan
const copyMessage = (copyIcon) => {
    const messageText = copyIcon.parentElement.querySelector(".text").innerText;
    navigator.clipboard.writeText(messageText);
    copyIcon.innerText = "done";
    setTimeout(() => copyIcon.innerText = "content_copy", 1000);
};

// Handle chat keluar
const handleOutgoingChat = async () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;
    if (!userMessage || isResponseGenerating) return;

    isResponseGenerating = true;

    const html = `<div class="message-content">
                    <img src="Avatar.jpg" alt="user-image" class="avatar">
                    <p class="text">${userMessage}</p>
                </div>`;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    chatList.appendChild(outgoingMessageDiv);

    typingForm.reset();
    chatList.scrollTo(0, chatList.scrollHeight);
    document.body.classList.add("hide-header");
    setTimeout(showLoadingAnimation, 500);
};

// Event listeners
suggestions.forEach(suggestion => {
    suggestion.addEventListener("click", () => {
        userMessage = suggestion.querySelector(".text").innerText;
        handleOutgoingChat();
    });
});

toggleThemeButton.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light_mode");
    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
    toggleThemeButton.innerHTML = isLightMode ? "dark_mode" : "light_mode";
});

deleteChatButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all messages?")) {
        localStorage.removeItem("savedChats");
        loadLocalStorageData();
    }
});

typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
});

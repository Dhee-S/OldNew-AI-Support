// AI Chatbot - Sends user message to backend
async function sendMessage() {
    const userMessage = document.getElementById("userInput").value;
    document.getElementById("chatbox").innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

    const response = await fetch("https://your-backend.vercel.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    document.getElementById("chatbox").innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
}

// Voice Assistant - Uses Speech Recognition API
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
        document.getElementById("voiceOutput").innerText = event.results[0][0].transcript;
    };
    recognition.start();
}

// Reminders
function setReminder() {
    const reminder = document.getElementById("reminderInput").value;
    document.getElementById("reminderList").innerHTML += `<li>${reminder}</li>`;
    localStorage.setItem("reminder", reminder);
}

// Fetch News (Example API)
async function fetchNews() {
    const response = await fetch("https://api.currentsapi.services/v1/latest-news?apiKey=YOUR_NEWS_API_KEY");
    const data = await response.json();
    data.news.forEach(news => {
        document.getElementById("newsFeed").innerHTML += `<li>${news.title}</li>`;
    });
}

// Mini-Game
function playGame() {
    const result = Math.random() > 0.5 ? "You Win!" : "You Lose!";
    document.getElementById("gameResult").innerText = result;
}

// Call News Fetching on Load
fetchNews();

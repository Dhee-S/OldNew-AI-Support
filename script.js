document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded!");

    // ✅ AI Chat Functionality
    const chatInput = document.getElementById("chatInput");
    const chatSend = document.getElementById("chatSend");
    const chatBox = document.getElementById("chatBox");

    chatSend.addEventListener("click", () => {
        let userMessage = chatInput.value.trim();
        if (userMessage !== "") {
            chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            chatInput.value = "";
            // Simulate AI response
            setTimeout(() => {
                chatBox.innerHTML += `<p><strong>AI:</strong> I'm here to help!</p>`;
            }, 1000);
        }
    });

    // ✅ Voice Assistant Functionality
    const voiceButton = document.getElementById("voiceButton");

    if ("speechSynthesis" in window) {
        voiceButton.addEventListener("click", () => {
            let msg = new SpeechSynthesisUtterance("Hello! How can I assist you today?");
            window.speechSynthesis.speak(msg);
        });
    } else {
        voiceButton.disabled = true;
        voiceButton.innerText = "Voice Assistant Not Supported";
    }

    // ✅ Reminders Feature
    const reminderInput = document.getElementById("reminderInput");
    const reminderButton = document.getElementById("reminderButton");

    reminderButton.addEventListener("click", () => {
        let reminderText = reminderInput.value.trim();
        if (reminderText !== "") {
            alert(`Reminder set: ${reminderText}`);
            reminderInput.value = "";
        }
    });

    // ✅ Fetch Latest News (Fixing CORS Issue)
    async function fetchNews() {
        try {
            const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.currentsapi.services/v1/latest-news?apiKey=YOUR_NEWS_API_KEY"));
            if (!response.ok) throw new Error("Failed to fetch news");

            const data = await response.json();
            const newsContainer = document.getElementById("newsSection");
            let articles = JSON.parse(data.contents).news;

            newsContainer.innerHTML = articles.slice(0, 5).map(article =>
                `<p><a href="${article.url}" target="_blank">${article.title}</a></p>`
            ).join("");
        } catch (error) {
            console.error("Error fetching news:", error);
            document.getElementById("newsSection").innerHTML = "<p>Unable to fetch news. Try again later.</p>";
        }
    }

    fetchNews();
});

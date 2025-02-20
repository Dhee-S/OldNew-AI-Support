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
    const apiKey = "0VX2xlHQP_IsvrhAQ5InCk7AJT1OSgGG2ZUjp5yUQhk2qV5E"; // Replace this with your actual API key
    const url = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data); // Debugging: check if data is retrieved
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

fetchNews();

});
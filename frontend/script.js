async function generateContent() {
    const topicInput = document.getElementById("topic");
    const resultBox = document.getElementById("result");
    const button = document.getElementById("generateBtn");

    const topic = topicInput.value.trim();

    if (!topic) {
        resultBox.innerText = "⚠️ Please enter a topic to generate content.";
        return;
    }

    button.disabled = true;
    button.innerText = "Generating…";
    resultBox.innerText = "🤖 ContentCraft AI is crafting your content…";

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/generate?topic=${encodeURIComponent(topic)}`
        );

        const data = await response.json();
        resultBox.innerText = data.content;
    } catch (error) {
        resultBox.innerText =
            "❌ Something went wrong. Please try again.";
    }

    button.disabled = false;
    button.innerText = "Generate Content";
}

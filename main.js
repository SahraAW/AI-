const API_KEY = prompt("Write your key here"); // Replace with your actual API key

document.querySelector("#recipe-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const ingredients = document.querySelector("#ingredients").value;
    const output = document.querySelector("#recipe-output");

    output.innerHTML = "Loading recipes...";

    try {

        const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-3.1-8B-Instruct",
                messages: [
                    {
                        role: "user",
                        content: `I have these ingredients: ${ingredients}. Suggest 3 recipes I can make.`
                    }
                ],
                max_tokens: 500,
                stream: false
            })
        });

        // Check om respons er successful
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json(); // response som json

        // tag opskifte fra respons
        const recipes = data.choices[0]?.message.content || "No recipes found."; // juster respons fra Hugging

        output.innerHTML = `<pre>${recipes}</pre>`;
    } catch (error) {
        output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});


const API_KEY = prompt("write your key here") ; // Replace with your actual API key

document.querySelector("#recipe-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const ingredients = document.querySelector("#ingredients").value;
    const output = document.getElementById("recipe-output");

    output.innerHTML = "Loading recipes...";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                inputs: `I have these ingredients: ${ingredients}. Suggest 5 recipes I can make.`,
                options: {
                    use_cache: false, // Optional: Disable caching
                },
            }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const recipes = data[0]?.generated_text || "No recipes found."; // Adjust based on Hugging Face API response
        output.innerHTML = `<pre>${recipes}</pre>`;
    } catch (error) {
        output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});

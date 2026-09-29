export const POST = async (req: Request) => {
    const body = await req.json()
    console.log("OLLAMA REQUEST START")
    const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "qwen3:1.7b",
            prompt: body.prompt,
            messages: [{
                role: "user",
                content: body.prompt
            }],
            stream: false,
            think: false,
            options: {
                num_predict: 100
            }
        })
    })
    console.log("OLLAMA RESPONSE RECEIVED")
    const data = await response.json()
    return Response.json({
        ai: data.message.content

    })
} 
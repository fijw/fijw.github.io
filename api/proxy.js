export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const SECRET = "TESTING_SECRET";

    try {
        const { url, data, key } = req.body;

        // Security check
        if (key !== SECRET) {
            return res.status(403).json({ error: "Forbidden" });
        }

        // Validate webhook URL
        if (!url || !url.startsWith("https://discord.com/api/webhooks/")) {
            return res.status(400).json({ error: "Invalid webhook URL" });
        }

        // Send to Discord
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const text = await response.text();

        return res.status(200).send(text);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

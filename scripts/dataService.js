export async function getServices() {
    try {
        
        const response = await fetch("./data/services.json");

        if (!response.ok) {
            throw new Error("Failed to load services data");
        }

        return await response.json();

    } catch (error) {
        console.error("Services data retrieval error:", error);
        return [];
    }
}
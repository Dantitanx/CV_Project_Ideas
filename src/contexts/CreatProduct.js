export const BASE_URL = "https://webshop-cv-project-default-rtdb.europe-west1.firebasedatabase.app/products.json"

export const createProduct = async (product) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, created: Date.now() }),
    });

    if (!response.ok) {
        console.log("Create operation failed");
        throw new Error("Failed to create product");
    }

    return await response.json();
};

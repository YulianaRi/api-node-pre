const [, , method, route, ...args] = process.argv;
const [resource, id] = route?.split("/") ?? [];

const BASE_URL = "https://dummyjson.com";

const request = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

const main = async () => {
  try {
    if (resource !== "products") {
      return console.log("Recurso inválido. Usá: products o products/<id>");
    }

    const action = method?.toUpperCase();

    if (action === "GET") {
      if (id) {
        const product = await request(`${BASE_URL}/products/${id}`);
        console.log(product);
      } else {
        const { products } = await request(`${BASE_URL}/products`);
        console.log(products);
      }
    } else if (action === "POST") {
      const [title, price, category] = args;

      if (!title || !price || !category) {
        return console.log(
          "Faltan datos. Uso: POST products <title> <price> <category>",
        );
      }

      if (isNaN(Number(price))) {
        return console.log("El precio debe ser un número.");
      }

      const newProduct = await request(`${BASE_URL}/products/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price: Number(price), category }),
      });

      console.log(newProduct);
    } else if (action === "DELETE") {
      if (!id) {
        return console.log("Falta el id. Uso: DELETE products/<productId>");
      }

      const deletedProduct = await request(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
      });

      console.log(deletedProduct);
    } else {
      console.log("Comando no válido.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

main();

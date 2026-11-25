export type ProductCategory = "vegetables" | "fruits" | "nuts";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
};

export const PRODUCTS_URL =
  "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal });
  if (!response.ok) throw new Error("Unable to load products.");
  return (await response.json()) as Product[];
}

export function getDisplayName(name: string) {
  return name.replace(/\s-\s\d+\sKg|\s-\s\d+\/\d+\sKg/i, "");
}

export function formatPrice(price: number) {
  return `$ ${price}`;
}

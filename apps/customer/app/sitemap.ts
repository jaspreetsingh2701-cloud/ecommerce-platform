import type { MetadataRoute } from "next";

const products = [
  { id: "1" },
  { id: "2" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mystore.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
    })),
  ];
}
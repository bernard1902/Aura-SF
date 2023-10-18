export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "published",
      title: "Published",
      type: "boolean",
    },
    {
      title: "Launch Product At",
      name: "launchAt",
      type: "datetime",
    },
    {
      title: "End Product At",
      name: "endAt",
      type: "datetime",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: input =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "price",
      title: "Price (In dollars)",
      type: "number",
    },
    {
      name: "weight",
      title: "Weight (Grams / Ounces)",
      type: "string",
    },
    {
      name: "strain",
      title: "Strain",
      type: "reference",
      to: { type: "strain" },
    },
    {
      name: "profile",
      title:
        "Terpene Profile (Filling this in will override the terpene profile located under mood)",
      type: "array",
      of: [{ type: "terpeneProfile" }],
    },
    {
      name: "thc",
      title: "THC (In percentage)",
      type: "number",
    },
    {
      name: "cbd",
      title: "CBD (In percentage)",
      type: "number",
    },
    {
      name: "cannbinoids",
      title: "Total Cannbinoids (In percentage)",
      type: "number",
    },
    {
      name: "productType",
      title: "Product Type",
      type: "reference",
      to: { type: "productTypes" },
    },
    {
      name: "mainImage",
      title: "Main images",
      type: "array",
      of: [
        {
          type: "image",
          title: "Image",
          name: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
}

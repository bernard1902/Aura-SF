export default {
  name: "strain",
  title: "Moods",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
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
      name: "color",
      title: "Color (Sets the theme color)",
      type: "string",
    },
    {
      name: "profile",
      title: "Terpene Profile (This is the default terpenet profile)",
      type: "array",
      of: [{ type: "terpeneProfile" }],
    },
    {
      name: "effects",
      title: "Strain Effects",
      type: "string",
    },
    {
      name: "description",
      title: "Description (Appears on frontpage)",
      type: "text",
    },
    {
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "carouselImages",
      title: "Carousel Images",
      type: "array",
      of: [
        {
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    { name: "strainName", title: "Strain Name", type: "string" },
    { name: "timeOfUse", title: "Time of Use", type: "string" },
    { name: "suggestedPairings", title: "Suggested Pairings", type: "text" },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "bottomImages",
      title: "Bottom row images (6 is required)",
      type: "array",
      of: [
        {
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
}

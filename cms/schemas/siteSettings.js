export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      name: "carouselItems",
      title:
        "Carousel Items (For the front page, leaving this empty will result in default banner)",
      type: "array",
      of: [{ type: "carouselItem" }],
    },
    { name: "exciseTax", title: "Excise Tax Rate (%)", type: "number" },
    {
      name: "countyTaxes",
      title: "County Tax (JSON)",
      type: "file",
    },
    {
      name: "varietals",
      title: "Show Varietals?",
      type: "boolean",
    },
    {
      name: "showInstagram",
      title: "Show Instagram?",
      type: "boolean",
    },
    {
      name: "facebook",
      title: "Facebook Link",
      type: "url",
    },
    {
      name: "instagram",
      title: "Instagram Link",
      type: "url",
    },
    {
      name: "pinterest",
      title: "Pinterest Link",
      type: "url",
    },
    {
      name: "tumblr",
      title: "Tumblr Link",
      type: "url",
    },
  ],
}

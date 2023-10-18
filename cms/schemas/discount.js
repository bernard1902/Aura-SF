export default {
  name: "discount",
  title: "Discount",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "code",
      title: "Discount Code",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "type",
      title: "Discount Type",
      type: "string",
      options: {
        list: [
          { title: "Fixed Amount", value: "fixed" },
          { title: "Percentage", value: "percentage" },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: "amount",
      title: "Discount Amount",
      type: "number",
      validation: Rule => Rule.required(),
    },
    {
      name: "expiry",
      title: "Expiry Date (Leave blank if no expiry date)",
      type: "date",
    },
  ],
}

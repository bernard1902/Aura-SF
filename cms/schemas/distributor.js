export default {
  name: "distributor",
  title: "Distributor",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "geopoint",
    },
    {
      name: "mapsLink",
      title: "Google Maps Link",
      type: "url",
    },
  ],
}

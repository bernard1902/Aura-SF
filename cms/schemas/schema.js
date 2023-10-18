// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

// We import object and document schemas
import blockContent from "./blockContent"
import strain from "./strain"
import post from "./product"
import distributor from "./distributor"
import siteSettings from "./siteSettings"
import productTypes from "./productTypes"
import terpeneProfile from "./profile"
import carouselItem from "./carouselItem"
import discount from "./discount"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    strain,
    productTypes,
    post,
    distributor,
    discount,
    siteSettings,
    terpeneProfile,
    carouselItem,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
})

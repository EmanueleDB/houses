import ListingFromDB from "./listingFromDB"

export default interface State {
  listings: ListingFromDB[]
  selectedListing: Object
  navigationActiveItem: String
  windowWidth: String
  patching: Boolean
  listingToPatch: Object
}

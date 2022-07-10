export default interface ListingFromDB {
  constructionYear: String
  description: String
  hasGarage: String
  id: string
  image: String
  size: String
  location: { city: String; street: String; zip: String }
  madeByMe: Boolean
  price: String | Number
  rooms: { bathrooms: String | Number; bedrooms: String | Number }
}

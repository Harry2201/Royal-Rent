/**
 * @typedef {Object} DressAvailability
 * @property {string} from
 * @property {string} to
 * @property {'available' | 'limited' | 'booked'} status
 */

/**
 * @typedef {Object} DressListing
 * @property {string} id
 * @property {string} title
 * @property {string} brand
 * @property {string} designer
 * @property {string} category
 * @property {string} occasion
 * @property {number} rentalPrice
 * @property {number} originalPrice
 * @property {string} city
 * @property {DressAvailability} availability
 * @property {string} size
 * @property {string[]} sizes
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string} ownerId
 * @property {string} ownerName
 * @property {string[]} images
 * @property {boolean} wishlisted
 * @property {boolean} featured
 * @property {string} description
 * @property {string} uploadedDate
 * @property {'women' | 'men'} gender
 * @property {'active' | 'inactive'} status
 * @property {string[]} [tags]
 */

export {};

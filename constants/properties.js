export const PROPERTY_IMAGES = [
  require('../assets/images/home/house1.png'),
  require('../assets/images/home/house2.png'),
  require('../assets/images/home/house3.png'),
  require('../assets/images/home/house4.png'),
  require('../assets/images/home/house5.png'),
  require('../assets/images/home/house6.png'),
];

export const PROPERTY_IMAGE = PROPERTY_IMAGES[0];

export const PROPERTY_TYPES = [
  { id: 'private-room', label: 'Private room' },
  { id: 'self-contained', label: 'Self contained' },
  { id: 'studio', label: 'Studio' },
  { id: 'bedsitter', label: 'Bedsitter' },
  { id: 'apartment', label: 'Apartment' },
];

export const LISTING_TYPES = [
  { id: 'rooms', label: 'Rooms' },
  { id: 'apartment', label: 'Apartment' },
];

export const PRICE_OPTIONS = [150000, 250000, 350000, 450000, 650000, 1000000];

export const DISTANCE_OPTIONS = [
  { id: 'under-1', label: 'Under 1km', maxKm: 1 },
  { id: 'under-3', label: 'Under 3km', maxKm: 3 },
  { id: '5km', label: '5km', maxKm: 5 },
  { id: 'any', label: 'Any Distance', maxKm: Number.POSITIVE_INFINITY },
];

export const ROOM_TYPE_OPTIONS = [
  { id: 'shared-room', label: 'Shared room', matches: ['private-room', 'bedsitter'] },
  { id: '3-bedroom-flat', label: '3 bedroom flat', matches: ['apartment'] },
  { id: '2-bedroom-flat', label: '2 bedroom flat', matches: ['apartment'] },
  { id: 'self-contained', label: 'Self contained', matches: ['self-contained'] },
  { id: 'shared-hostel', label: 'Shared hostel', matches: ['private-room', 'bedsitter'] },
  { id: 'boys-quarters', label: 'Boys Quarters', matches: ['bedsitter'] },
  { id: 'studio-apartment', label: 'Studio apartment', matches: ['studio', 'apartment'] },
];

export const AMENITY_OPTIONS = [
  { id: 'wifi', label: 'Wifi' },
  { id: 'water', label: 'Running water' },
  { id: 'laundry', label: 'Laundry' },
  { id: 'electricity', label: 'Electricity' },
];

export const DEFAULT_PROPERTY_FILTERS = {
  priceRange: [PRICE_OPTIONS[0], PRICE_OPTIONS[3]],
  distance: 'any',
  roomTypes: [],
  amenities: [],
};

export const PROPERTY_LISTINGS = [
  {
    id: 'greenview-lodge',
    image: PROPERTY_IMAGES[0],
    title: 'Greenview Lodge',
    price: 'N350,000',
    priceValue: 350000,
    location: '8 mins from campus',
    rating: 4.5,
    type: 'private-room',
    listingType: 'rooms',
    verified: true,
    description:
      'A comfortable student accommodation option with a quiet environment, secure access, and easy commute to campus.',
    features: ['Wi-Fi', 'Water', 'Security', '24/7 Light'],
    amenities: ['wifi', 'water', 'security', 'electricity'],
    beds: '1 Bed',
    baths: '1 Bath',
    distance: '8 mins',
    distanceKm: 1.8,
  },
  {
    id: 'campus-comfort',
    image: PROPERTY_IMAGES[1],
    title: 'Campus Comfort',
    price: 'N350,000',
    priceValue: 350000,
    location: '5 mins from campus',
    rating: 4.5,
    type: 'self-contained',
    listingType: 'rooms',
    verified: true,
    description:
      'A neat self-contained room for students who want privacy, convenience, and a well-kept property close to school.',
    features: ['Wi-Fi', 'Water', 'Security', 'Kitchenette'],
    amenities: ['wifi', 'water', 'security', 'electricity'],
    beds: '1 Bed',
    baths: '1 Bath',
    distance: '5 mins',
    distanceKm: 1.2,
  },
  {
    id: 'luna-haven',
    image: PROPERTY_IMAGES[2],
    title: 'Luna Haven',
    price: 'N250,000',
    priceValue: 250000,
    location: '4 mins from campus',
    rating: 4.5,
    type: 'apartment',
    listingType: 'apartment',
    verified: true,
    description:
      'Modern student apartments with bright interiors, reliable utilities, and a clean layout suited for shared living.',
    features: ['Water', 'Security', 'Parking', 'Balcony'],
    amenities: ['water', 'security', 'parking', 'electricity'],
    beds: '2 Beds',
    baths: '2 Baths',
    distance: '4 mins',
    distanceKm: 0.9,
  },
  {
    id: 'maple-court',
    image: PROPERTY_IMAGES[3],
    title: 'Maple Court',
    price: 'N280,000',
    priceValue: 280000,
    location: '6 mins from campus',
    rating: 4.5,
    type: 'bedsitter',
    listingType: 'rooms',
    verified: true,
    description:
      'A smart bedsitter option with the essentials students need, wrapped in a calm and secure residential setting.',
    features: ['Water', 'Security', 'Wi-Fi', 'Power'],
    amenities: ['wifi', 'water', 'security', 'electricity'],
    beds: '1 Bed',
    baths: '1 Bath',
    distance: '6 mins',
    distanceKm: 1.5,
  },
  {
    id: 'ivy-student-lodge',
    image: PROPERTY_IMAGES[4],
    title: 'The Ivy Student Lodge',
    price: 'N320,000',
    priceValue: 320000,
    location: '7 mins from campus',
    rating: 4.5,
    type: 'studio',
    listingType: 'apartment',
    verified: true,
    description:
      'A polished studio-style lodge with a neat finish, practical spaces, and easy access to campus life.',
    features: ['Wi-Fi', 'Security', 'Light', 'Water'],
    amenities: ['wifi', 'security', 'electricity', 'water'],
    beds: '1 Bed',
    baths: '1 Bath',
    distance: '7 mins',
    distanceKm: 1.7,
  },
  {
    id: 'oakwood-student-lodge',
    image: PROPERTY_IMAGES[5],
    title: 'Oakwood Student Lodge',
    price: 'N290,000',
    priceValue: 290000,
    location: '9 mins from campus',
    rating: 4.5,
    type: 'private-room',
    listingType: 'rooms',
    verified: true,
    description:
      'Affordable and comfortable private rooms for students looking for a dependable place with a professional finish.',
    features: ['Security', 'Water', 'Wi-Fi', 'Gate Access'],
    amenities: ['wifi', 'water', 'security'],
    beds: '1 Bed',
    baths: '1 Bath',
    distance: '9 mins',
    distanceKm: 2.1,
  },
];

export function getListingById(id) {
  return PROPERTY_LISTINGS.find((listing) => listing.id === id) ?? PROPERTY_LISTINGS[0];
}

export function matchesFilters(listing, filters) {
  if (!filters) return true;

  const [minPrice, maxPrice] = filters.priceRange ?? DEFAULT_PROPERTY_FILTERS.priceRange;
  if (listing.priceValue < minPrice || listing.priceValue > maxPrice) {
    return false;
  }

  const distanceLimit = DISTANCE_OPTIONS.find((option) => option.id === filters.distance)?.maxKm ?? Number.POSITIVE_INFINITY;
  if (listing.distanceKm > distanceLimit) {
    return false;
  }

  const selectedRoomTypes = filters.roomTypes ?? [];
  if (selectedRoomTypes.length > 0) {
    const roomTypeMatches = selectedRoomTypes.some((roomTypeId) => {
      const option = ROOM_TYPE_OPTIONS.find((item) => item.id === roomTypeId);
      return option ? option.matches.includes(listing.type) : false;
    });

    if (!roomTypeMatches) {
      return false;
    }
  }

  const selectedAmenities = filters.amenities ?? [];
  if (selectedAmenities.length > 0) {
    const listingAmenities = listing.amenities ?? [];
    const allSelectedAmenitiesExist = selectedAmenities.every((amenity) => listingAmenities.includes(amenity));
    if (!allSelectedAmenitiesExist) {
      return false;
    }
  }

  return true;
}

export function filterListings(listings, filters) {
  return listings.filter((listing) => matchesFilters(listing, filters));
}

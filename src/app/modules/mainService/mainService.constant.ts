export const serviceFilterableFields: string[] = [
  'searchTerm',
  'title',
  'price',
  'rating',
  'categoryId',
  'vehicleId',
  'vehicleType',
];

export const serviceSearchableFields = ['title', 'price', 'rating'];
export const serviceRelationalFields: string[] = ['categoryId', 'vehicleType'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
  vehicleType: 'serviceVehicles',
};

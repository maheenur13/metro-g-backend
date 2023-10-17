export const serviceFilterableFields: string[] = [
  'searchTerm',
  'title',
  'price',
  'rating',
  'categoryId',
  'vehicleType',
];

export const serviceSearchableFields = ['title', 'vehicleType'];
export const serviceRelationalFields: string[] = ['categoryId', 'vehicleType'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
  vehicleType: 'serviceVehicles',
};

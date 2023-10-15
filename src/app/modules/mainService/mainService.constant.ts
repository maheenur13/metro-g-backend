export const serviceFilterableFields: string[] = [
  'searchTerm',
  'title',
  'price',
  'rating',
  'categoryId',
  'vehicleId',
  'type',
];
export const serviceRelationalFields: string[] = ['categoryId', 'type'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
  type: 'ServiceVehicle',
};

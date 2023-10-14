export const serviceFilterableFields: string[] = [
  'searchTerm',
  'title',
  'price',
  'rating',
  'categoryId',
  'vehicleId',
];
export const serviceRelationalFields: string[] = ['categoryId', 'vehicleId'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
  vehicleId: 'vehicle',
};

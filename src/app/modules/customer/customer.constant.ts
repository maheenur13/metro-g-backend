export const customerFilterableFields: string[] = [
  'searchTerm',
  'userId',
  'email',
  'contactNo',
  'gender',
  'bloodGroup',
];
export const customerRelationalFields: string[] = ['userId'];
export const customerRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
};

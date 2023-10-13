export const adminFilterableFields: string[] = [
  'searchTerm',
  'userId',
  'email',
  'contactNo',
  'gender',
  'bloodGroup',
  'role',
];
export const adminRelationalFields: string[] = ['userId'];
export const adminRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
};

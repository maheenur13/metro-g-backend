import bcrypt from 'bcrypt';
import config from '../../../config';
import prisma from '../../../shared/prisma';

export const findLastCustomerId = async (): Promise<string | undefined> => {
  const lastCustomer = await prisma.customer.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastCustomer?.userId
    ? lastCustomer.userId.split('-')[1].substring(5)
    : undefined;
};
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await prisma.admin.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastAdmin?.userId
    ? lastAdmin.userId
        .split('-')
        [lastAdmin.userId.split('-').length - 1].substring(5)
    : undefined;
};

export const generateCustomerId = async (name: string): Promise<string> => {
  let finalId = (await findLastCustomerId()) || (0).toString().padStart(6, '0');
  finalId =
    name.toLocaleLowerCase() +
    '-' +
    (parseInt(finalId) + 1).toString().padStart(6, '0');

  return finalId;
};
export const generateAdminId = async (
  name: string,
  role: 'ADMIN' | 'SUPER_ADMIN'
): Promise<string> => {
  let finalId = (await findLastAdminId()) || (0).toString().padStart(6, '0');
  finalId =
    role.toLocaleLowerCase() +
    '-' +
    name.toLocaleLowerCase() +
    '-' +
    (parseInt(finalId) + 1).toString().padStart(6, '0');

  return finalId;
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));
};

// export const findLastFacultyId = async (): Promise<string | undefined> => {
//   const lastFaculty = await UserModel.findOne(
//     { role: 'faculty' },
//     { id: 1, _id: 0 }
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
// };

// export const generateFacultyId = async (): Promise<string> => {
//   const currentId =
//     (await findLastFacultyId()) || (0).toString().padStart(5, '0');
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementedId = `F-${incrementedId}`;

//   return incrementedId;
// };

// export const findLastAdminId = async (): Promise<string | undefined> => {
//   const lastFaculty = await UserModel.findOne(
//     { role: 'admin' },
//     { id: 1, _id: 0 }
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
// };

// export const generateAdminId = async (): Promise<string> => {
//   const currentId =
//     (await findLastAdminId()) || (0).toString().padStart(5, '0');
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementedId = `A-${incrementedId}`;

//   return incrementedId;
// };

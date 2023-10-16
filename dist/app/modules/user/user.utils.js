"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.generateAdminId = exports.generateCustomerId = exports.findLastAdminId = exports.findLastCustomerId = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const findLastCustomerId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastCustomer = yield prisma_1.default.customer.findFirst({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return (lastCustomer === null || lastCustomer === void 0 ? void 0 : lastCustomer.userId)
        ? lastCustomer.userId.split('-')[1].substring(5)
        : undefined;
});
exports.findLastCustomerId = findLastCustomerId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield prisma_1.default.admin.findFirst({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.userId)
        ? lastAdmin.userId
            .split('-')[lastAdmin.userId.split('-').length - 1].substring(5)
        : undefined;
});
exports.findLastAdminId = findLastAdminId;
const generateCustomerId = (name) => __awaiter(void 0, void 0, void 0, function* () {
    let finalId = (yield (0, exports.findLastCustomerId)()) || (0).toString().padStart(6, '0');
    finalId =
        name.toLocaleLowerCase() +
            '-' +
            (parseInt(finalId) + 1).toString().padStart(6, '0');
    return finalId;
});
exports.generateCustomerId = generateCustomerId;
const generateAdminId = (name, role) => __awaiter(void 0, void 0, void 0, function* () {
    let finalId = (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(6, '0');
    finalId =
        role.toLocaleLowerCase() +
            '-' +
            name.toLocaleLowerCase() +
            '-' +
            (parseInt(finalId) + 1).toString().padStart(6, '0');
    return finalId;
});
exports.generateAdminId = generateAdminId;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, Number(config_1.default.bycrypt_salt_rounds));
});
exports.hashPassword = hashPassword;
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

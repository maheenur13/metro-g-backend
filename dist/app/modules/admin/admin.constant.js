"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRelationalFieldsMapper = exports.adminRelationalFields = exports.adminFilterableFields = void 0;
exports.adminFilterableFields = [
    'searchTerm',
    'userId',
    'email',
    'contactNo',
    'gender',
    'bloodGroup',
    'role',
];
exports.adminRelationalFields = ['userId'];
exports.adminRelationalFieldsMapper = {
    userId: 'user',
};

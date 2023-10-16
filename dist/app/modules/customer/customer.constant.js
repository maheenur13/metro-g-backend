"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRelationalFieldsMapper = exports.customerRelationalFields = exports.customerFilterableFields = void 0;
exports.customerFilterableFields = [
    'searchTerm',
    'userId',
    'email',
    'contactNo',
    'gender',
    'bloodGroup',
];
exports.customerRelationalFields = ['userId'];
exports.customerRelationalFieldsMapper = {
    userId: 'user',
};

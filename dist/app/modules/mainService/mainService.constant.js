"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRelationalFieldsMapper = exports.serviceRelationalFields = exports.serviceFilterableFields = void 0;
exports.serviceFilterableFields = [
    'searchTerm',
    'title',
    'price',
    'rating',
    'categoryId',
    'vehicleId',
    'type',
];
exports.serviceRelationalFields = ['categoryId', 'type'];
exports.serviceRelationalFieldsMapper = {
    categoryId: 'category',
    type: 'ServiceVehicle',
};

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const mainService_constant_1 = require("./mainService.constant");
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleIds } = data, serviceData = __rest(data, ["vehicleIds"]);
    const isExist = yield prisma_1.default.service.findFirst({
        where: {
            OR: [
                {
                    title: data.title,
                },
            ],
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'service already exist!');
    }
    const createdService = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const serviceResult = yield transactionClient.service.create({
            data: serviceData,
        });
        if (vehicleIds && vehicleIds.length > 0) {
            yield (0, utils_1.asyncForEach)(vehicleIds, (vehicle) => __awaiter(void 0, void 0, void 0, function* () {
                yield transactionClient.serviceVehicle.create({
                    data: {
                        vehicleId: vehicle.vehicleId,
                        serviceId: serviceResult.id,
                    },
                });
            }));
        }
        //   data: {
        //     serviceId: service.id,
        //     vehicleId: vehicleId,
        //   },
        //   include: {
        //     service: true,
        //     vehicle: true,
        //   },
        // });
        return serviceResult;
    }));
    return yield prisma_1.default.service.findUnique({
        where: {
            id: createdService.id,
        },
        include: {
            ServiceVehicle: {
                include: {
                    vehicle: true,
                },
            },
        },
    });
});
const getAllServices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: mainService_constant_1.serviceFilterableFields.map(field => {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                };
            }),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (mainService_constant_1.serviceRelationalFields.includes(key)) {
                    if (key === 'type') {
                        return {
                            [mainService_constant_1.serviceRelationalFieldsMapper[key]]: {
                                ['some']: {
                                    ['vehicle']: {
                                        [key]: {
                                            equals: filterData[key],
                                        },
                                    },
                                },
                            },
                        };
                    }
                    else {
                        return {
                            [mainService_constant_1.serviceRelationalFieldsMapper[key]]: {
                                id: filterData[key],
                            },
                        };
                    }
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.service.findMany({
        where: whereConditions,
        include: {
            ServiceVehicle: {
                include: {
                    vehicle: true,
                },
            },
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.service.count({});
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.service.findFirst({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'service does not exist!');
    }
    return yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.service.findFirst({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'service does not exist!');
    }
    return yield prisma_1.default.service.delete({
        where: {
            id,
        },
    });
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.service.findFirst({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'service does not exist!');
    }
    return yield prisma_1.default.service.update({
        where: {
            id,
        },
        data: payload,
    });
});
exports.mainService = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};

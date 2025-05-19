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
exports.ApiService = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = 'https://case-test-api.humanas.io';
exports.ApiService = {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${API_URL}`);
                // API'nin dönen yapısı: { status, message, data: { rows: [...] } }
                if (response.data && response.data.data && response.data.data.rows) {
                    return response.data.data.rows;
                }
                throw new Error('API yanıtı beklenen formatta değil');
            }
            catch (error) {
                console.error('Kullanıcılar getirilirken hata oluştu:', error);
                throw error;
            }
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${API_URL}`);
                if (response.data && response.data.data && response.data.data.rows) {
                    const user = response.data.data.rows.find((u) => u.id === id);
                    if (!user) {
                        throw new Error(`${id} ID'li kullanıcı bulunamadı`);
                    }
                    return user;
                }
                throw new Error('API yanıtı beklenen formatta değil');
            }
            catch (error) {
                console.error(`${id} ID'li kullanıcı getirilirken hata oluştu:`, error);
                throw error;
            }
        });
    }
};

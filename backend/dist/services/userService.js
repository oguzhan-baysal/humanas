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
exports.UserService = void 0;
const axios_1 = __importDefault(require("axios"));
class UserService {
    constructor() {
        this.apiUrl = 'https://case-test-api.humanas.io';
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.apiUrl}/users`);
                return response.data;
            }
            catch (error) {
                throw new Error('Failed to fetch users');
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.get(`${this.apiUrl}/users/${id}`);
                return response.data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error) && ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                    return null;
                }
                throw new Error('Failed to fetch user');
            }
        });
    }
    getAllPredictions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getAllUsers();
                const predictions = yield Promise.all(users.map(user => this.getUserPredictions(user.id)));
                return predictions;
            }
            catch (error) {
                throw new Error('Failed to fetch all predictions');
            }
        });
    }
    getUserPredictions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.apiUrl}/users/${userId}/logins`);
                const loginData = response.data;
                // Algoritma 1: Ortalama Aralık Yöntemi
                const averageIntervalPrediction = this.calculateAverageIntervalPrediction(loginData.logins);
                // Algoritma 2: Gün ve Saat Örüntüsü Analizi
                const patternAnalysisPrediction = this.calculatePatternAnalysisPrediction(loginData.logins);
                return {
                    userId: userId,
                    nextLoginPredictions: {
                        averageInterval: averageIntervalPrediction,
                        patternBased: patternAnalysisPrediction
                    },
                    accuracy: {
                        averageInterval: 0.7,
                        patternBased: 0.8
                    }
                };
            }
            catch (error) {
                throw new Error('Failed to fetch user predictions');
            }
        });
    }
    calculateAverageIntervalPrediction(logins) {
        const intervals = [];
        const sortedLogins = logins.sort();
        for (let i = 1; i < sortedLogins.length; i++) {
            const diff = new Date(sortedLogins[i]).getTime() - new Date(sortedLogins[i - 1]).getTime();
            intervals.push(diff);
        }
        const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const lastLogin = new Date(sortedLogins[sortedLogins.length - 1]);
        const nextLogin = new Date(lastLogin.getTime() + averageInterval);
        return nextLogin.toISOString();
    }
    calculatePatternAnalysisPrediction(logins) {
        const dayHourMap = new Map();
        logins.forEach(login => {
            const date = new Date(login);
            const key = `${date.getDay()}-${date.getHours()}`;
            dayHourMap.set(key, (dayHourMap.get(key) || 0) + 1);
        });
        let mostCommonPattern = '';
        let maxCount = 0;
        dayHourMap.forEach((count, pattern) => {
            if (count > maxCount) {
                maxCount = count;
                mostCommonPattern = pattern;
            }
        });
        const [day, hour] = mostCommonPattern.split('-').map(Number);
        const lastLogin = new Date(logins[logins.length - 1]);
        const nextLogin = new Date(lastLogin);
        while (nextLogin.getDay() !== day) {
            nextLogin.setDate(nextLogin.getDate() + 1);
        }
        nextLogin.setHours(hour, 0, 0, 0);
        if (nextLogin <= lastLogin) {
            nextLogin.setDate(nextLogin.getDate() + 7);
        }
        return nextLogin.toISOString();
    }
}
exports.UserService = UserService;

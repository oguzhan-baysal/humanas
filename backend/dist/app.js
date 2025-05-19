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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Gerçek API'den kullanıcıları çek
function fetchAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get('https://case-test-api.humanas.io');
        if (response.data && response.data.data && response.data.data.rows) {
            return response.data.data.rows;
        }
        throw new Error('API yanıtı beklenen formatta değil');
    });
}
// Tüm kullanıcıları getir
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield fetchAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Kullanıcılar alınamadı' });
    }
}));
// Belirli bir kullanıcının detaylarını getir
app.get('/api/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield fetchAllUsers();
        const user = users.find((u) => u.id === req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Kullanıcı alınamadı' });
    }
}));
// Tüm kullanıcılar için tahminleri getir
app.get('/api/predictions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield fetchAllUsers();
        const predictions = users.map((user) => ({
            userId: user.id,
            predictions: calculatePredictions(user.logins)
        }));
        res.json(predictions);
    }
    catch (error) {
        res.status(500).json({ error: 'Tahminler alınamadı' });
    }
}));
// Belirli bir kullanıcı için tahminleri getir
app.get('/api/predictions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield fetchAllUsers();
        const user = users.find((u) => u.id === req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }
        const predictions = calculatePredictions(user.logins);
        res.json({ userId: user.id, predictions });
    }
    catch (error) {
        res.status(500).json({ error: 'Tahmin alınamadı' });
    }
}));
// Tahmin algoritmaları
function calculatePredictions(logins) {
    return {
        averageInterval: calculateAverageInterval(logins),
        dayHourPattern: calculateDayHourPattern(logins),
        movingAverage: calculateMovingAverage(logins),
        weightedDayHour: calculateWeightedDayHour(logins)
    };
}
// Ortalama Aralık Yöntemi
function calculateAverageInterval(logins) {
    if (logins.length < 2)
        return null;
    const intervals = [];
    for (let i = 1; i < logins.length; i++) {
        const diff = new Date(logins[i]).getTime() - new Date(logins[i - 1]).getTime();
        intervals.push(diff);
    }
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const lastLogin = new Date(logins[logins.length - 1]);
    const nextLogin = new Date(lastLogin.getTime() + avgInterval);
    return {
        method: 'Ortalama Aralık',
        prediction: nextLogin.toISOString(),
        confidence: calculateConfidence(intervals)
    };
}
// Gün ve Saat Örüntüsü Analizi
function calculateDayHourPattern(logins) {
    if (logins.length < 3)
        return null;
    const patterns = {};
    logins.forEach(login => {
        const date = new Date(login);
        const pattern = `${date.getDay()}-${date.getHours()}`;
        patterns[pattern] = (patterns[pattern] || 0) + 1;
    });
    const mostCommonPattern = Object.entries(patterns)
        .sort(([, a], [, b]) => b - a)[0][0];
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
    return {
        method: 'Gün-Saat Örüntüsü',
        prediction: nextLogin.toISOString(),
        confidence: calculatePatternConfidence(patterns)
    };
}
// Hareketli Ortalama
function calculateMovingAverage(logins, windowSize = 3) {
    if (logins.length < windowSize + 1)
        return null;
    const intervals = [];
    for (let i = 1; i < logins.length; i++) {
        const diff = new Date(logins[i]).getTime() - new Date(logins[i - 1]).getTime();
        intervals.push(diff);
    }
    const recentIntervals = intervals.slice(-windowSize);
    const movingAvg = recentIntervals.reduce((a, b) => a + b, 0) / windowSize;
    const lastLogin = new Date(logins[logins.length - 1]);
    const nextLogin = new Date(lastLogin.getTime() + movingAvg);
    return {
        method: 'Hareketli Ortalama',
        prediction: nextLogin.toISOString(),
        confidence: calculateMovingAverageConfidence(intervals, windowSize)
    };
}
// Ağırlıklı Gün-Saat Analizi
function calculateWeightedDayHour(logins) {
    if (logins.length < 5)
        return null;
    const patterns = {};
    const weights = logins.map((_, i) => i + 1);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    logins.forEach((login, i) => {
        const date = new Date(login);
        const pattern = `${date.getDay()}-${date.getHours()}`;
        patterns[pattern] = (patterns[pattern] || 0) + weights[i] / totalWeight;
    });
    const mostCommonPattern = Object.entries(patterns)
        .sort(([, a], [, b]) => b - a)[0][0];
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
    return {
        method: 'Ağırlıklı Gün-Saat',
        prediction: nextLogin.toISOString(),
        confidence: calculateWeightedConfidence(patterns)
    };
}
// Yardımcı fonksiyonlar
function calculateConfidence(intervals) {
    const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = stdDev / mean;
    return Math.max(0, Math.min(1, 1 - coefficientOfVariation));
}
function calculatePatternConfidence(patterns) {
    const total = Object.values(patterns).reduce((a, b) => a + b, 0);
    const maxCount = Math.max(...Object.values(patterns));
    return maxCount / total;
}
function calculateMovingAverageConfidence(intervals, windowSize) {
    if (intervals.length <= windowSize)
        return 0.5;
    const recentIntervals = intervals.slice(-windowSize);
    const mean = recentIntervals.reduce((a, b) => a + b, 0) / windowSize;
    const variance = recentIntervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / windowSize;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = stdDev / mean;
    return Math.max(0, Math.min(1, 1 - coefficientOfVariation));
}
function calculateWeightedConfidence(patterns) {
    const values = Object.values(patterns);
    const maxWeight = Math.max(...values);
    const totalWeight = values.reduce((a, b) => a + b, 0);
    return maxWeight / totalWeight;
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

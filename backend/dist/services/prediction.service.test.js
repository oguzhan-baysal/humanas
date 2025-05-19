"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prediction_service_1 = require("./prediction.service");
describe('PredictionService', () => {
    const service = new prediction_service_1.PredictionService();
    const user = {
        id: 'test',
        name: 'Test User',
        logins: [
            '2024-05-01T08:00:00Z',
            '2024-05-02T08:30:00Z',
            '2024-05-03T08:15:00Z',
            '2024-05-04T08:45:00Z',
            '2024-05-05T08:10:00Z',
        ],
    };
    it('generatePredictions: tüm algoritmalar sonuç döndürmeli', () => {
        const results = service.generatePredictions(user);
        expect(results.length).toBe(3);
        results.forEach((result) => {
            expect(result).toHaveProperty('nextLoginTime');
            expect(result).toHaveProperty('confidence');
            expect(result).toHaveProperty('method');
            expect(typeof result.nextLoginTime).toBe('string');
            expect(typeof result.confidence).toBe('number');
            expect(typeof result.method).toBe('string');
        });
    });
    it('Ortalama Aralık tahmini mantıklı olmalı', () => {
        const [avg] = service.generatePredictions(user);
        expect(avg.method).toBe('Ortalama Aralık');
        expect(new Date(avg.nextLoginTime).getTime()).toBeGreaterThan(new Date(user.logins[user.logins.length - 1]).getTime());
    });
    it('Gün-Saat Örüntüsü tahmini mantıklı olmalı', () => {
        const [, pattern] = service.generatePredictions(user);
        expect(pattern.method).toBe('Gün-Saat Örüntüsü');
        expect(new Date(pattern.nextLoginTime).getTime()).toBeGreaterThan(new Date().getTime() - 1000 * 60 * 60 * 24 * 7);
    });
    it('Hareketli Ortalama tahmini mantıklı olmalı', () => {
        const [, , moving] = service.generatePredictions(user);
        expect(moving.method).toBe('Hareketli Ortalama');
        expect(new Date(moving.nextLoginTime).getTime()).toBeGreaterThan(new Date(user.logins[user.logins.length - 1]).getTime());
    });
    it('Yetersiz login verisi varsa hata fırlatmalı', () => {
        const badUser = { id: 'bad', name: 'Bad', logins: ['2024-05-01T08:00:00Z'] };
        expect(() => service.generatePredictions(badUser)).toThrow();
    });
});

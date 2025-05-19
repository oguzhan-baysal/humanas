"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Kullanıcı rotaları
router.get('/', userController_1.getAllUsers);
router.get('/:id', userController_1.getUserById);
// Tahmin rotaları
router.get('/predictions', userController_1.getAllPredictions);
router.get('/:id/predictions', userController_1.getUserPredictions);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/setup', adminController_1.setupAdmin);
router.post('/login', adminController_1.loginAdmin);
router.get('/profile', auth_1.protect, auth_1.admin, adminController_1.getAdminProfile);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(projectController_1.getProjects)
    .post(auth_1.protect, auth_1.admin, projectController_1.createProject);
router.route('/:id')
    .get(projectController_1.getProject)
    .put(auth_1.protect, auth_1.admin, projectController_1.updateProject)
    .delete(auth_1.protect, auth_1.admin, projectController_1.deleteProject);
exports.default = router;

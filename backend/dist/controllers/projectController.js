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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma_1.default.project.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(projects);
    }
    catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getProjects = getProjects;
// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield prisma_1.default.project.findUnique({
            where: { id: req.params.id },
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    }
    catch (error) {
        console.error('Error getting project:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getProject = getProject;
// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield prisma_1.default.project.create({
            data: Object.assign(Object.assign({}, req.body), { techStack: req.body.techStack || [] }),
        });
        res.status(201).json(project);
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createProject = createProject;
// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield prisma_1.default.project.update({
            where: { id: req.params.id },
            data: Object.assign(Object.assign({}, req.body), { techStack: req.body.techStack || [] }),
        });
        res.json(project);
    }
    catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateProject = updateProject;
// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.project.delete({
            where: { id: req.params.id },
        });
        res.json({ message: 'Project removed' });
    }
    catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteProject = deleteProject;

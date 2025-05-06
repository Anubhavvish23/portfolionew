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
exports.updateAboutMe = exports.getAboutMe = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// @desc    Get about me info
// @route   GET /api/about
// @access  Public
const getAboutMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aboutMe = yield prisma_1.default.aboutMe.findFirst({
            include: {
                education: true,
                experience: true,
            },
        });
        if (!aboutMe) {
            return res.status(404).json({ message: 'About me information not found' });
        }
        res.json(aboutMe);
    }
    catch (error) {
        console.error('Error getting about me:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAboutMe = getAboutMe;
// @desc    Update about me info
// @route   PUT /api/about
// @access  Private/Admin
const updateAboutMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { education, experience } = _a, aboutMeData = __rest(_a, ["education", "experience"]);
        // Clean education and experience arrays to remove aboutMeId
        const cleanEducation = (education || []).map((edu) => {
            const { aboutMeId } = edu, rest = __rest(edu, ["aboutMeId"]);
            return rest;
        });
        const cleanExperience = (experience || []).map((exp) => {
            const { aboutMeId } = exp, rest = __rest(exp, ["aboutMeId"]);
            return rest;
        });
        // Get the current AboutMe record
        const currentAboutMe = yield prisma_1.default.aboutMe.findFirst();
        if (!currentAboutMe) {
            // Create new AboutMe with relations
            const aboutMe = yield prisma_1.default.aboutMe.create({
                data: Object.assign(Object.assign({}, aboutMeData), { education: {
                        create: cleanEducation,
                    }, experience: {
                        create: cleanExperience,
                    } }),
                include: {
                    education: true,
                    experience: true,
                },
            });
            return res.json(aboutMe);
        }
        // Update existing AboutMe
        // First, delete existing relations
        yield prisma_1.default.education.deleteMany({
            where: { aboutMeId: currentAboutMe.id },
        });
        yield prisma_1.default.experience.deleteMany({
            where: { aboutMeId: currentAboutMe.id },
        });
        // Then update AboutMe with new relations
        const aboutMe = yield prisma_1.default.aboutMe.update({
            where: { id: currentAboutMe.id },
            data: Object.assign(Object.assign({}, aboutMeData), { education: {
                    create: cleanEducation,
                }, experience: {
                    create: cleanExperience,
                } }),
            include: {
                education: true,
                experience: true,
            },
        });
        res.json(aboutMe);
    }
    catch (error) {
        console.error('Error updating about me:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateAboutMe = updateAboutMe;

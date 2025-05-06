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
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Clear existing data
            yield prisma_1.default.experience.deleteMany();
            yield prisma_1.default.education.deleteMany();
            yield prisma_1.default.aboutMe.deleteMany();
            yield prisma_1.default.rating.deleteMany();
            yield prisma_1.default.galleryItem.deleteMany();
            yield prisma_1.default.certificate.deleteMany();
            yield prisma_1.default.project.deleteMany();
            yield prisma_1.default.user.deleteMany();
            // Create admin user
            const hashedPassword = yield bcryptjs_1.default.hash('admin123', 10);
            const admin = yield prisma_1.default.user.create({
                data: {
                    username: 'admin',
                    password: hashedPassword,
                    isAdmin: true,
                },
            });
            console.log('Created admin user:', admin.username);
            // Create projects
            const projects = yield prisma_1.default.project.createMany({
                data: [
                    {
                        title: 'E-commerce Platform',
                        description: 'A modern e-commerce platform built with React and Node.js. Features include product filtering, user authentication, cart functionality, and payment processing.',
                        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                        liveLink: 'https://example.com/ecommerce',
                        githubLink: 'https://github.com/username/ecommerce',
                        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                        featured: true,
                    },
                    {
                        title: 'Weather Dashboard',
                        description: 'A weather application that displays current weather and forecasts based on location. Uses the OpenWeatherMap API for real-time data.',
                        techStack: ['JavaScript', 'API', 'CSS', 'HTML'],
                        liveLink: 'https://example.com/weather',
                        githubLink: 'https://github.com/username/weather',
                        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
                    },
                ],
            });
            console.log('Created projects');
            // Create certificates
            const certificates = yield prisma_1.default.certificate.createMany({
                data: [
                    {
                        title: 'Full Stack Web Development',
                        issuingOrg: 'Tech Academy',
                        date: new Date('2023-08-15'),
                        image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
                    },
                    {
                        title: 'Advanced React & Redux',
                        issuingOrg: 'Frontend Masters',
                        date: new Date('2023-05-20'),
                        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
                    },
                ],
            });
            console.log('Created certificates');
            // Create gallery items
            const galleryItems = yield prisma_1.default.galleryItem.createMany({
                data: [
                    {
                        title: 'Tech Conference 2023',
                        description: 'Speaking at the annual tech conference',
                        image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
                        category: 'Events',
                    },
                    {
                        title: 'Team Hackathon',
                        description: 'First place at the regional hackathon',
                        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
                        category: 'Achievements',
                    },
                ],
            });
            console.log('Created gallery items');
            // Create ratings
            const ratings = yield prisma_1.default.rating.createMany({
                data: [
                    {
                        score: 5,
                        comment: 'Wow, great portfolio!',
                    },
                    {
                        score: 4,
                        comment: 'Very nice design, but could use more projects',
                    },
                ],
            });
            console.log('Created ratings');
            // Create about me with education and experience
            const aboutMe = yield prisma_1.default.aboutMe.create({
                data: {
                    headline: 'Full Stack Developer & UI/UX Enthusiast',
                    bio: 'I am a passionate Full Stack Developer with 5+ years of experience building modern web applications. Specializing in React.js and Node.js, I create responsive, user-friendly interfaces and robust backend systems. I believe in clean code, continuous learning, and delivering exceptional user experiences.',
                    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'GraphQL', 'UI/UX Design', 'Framer Motion'],
                    interests: ['Open Source', 'AI & Machine Learning', 'Game Development', 'Photography', 'Hiking'],
                    profileImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
                    education: {
                        create: [
                            {
                                degree: 'Master of Computer Science',
                                institution: 'Tech University',
                                year: '2019 - 2021',
                                description: 'Focused on advanced web technologies and human-computer interaction',
                            },
                            {
                                degree: 'Bachelor of Science in Software Engineering',
                                institution: 'State University',
                                year: '2015 - 2019',
                                description: 'Dean\'s List, Senior project: AI-powered content management system',
                            },
                        ],
                    },
                    experience: {
                        create: [
                            {
                                position: 'Senior Full Stack Developer',
                                company: 'Tech Innovations Inc.',
                                startDate: 'Jan 2022',
                                current: true,
                                description: 'Leading development of the company\'s flagship SaaS product. Managing a team of 5 developers, implementing CI/CD pipelines, and reducing application load time by 40%.',
                            },
                            {
                                position: 'Full Stack Developer',
                                company: 'Digital Solutions Ltd.',
                                startDate: 'Mar 2019',
                                endDate: 'Dec 2021',
                                current: false,
                                description: 'Developed and maintained multiple client websites and web applications. Implemented responsive designs and optimized database queries, resulting in 30% faster page loads.',
                            },
                        ],
                    },
                },
            });
            console.log('Created about me section');
            console.log('Database seeded successfully');
        }
        catch (error) {
            console.error('Error seeding database:', error);
            process.exit(1);
        }
        finally {
            yield prisma_1.default.$disconnect();
        }
    });
}
seed();

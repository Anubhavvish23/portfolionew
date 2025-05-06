"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const aboutRoutes_1 = __importDefault(require("./routes/aboutRoutes"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files from uploads directory
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/about', aboutRoutes_1.default);
// Other routes will be added here
// app.use('/api/certificates', certificateRoutes);
// app.use('/api/gallery', galleryRoutes);
// app.use('/api/ratings', ratingRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

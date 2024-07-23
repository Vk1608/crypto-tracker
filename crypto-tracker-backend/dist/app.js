"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const cron_1 = require("./utils/cron");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const price_model_1 = __importDefault(require("./models/price-model"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
// Connect to MongoDB
mongoose_1.default.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Crypto-rate DB connected'))
    .catch(err => console.log(err));
// app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const data_1 = __importDefault(require("./routes/data"));
const crypto_1 = __importDefault(require("./routes/crypto"));
app.use('/price', data_1.default);
app.use('/crypto', crypto_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
io.on('connection', (socket) => {
    console.log('New client connected');
    setInterval(async () => {
        const data = await price_model_1.default.find().sort({ timestamp: -1 }).limit(20);
        socket.emit('stockData', data);
    }, 2000);
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
// Cron job to fetch data every minute
(0, cron_1.fetchDataAndStore)().catch(err => console.error('Error fetching data:', err));
node_cron_1.default.schedule('*/1 * * * *', () => {
    (0, cron_1.fetchDataAndStore)().catch(err => console.error('Error fetching data:', err));
});

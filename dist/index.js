"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.json({ test: 'Ok' });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log('server has started on port');
    console.log('http://localhost:' + PORT);
});

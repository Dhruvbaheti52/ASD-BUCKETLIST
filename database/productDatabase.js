const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../db.json');
const READ_DELAY_MS = 1500;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const readData = async () => {
    await delay(READ_DELAY_MS);
    try {
        const fileContent = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading JSON database:', error);
        throw error;
    }
};

const writeData = async (content) => {
    try {
        const formattedJson = JSON.stringify(content, null, 2);
        await fs.writeFile(DB_PATH, formattedJson, 'utf-8');
    } catch (error) {
        console.error('Error writing to JSON database:', error);
        throw error;
    }
};

module.exports = {
    readData,
    writeData
};

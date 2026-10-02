const cacheStorage = new Map();
const CACHE_TTL_MS = 60000; // 1 minute TTL in milliseconds

const cacheMiddleware = (req, res, next) => {
    const requestKey = req.url;
    const cachedRecord = cacheStorage.get(requestKey);

    if (cachedRecord) {
        const elapsedTime = Date.now() - cachedRecord.createdAt;
        if (elapsedTime <= CACHE_TTL_MS) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(cachedRecord.payload);
        }
        cacheStorage.delete(requestKey);
    }

    res.setHeader('X-Cache', 'MISS');
    const sendResponse = res.json.bind(res);

    res.json = function (body) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cacheStorage.set(requestKey, {
                payload: body,
                createdAt: Date.now()
            });
        }
        return sendResponse(body);
    };

    next();
};

const clearCache = () => {
    cacheStorage.clear();
};

module.exports = {
    cacheMiddleware,
    clearCache
};

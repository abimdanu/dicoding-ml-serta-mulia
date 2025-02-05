const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        "id": id,
        "result": label,
        "explanation": explanation,
        "suggestion": suggestion,
        "confidenceScore": confidenceScore,
        "createdAt": createdAt,
    }

    await storeData(id, data);

    return h.response({
        status: 'success',
        message: (confidenceScore > 99)
            ? 'Model predicted successfully'
            : 'Model predicted successfully, but under threshold. Please use a correct picture',
        data: data,
    }).code(201);
}

module.exports = postPredictHandler;
const postPredictHandler = require('./handler');

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                // Allows image data
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    }
]

module.exports = routes;
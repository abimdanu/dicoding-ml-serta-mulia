const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore({
    databaseId: '(default)',
})

async function storeData(id, data) {
    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(data);
}

module.exports = storeData;
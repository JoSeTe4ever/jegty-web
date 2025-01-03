import { MongoClient, ObjectId } from 'mongodb';
import { emailEncoder } from "./../helpers/idEncoder";

const uri = "your_mongodb_connection_string";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getJegtyUserById = async (jegtUserId) => {
    let user = {};
    if (jegtUserId) {
        await client.connect();
        const database = client.db('your_database_name');
        const users = database.collection('users');
        user = await users.findOne({ _id: new ObjectId(jegtUserId) });
    }
    return user;
};

const getGameById = async (jegtyGameId) => {
    let game = {};
    if (jegtyGameId) {
        await client.connect();
        const database = client.db('your_database_name');
        const games = database.collection('games');
        game = await games.findOne({ _id: new ObjectId(jegtyGameId) });
    }
    return game;
};

const getPendingFriendRequesFromUserEmail = async (userEmail) => {
    const encodedEmail = emailEncoder(userEmail);
    await client.connect();
    const database = client.db('your_database_name');
    const pendings = database.collection('pendings');
    const pendingIds = await pendings.find({ email: encodedEmail }).toArray();
    return pendingIds;
};

export { getJegtyUserById, getGameById, getPendingFriendRequesFromUserEmail };
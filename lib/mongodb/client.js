import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export const getCollection = async (collection = 'events') => {
	if (!client.topology?.isConnected()) {
		await client.connect();
	}

	return client.db().collection(collection);
};

export default client;

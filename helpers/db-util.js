import { MongoClient } from "mongodb";

export async function connectDataBase() {
  const client = await MongoClient.connect(
    "mongodb+srv://montebet2020:montebet2020@cluster0.hsdc8dj.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db("events");
  // тут лучше писать имя базы данных, иначе будет создана база данных с именем тест

    const result = await db.collection(collection).insertOne(document);
    return result;
}


export async function getAllDocuments(client, collection, sort) {
     const db = client.db("events");

    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray();
    return documents;
}



import { MongoClient } from "mongodb";
import {
  connectDataBase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  console.log(req.query);

  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDataBase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the databse failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Content field is missing" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      // ПРОВЕРИТЬ ЗДЕСЬ
      newComment._id = JSON.stringify(result.insertedId, null, 2);

      res.status(201).json({ message: "added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "getting comments failed." });
    }
  }

  client.close();
}

export default handler;

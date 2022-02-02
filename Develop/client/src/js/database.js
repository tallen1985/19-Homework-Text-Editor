// TODO: Install the following package:
import { openDB } from "idb";

// TODO: Complete the initDb() function below:
const initdb = async () =>
  openDB("cards", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("cards")) {
        console.log("cards database already exists");
        return;
      }
      db.createObjectStore("cards", { keyPath: "id", autoIncrement: true });
      console.log("cards database created");
    },
  });

// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
  console.log("Post to the database");

  // Create a connection to the database database and version we want to use.
  const cardsDb = await openDB("cards", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = cardsDb.transaction("cards", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("cards");

  // Use the .add() method on the store and pass in the content.
  const request = store.add({
    name: name,
    home: home,
    cell: cell,
    email: email,
  });

  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  console.log("GET all from the database");

  // Create a connection to the database database and version we want to use.
  const cardsDb = await openDB("cards", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = cardsDb.transaction("cards", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("cards");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log("DELETE from the database", id);
  const cardsDb = await openDB("cards", 1);
  const tx = cardsDb.transaction("cards", "readwrite");
  const store = tx.objectStore("cards");
  const request = store.delete(id);
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();

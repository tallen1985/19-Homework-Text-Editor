import { openDB } from "idb";

//initialize database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

//Add data to databse, all of it can be in one entry.
export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction(["jate"], "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

//get all the data from the DB
export const getDb = async () => {
  console.log("GET all from the database");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request[0];
  console.log("result.value", result);
  return result;
};

initdb();

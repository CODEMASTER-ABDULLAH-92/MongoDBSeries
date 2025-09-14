// Insert single document
const db = "data base Connection";
const users = "Collection name";

db.users.insertOne({ name: "Ali", age: 22, city: "Lahore" });

// Insert multiple documents
db.users.insertMany([
  { name: "Ayesha", age: 25, city: "Karachi" },
  { name: "Hamza", age: 30, city: "Islamabad" }
]);

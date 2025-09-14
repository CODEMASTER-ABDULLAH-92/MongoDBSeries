🟢 1. Basics & Architecture
📌 What is NoSQL & Why MongoDB?

NoSQL = “Not Only SQL” → designed for scalability and flexibility.

MongoDB is a document-oriented database where data is stored as JSON-like documents.

✅ Advantages:

Schema-less → you can add/remove fields anytime.

Easy horizontal scaling → great for big data.

Developer-friendly → works seamlessly with JS/Node.js.

🧩 BSON vs JSON

JSON → Human-readable, text-based format.

BSON → Binary JSON used by MongoDB internally.

✅ Benefits of BSON:

Stores additional data types (Date, Binary, Decimal128).

Faster parsing for machines.

More compact storage.

🗂 Collections & Documents

Document: A single record → { name: "Abdullah", age: 21 }.

Collection: A group of documents → like a table in SQL.

✅ Key Point: Collections are schema-flexible — you can have documents with different fields in the same collection.

🏗 Replica Sets & Sharding

Replica Set:

Group of MongoDB servers with automatic failover.

Ensures high availability (if primary goes down, a secondary becomes primary).

Sharding:

Splits data across multiple servers (horizontal scaling).

Allows you to handle massive datasets efficiently.
// 🔹 What is Indexing?

// Indexing in MongoDB is like the index of a book 📖.
// In a book, if you want to find "Chapter 5", you don’t read the whole book — you just look at the index.
// Similarly, in MongoDB, indexes make searching faster instead of scanning the whole collection.

// 🔹1. Without Index
// MongoDB scans every document in the collection to find a match.
// This is called a collection scan (slow when you have millions of documents).

// 🔹2. With Index
// MongoDB jumps directly to the documents you need (like a shortcut).
// This makes queries faster but uses extra memory to store indexes.

// 🔹 What does db.users.createIndex({ name: 1 }) mean?

// 👉 It does NOT search anything.
// 👉 It creates a shortcut (index) on the name field inside the users collection.

// So it’s telling MongoDB:

// “If I ever search users by their name, don’t scan the whole collection — use this shortcut.”

// 🔹 How does it work with find()?
// db.users.find({ name: "Ali" });

// Without index → MongoDB checks every document in users.
// With index → MongoDB jumps directly to the document where name = Ali.

// ==============================================

// * Single-field, Compound, and Multikey Indexes

// ==============================================


// createIndex is like creating chapters in a book.
// Names starting with A go into one section, B into another, … Z into another.
// When you find({ name: "Ali" }), MongoDB jumps straight to the "A" section instead of flipping every page.

// ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 🟢 Single-Field Index in MongoDB

// ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 📌 Insert sample data
db.users.insertMany([
  { name: "Ali", age: 25 },
  { name: "Sara", age: 30 },
  { name: "John", age: 28 }
]);

// 📌 Without index → full collection scan
db.users.find({ name: "Ali" });

// 📌 Create Single-field Index on "name" (1 = ascending, -1 = descending)
db.users.createIndex({ name: 1 });

// 📌 Now query is fast (uses index)
db.users.find({ name: "Ali" });

// 📝 Behind the scenes (sorted index list):
// Ali  → points to { name: "Ali", age: 25 }
// John → points to { name: "John", age: 28 }
// Sara → points to { name: "Sara", age: 30 }

// ✅ Key Points
// - Index on ONE field only
// - Speeds up search/sort on that field
// - Uses extra memory
// - Check usage: 
db.users.find({ name: "Ali" }).explain("executionStats");


// =====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 🟢 Single-Field Index in MongoDB

// ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// 📌 Insert sample data
db.users.insertMany([
  { name: "Ali", age: 25, city: "Lahore" },
  { name: "Sara", age: 30, city: "Karachi" },
  { name: "John", age: 28, city: "Lahore" }
]);

// 📌 Without index → full collection scan
db.users.find({ name: "Ali", age: 25 });

// 📌 Create Compound Index on "name" + "age"
db.users.createIndex({ name: 1, age: -1 });
// 1 = ascending, -1 = descending
// Order matters! (name first, then age)

// 📌 Queries that use this index efficiently:
db.users.find({ name: "Ali" });          // ✅ uses index (prefix: name)
db.users.find({ name: "Ali", age: 25 }); // ✅ uses index (name + age)

// ❌ This will NOT fully use index (age comes before name here):
db.users.find({ age: 25 });

// ✅ Key Points
// - Index on MULTIPLE fields (in order)
// - Great for queries filtering/sorting by those fields
// - Field order matters ("prefix rule")
// - Uses extra memory
// - Check usage:
db.users.find({ name: "Ali" }).explain("executionStats");



// =====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//  🟢 All in one 

// ====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 🟢 Index Types in MongoDB

// ========== 1) Single-Field Index ==========
db.users.insertMany([
  { name: "Ali", age: 25 },
  { name: "Sara", age: 30 },
  { name: "John", age: 28 }
]);

// Create index on one field
db.users.createIndex({ name: 1 });
// Fast search by "name"
db.users.find({ name: "Ali" });


// ========== 2) Compound Index ==========
db.users.insertMany([
  { name: "Ali", age: 25, city: "Lahore" },
  { name: "Sara", age: 30, city: "Karachi" },
  { name: "John", age: 28, city: "Lahore" }
]);

// Create index on two fields (order matters!)
db.users.createIndex({ name: 1, age: -1 });
// Fast search by name OR name+age
db.users.find({ name: "Ali", age: 25 });


// ========== 3) Multikey Index (for arrays) ==========
db.products.insertMany([
  { item: "Book", tags: ["study", "education"] },
  { item: "Phone", tags: ["tech", "gadget"] },
  { item: "Pen", tags: ["study", "office"] }
]);

// Create index on array field
db.products.createIndex({ tags: 1 });
// MongoDB automatically creates "multikey index"

// Fast search inside arrays
db.products.find({ tags: "study" });  // Matches Book & Pen


// ✅ Key Points
// - Single-field: index on ONE field
// - Compound: index on MULTIPLE fields (order matters, prefix rule)
// - Multikey: index on ARRAY fields (each element indexed separately)
// - All make queries faster but consume extra memory
// - Check index usage:
db.products.find({ tags: "study" }).explain("executionStats");

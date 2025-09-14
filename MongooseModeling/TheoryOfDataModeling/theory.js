// Data Modeling
// 1. Embedding vs Referencing

// In MongoDB, you can store related data in two ways:

// 🔹 Embedding (put data inside the same document)

// Best for small + tightly related data.

// Faster read (all data in one place).

// Not good if data grows very large.

// Example (Embed Orders inside User):

{
  "_id": 1,
  "name": "Abdullah",
  "orders": [
    { "item": "Laptop", "price": 1000 },
    { "item": "Phone", "price": 500 }
  ]
}


// ➡ Use embedding when:

// Relationship is 1-to-1 or 1-to-few

// Data is usually read together

// 🔹 Referencing (store IDs instead of full data)

// Best for large or frequently changing data.

// Saves space, avoids document growth issues.

// Requires an extra query ($lookup) if you want to join.

// Example (Users and Orders separate):

// users
{ "_id": 1, "name": "Abdullah" }

// orders
{ "_id": 101, "userId": 1, "item": "Laptop", "price": 1000 }
{ "_id": 102, "userId": 1, "item": "Phone", "price": 500 }


// ➡ Use referencing when:

// Relationship is 1-to-many (large) or many-to-many

// Data is changing frequently

// Documents could become too large
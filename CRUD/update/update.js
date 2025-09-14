// Update single document
db.users.updateOne(
  { name: "Ali" }, 
  { $set: { age: 23 } }
);

// Update multiple documents
db.users.updateMany(
  { city: "Karachi" }, 
  { $inc: { age: 1 } }  // increment age by 1
);

// Push value inside array field
db.users.updateOne(
  { name: "Ali" }, 
  { $push: { hobbies: "Cricket" } }
);



// 🔹 5. Upserts (Update + Insert)

// 👉 If document exists → update it, else insert a new one.

db.users.updateOne(
  { name: "Sara" }, 
  { $set: { age: 28, city: "Multan" } }, 
  { upsert: true }
);

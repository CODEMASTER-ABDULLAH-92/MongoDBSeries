// Get all documents
db.users.find();

// Get single document
db.users.findOne({ name: "Ali" });

// Use projections (select specific fields)
db.users.find({}, { name: 1, city: 1, _id: 0 });

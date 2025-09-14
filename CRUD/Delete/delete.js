// Delete single document
db.users.deleteOne({ name: "Hamza" });

// Delete multiple documents
db.users.deleteMany({ city: "Lahore" });

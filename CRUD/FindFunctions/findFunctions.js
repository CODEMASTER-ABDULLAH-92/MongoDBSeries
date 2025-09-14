// find()
// findOne()
// findById()
// findOneAndUpdate()
// findByIdAndUpdate()
// findOneAndDelete()
// findByIdAndDelete()




import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/testDB");

  // --- Create some users ---
  await User.create([
    { name: "Ali", age: 22 },
    { name: "Sara", age: 25 },
    { name: "Hamza", age: 30 },
  ]);

  // 1. find() → get all matching docs
  const allUsers = await User.find({});
  console.log("find():", allUsers);

  // 2. findOne() → get first matching doc
  const oneUser = await User.findOne({ age: 25 });
  console.log("findOne():", oneUser);

  // 3. findById() → find by _id
  const firstUserId = allUsers[0]._id;
  const byId = await User.findById(firstUserId);
  console.log("findById():", byId);

  // 4. findOneAndUpdate() → update first match
  const updatedOne = await User.findOneAndUpdate(
    { name: "Ali" },
    { age: 23 },
    { new: true } // return updated doc
  );
  console.log("findOneAndUpdate():", updatedOne);

  // 5. findByIdAndUpdate() → update by _id
  const updatedById = await User.findByIdAndUpdate(
    firstUserId,
    { age: 24 },
    { new: true }
  );
  console.log("findByIdAndUpdate():", updatedById);

  // 6. findOneAndDelete() → delete first match
  const deletedOne = await User.findOneAndDelete({ name: "Sara" });
  console.log("findOneAndDelete():", deletedOne);

  // 7. findByIdAndDelete() → delete by _id
  const deletedById = await User.findByIdAndDelete(firstUserId);
  console.log("findByIdAndDelete():", deletedById);

  await mongoose.disconnect();
}

run().catch(err => console.error(err));




// ⚡ Quick Memory Hack:
// find() → all
// findOne() → first match
// findById() → match by _id
// ...AndUpdate → update + return
// ...AndDelete → delete + return

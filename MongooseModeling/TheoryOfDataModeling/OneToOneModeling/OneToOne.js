// 🟢 One-to-One Relationship in MongoDB

// 👉 A One-to-One (1:1) relationship means:

// One document in a collection is related to exactly one document in another collection.

// Example:

// A User has one Profile.

// A Car has one Engine.

// ✅ Example: User ↔ Profile

// 1. User Schema

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Reference to Profile (1-to-1)
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  }
});

const User = mongoose.model("User", userSchema);

// 2. Profile Schema

const profileSchema = new mongoose.Schema({
  age: Number,
  gender: String,
  address: String,
  // Reference back to User (optional but helpful)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Profile = mongoose.model("Profile", profileSchema);

// 3. Creating Data
// Create Profile
const profile = await Profile.create({
  age: 22,
  gender: "Male",
  address: "Lahore"
});

// 2. Create User and link Profile
const user = await User.create({
  name: "Abdullah",
  email: "abdullah@gmail.com",
  profile: profile._id
});

// 3. Update Profile with User (optional back reference)
await Profile.findByIdAndUpdate(profile._id, { user: user._id });



// Get user with profile
// 4. Fetching Data (Populate)
const userWithProfile = await User.findOne({ name: "Abdullah" }).populate("profile");

console.log(userWithProfile);

// Result 


// {
//   "_id": "64abc123",
//   "name": "Abdullah",
//   "email": "abdullah@gmail.com",
//   "profile": {
//     "_id": "64def456",
//     "age": 22,
//     "gender": "Male",
//     "address": "Lahore"
//   }
// }

// 📝 Key Notes (Easy Concepts)

// Why use One-to-One?
// When each entity must have exactly one related entity.
// Example: User → Profile, Passport → Person.
// Modeling ways:
// Embedding → Put profile directly inside user.
// Referencing → Use ObjectId (ref) → ✅ more flexible.
// Use embedding if profile is small & always needed.
// Use referencing if profile is large or optional.
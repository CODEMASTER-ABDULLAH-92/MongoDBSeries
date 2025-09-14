// 🟢 One-to-Many Relationship in MongoDB

// 👉 A One-to-Many (1:N) relationship means:

// One document is related to many documents.

// Example:

// A User has many Posts.

// A Customer has many Orders

// ✅ Example: User ↔ Posts
// 1. User Schema
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // An array of post references (1-to-many)
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

const User = mongoose.model("User", userSchema);

// 2. Post Schema

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  // Reference back to User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Post = mongoose.model("Post", postSchema);


// 3. Creating Data

// 1. Create User
const user = await User.create({
  name: "Abdullah",
  email: "abdullah@gmail.com"
});

// 2. Create Posts linked to the User
const post1 = await Post.create({
  title: "My First Post",
  content: "This is awesome!",
  user: user._id
});

const post2 = await Post.create({
  title: "My Second Post",
  content: "MongoDB is powerful.",
  user: user._id
});

// 3. Update User with Post references
await User.findByIdAndUpdate(user._id, {
  $push: { posts: { $each: [post1._id, post2._id] } }
});


// Get user with posts
const userWithPosts = await User.findOne({ name: "Abdullah" }).populate("posts");
// "posts" = the field name in the schema that contains the reference(s).
// Not the model name.
//  like in the above 

const userSchema = new mongoose.Schema({
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"   // Mongoose uses this ref to know the model
    }
  ]
});


// After fetching the result of this 

// {
//   "_id": "64abc123",
//   "name": "Abdullah",
//   "email": "abdullah@gmail.com",
//   "posts": [
//     {
//       "_id": "64def456",
//       "title": "My First Post",
//       "content": "This is awesome!"
//     },
//     {
//       "_id": "64ghi789",
//       "title": "My Second Post",
//       "content": "MongoDB is powerful."
//     }
//   ]
// }


// 📝 Key Notes (Easy Concepts)

// One-to-Many = Parent → Children
// Example: One User → Many Posts.

// ✅ Scales well when posts are many.
// ✅ Use .populate() to fetch full details.




//  The difference between the one to many and the we paste the userId in the every post and the real apps uses this way not using the one-to-many approach 
// 📝 Which is Better?
// 👉 For social media apps (many posts per user):
// ✅ Approach 1 (store userId in posts) is better because it:
// Scales better (millions of posts possible).
// Keeps documents small and manageable.
// Querying is simple: Post.find({ userId }).
// 👉 Use Approach 2 (One-to-Many) if:
// Each user has only a few posts (like profile pictures, 1–10 posts).
// You always fetch posts together with the user.
// ⚡ Conclusion:
// For a real social media platform → Approach 1 (userId in posts) is the best practice.

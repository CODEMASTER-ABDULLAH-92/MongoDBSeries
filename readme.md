🟢 1. Basics & Architecture
* What is NoSQL & why MongoDB? (Document-oriented database benefits)
* BSON vs JSON (internal storage format)
* Collections & Documents
* Replica Sets & Sharding (Basics of scalability & high availability)

🟢 2. CRUD Operations
* insertOne(), insertMany()
* find(), findOne(), projections
* updateOne(), updateMany(), $set, $inc, $push
* deleteOne(), deleteMany()
* Upserts (update + insert in one)
* populate();

🟢 3. Data Modeling
* Embedding vs Referencing (when to use which)
* One-to-One, One-to-Many, Many-to-Many relationships in MongoDB
<!-- * Schema design patterns (Bucket Pattern, Outlier Pattern, Extended Reference Pattern) Pending  -->

🟢 4. Indexing
* Single-field, Compound, and Multikey Indexes
<!-- * Text Indexes, Partial Indexes, Sparse Indexes (Pending) -->
* explain() to analyze query performance
* When to use indexes (and when NOT to)


🟢 5. Aggregation Framework
* $match, $group, $sort, $project, $lookup (joins)
* Pipelines and stages
* $facet, $bucket, $unwind
* Real-world aggregation examples (analytics, filtering, report generation)

🟢 6. Transactions & ACID
* Multi-document transactions
* startTransaction() and session-based operations
* Rollback behavior & consistency guarantees

🟢 7. Performance & Scaling
* Replication basics (Replica sets, failover)
* Sharding (shard key, balancing)
* Caching strategies with MongoDB
* Profiling slow queries

🟢 8. Security
* Role-based access control (RBAC)
* Authentication & Authorization
* Data encryption at rest & in transit

🟢 9. Integration with Code
* Using Mongoose (Node.js ODM) – schemas, models, middleware, validation
* Connection pooling & error handling
* Writing efficient queries in backend code

🟢 10. Advanced Topics (for Senior SWE/SDE)
* Change Streams (real-time notifications)
* Time Series Collections
* TTL Indexes (auto-expiring documents)
* Schema validation with JSON Schema


Create the db 
```
use db_name
```

Create the Collection 
```
db.createCollection(collection_name)
```
---


Show the db 
```
show dbs
```

shows the Collections 
```
show collections
```
---
Delete or drop the Collection or database

Delete The Collection
```
collection_name.drop()
```

Delete The Database
```
db.dropDatabase()
```
## CRUD OP
---
*Insert Operation*
```
db.users.insertOne({name:"abdullah"})
```
*InsertMany* 
```
db.users.insertMany([{name:"rajab"},{name:"abdullah2"}])

```

## Read
Read only one colume
```
db.users.find({},{name:1,_id:0})
```
Find the specific name
```
db.users.find({name:"abdullah"})
```

```
db.user.find({ "orders.shippingAddress.city": "Multan" })
```


## UPdate the 
update One 
UPdate the many
```
db.user.updateMany({},{$set:{color:"Red"}})
```
Update One 
```
db.user.updateOne(
...   { name: "Ali Raza" },
...   { $set: { name: "Ali Raza2" } }
... );
```
- update the single Element of the Array

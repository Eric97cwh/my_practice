1. What is the event loop in Node.js?
The event loop is Node.js's mechanism for handling asynchronous operations. It allows Node to perform non-blocking I/O despite being single-threaded by:

Continuously checking the call stack and task queues.

Executing callbacks when the stack is empty.

Prioritizing microtasks (Promises, process.nextTick) over macrotasks (setTimeout, I/O).

Example:
console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');

Output:
Start
End
Promise
Timeout
===========================================================================
2. How does Node.js handle asynchronous operations?
Node.js offloads async operations (I/O, timers) to system APIs (via libuv). When complete, callbacks are queued:

Non-blocking: The main thread isn't blocked during I/O.

Event-driven: Callbacks execute when the operation finishes.

Example:
const fs = require('fs');
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data); // Executes after file read completes
});
console.log('Reading file...'); // Runs immediately
=========================================================================
3. What is the difference between setImmediate and setTimeout?
Feature	    setImmediate	            setTimeout
Phase	    Check phase	                Timers phase
Execution	After I/O callbacks	        After minimum delay (ms)
Use Case	Defer execution post-I/O	Schedule future execution

Example:
setImmediate(() => console.log('Immediate'));
setTimeout(() => console.log('Timeout'), 0);
// Order may vary, but Immediate usually runs first
========================================================================
4. How do you manage dependencies in a Node.js project?
Use npm or yarn:
Install: npm install <package>
Version Control: package.json lists dependencies.
Lockfile: package-lock.json locks versions.
Audit: npm audit checks vulnerabilities.
Best Practices:
Use semantic versioning (^1.2.3).
Separate dev/prod dependencies (--save-dev).
Update regularly (npm update).
========================================================================
5. Explain the middleware pattern in Express.js.
Middleware functions process requests sequentially. They can:
Modify req/res objects.
End the request-response cycle.
Call next() to pass control.

Example:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass to next middleware
});
=======================================================================
6. How do you handle errors in Node.js?
Synchronous: Use try/catch.
Asynchronous:
Callbacks: Check err parameter.
Promises: .catch() or try/catch with async/await.
Express: Error-handling middleware.

Example:
app.get('/', (req, res, next) => {
  try {
    throw new Error('Oops!');
  } catch (err) {
    next(err); // Forward to error handler
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
===================================================================
7. What is the purpose of the cluster module?
The cluster module enables multi-core utilization by:
Creating child processes (workers) sharing server ports.
Load balancing across CPUs.

Example:
const cluster = require('cluster');
if (cluster.isMaster) {
  for (let i = 0; i < 4; i++) cluster.fork(); // 4 workers
} else {
  require('./server.js'); // Each worker runs the server
}
================================================================
8. How do you optimize the performance of a Node.js application?
Technique	        Example	                            Benefit
Caching	            Redis for frequent data	            Reduces DB load
Clustering	        cluster module	                    Utilizes multiple CPUs
Streams	            fs.createReadStream()	            Low memory usage
Compression	        compression middleware	            Smaller response size
Load Balancing	    Nginx reverse proxy	                Distributes traffic
Profiling	        node --inspect + Chrome DevTools	Identifies bottlenecks

Example redis caching:
const redis = require('redis');
const client = redis.createClient();

app.get('/data', (req, res) => {
  client.get('cachedData', (err, data) => {
    if (data) return res.send(data); // Cache hit
    // Cache miss: fetch from DB and cache
    db.query('SELECT * FROM data', (err, result) => {
      client.setex('cachedData', 3600, JSON.stringify(result)); // Cache for 1h
      res.send(result);
    });
  });
});
=================================================================
9. What is the Event Loop, and how does it work?
The event loop is a mechanism that allows Node.js to perform non-blocking I/O operations by continuously checking the call stack and callback queue.
=================================================================
10. What is the difference between setImmediate and setTimeout?
setImmediate runs in the Check phase, while setTimeout runs in the Timers phase.
=================================================================
11. What is the difference between process.nextTick and setImmediate?
process.nextTick runs immediately after the current operation, while setImmediate runs in the next iteration of the event loop.
=================================================================
12. How can you block the Event Loop?
Long-running synchronous operations (e.g., heavy computations) can block the event loop.
=================================================================
13. How do you handle CPU-intensive tasks in Node.js?
Use worker threads or offload tasks to child processes.
=================================================================
14. What is the difference between let, const, and var?

Feature	        var	                let	                const
Scope	        Function-scoped	    Block-scoped	    Block-scoped
Hoisting	    Hoisted (undefined)	Hoisted (TDZ*)	    Hoisted (TDZ*)
Reassign	    Allowed	            Allowed	            Not allowed
Redeclare	    Allowed	            Not allowed	        Not allowed
*TDZ = Temporal Dead Zone (cannot be accessed before declaration).

Example:
console.log(a); // undefined (var hoisted)
var a = 1;

console.log(b); // ReferenceError (let in TDZ)
let b = 2;

const c = 3;
c = 4; // TypeError (reassignment)
=================================================================
15. Explain closures with an example.
A closure is a function that retains access to its lexical scope even when executed outside that scope.

example:
function outer() {
  const secret = "123";
  return function inner() {
    console.log(secret); // Accesses `secret` from outer scope
  };
}
const innerFunc = outer();
innerFunc(); // "123" (closure preserves scope)
=================================================================
16. How does the this keyword work in JavaScript?
this refers to the execution context:
Global: window (browser) / global (Node) in non-strict mode, undefined in strict mode.
Object Method: The owning object.
Constructor: The new instance.
Arrow Functions: Inherits from parent scope.

example:
const obj = {
  name: "Alice",
  greet: function() {
    console.log(this.name); // "Alice" (obj context)
  },
  arrowGreet: () => {
    console.log(this.name); // undefined (inherits global `this`)
  }
};
obj.greet();
=================================================================
17. What is the Event Loop, and how does it work?
The event loop enables async execution in JavaScript:
Call Stack: Executes synchronous code.
Callback Queue: Holds async callbacks (I/O, timers).
Microtask Queue: Holds higher-priority callbacks (Promises).
Event Loop: Moves tasks from queues to stack when stack is empty.

example:
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

output:
Start
End
Promise
Timeout
=================================================================
18. What are Promises, and how do they differ from callbacks?

Feature	        Callbacks	        Promises
Readability	    Callback hell	    Chainable .then()
Error Handling	Manual err checks	.catch() centralized
State	        No states	        Pending/Fulfilled/Rejected

example:
// Callback
fs.readFile("file.txt", (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});

// Promise
fs.promises.readFile("file.txt")
  .then(data => console.log(data))
  .catch(err => console.error(err));
=================================================================
19. Explain the difference between == and ===.
== (Loose Equality): Converts types before comparison.
=== (Strict Equality): No type conversion.

"5" == 5;   // true (type coercion)
"5" === 5;  // false (different types)
=================================================================
20. What is hoisting, and how does it work?
Hoisting moves declarations (not initializations) to the top of their scope:
var: Hoisted, initialized as undefined.
let/const: Hoisted but remain in TDZ until declaration.

console.log(x); // undefined (var hoisted)
var x = 1;

console.log(y); // ReferenceError (let in TDZ)
let y = 2;

=========
AWS
=========
EC2 - provide instances in the cloud. Hosting web applications, running backend services, and performing compute-intensive tasks.
RDS - it is a relational database system that support mysql, oracle, mariadb, sqlServer and postgresql
DynamoDB - is support nosql like mongodb 
S3 -  is an object storage service for storing and retrieving large amounts of data like image, videos, backup and logs.
Lambda - Lambda lets you run code without provisioning or managing servers. Event-driven tasks (e.g., processing uploaded files, sending notifications), APIs, and microservices.
API Gateway - API Gateway is a fully managed service for creating, publishing, and managing APIs. Building RESTful APIs, handling authentication, and rate limiting.
IAM - IAM allows you to manage access to AWS services and resources securely. Creating users, groups, and roles with specific permissions.
Cloudwatch - Monitoring application performance, setting alarms, and logging.
Elastic Beanstalk - Elastic Beanstalk is a fully managed service for deploying and scaling web applications. Deploying Node.js, Python, Java, etc., applications without managing infrastructure.

========
MySQL
========
1. Core MySQL Concepts
-- Create
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

-- Read
SELECT * FROM users WHERE id = 1;
SELECT name, email FROM users ORDER BY created_at DESC LIMIT 10;

-- Update
UPDATE users SET name = 'Jane' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;

2. Database Design & Optimization
-- Index (speed up queries)
CREATE INDEX idx_email ON users(email);  -- Single-column
CREATE INDEX idx_name_age ON users(name, age);  -- Composite index

EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

Normalization (Avoid Data Duplication)
Form	Rule
1NF	No repeating groups (e.g., store orders in a separate table).
2NF	All non-key columns depend on the entire primary key.
3NF	No transitive dependencies (e.g., user_age shouldn’t depend on user_birthdate).

3. Advanced MySQL Topics
Transactions (ACID Compliance)
START TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;
COMMIT;  -- Or ROLLBACK on error

Isolation Levels:
READ UNCOMMITTED (dirty reads) → SERIALIZABLE (strictest).
Default in MySQL: REPEATABLE READ.

Stored Procedures (Interview Question Favorite)
DELIMITER //
CREATE PROCEDURE GetUserOrders(IN userId INT)
BEGIN
  SELECT * FROM orders WHERE user_id = userId;
END //
DELIMITER ;
-- Call it
CALL GetUserOrders(1);

Common Table Expressions (CTEs)
WITH active_users AS (
  SELECT * FROM users WHERE last_login > NOW() - INTERVAL 30 DAY
)
SELECT * FROM active_users WHERE age > 18;

4. Performance Tuning
Slow Query Fixes
Add Missing Indexes (Check with EXPLAIN).

Avoid SELECT * → Fetch only needed columns.

Optimize Joins → Ensure joined columns are indexed.

Use LIMIT for pagination.

Connection Pooling
Why? Reusing DB connections improves performance.

Tools: mysql2 (Node.js), HikariCP (Java).

5. Real-World Scenarios (Interview Questions)
How do you backup a MySQL database?
mysqldump -u [user] -p[database] > backup.sql

How to find duplicate emails in a table?
SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;

How to optimize a table with millions of rows?
Partitioning, indexing, archiving old data.

6. Tools & Commands
Command/Tool	      Purpose
SHOW TABLES;	      List all tables
DESCRIBE users;	    Show table structure
mysqldump	          Backup database
pt-query-digest	    Analyze slow queries (Percona Toolkit)

==============================
Slow Query

EXPLAIN SELECT * FROM orders WHERE user_id = 5 ORDER BY created_at DESC;
Bad Output:

type: ALL (full table scan)

key: NULL (no index used)

Extra: Using filesort (slow sorting)
================================
Optimized Query

Add an index:
CREATE INDEX idx_user_created ON orders(user_id, created_at);

Re-run EXPLAIN:
type: ref (index lookup)
key: idx_user_created
Extra: Using index (no filesort)

===================================
Paging Example
===================================
const getListingsWithDistance = async (req, res) => {
    try {
        const { latitude, longitude, page = 1, limit = 10 } = req.query;
        
        if (!latitude || !longitude) {
            return res.status(400).json({ status: 400, message: "Latitude and Longitude are required" });
        }
        
        const userId = req.user.userId;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);
        
        const offset = (pageNumber - 1) * pageSize;

        const { count, rows } = await Listing.findAndCountAll({
            where: { user_id: userId },
            limit: pageSize,
            offset: offset,
            order: [['created_at', 'DESC']]
        });

        const totalPages = Math.ceil(count / pageSize);

        const listingsWithDistance = rows.map(listing => {
            const distance = calculateDistance(
                parseFloat(latitude), 
                parseFloat(longitude), 
                listing.latitude, 
                listing.longitude
            );
            
            return {
                id: listing.id,
                name: listing.name,
                distance: distance.toFixed(2),
                created_at: listing.created_at,
                updated_at: listing.updated_at
            };
        });

        res.status(200).json({
            status: 200,
            message: "Listings retrieved successfully",
            result: {
                current_page: pageNumber,
                last_page: totalPages,
                total: count,
                data: listingsWithDistance
            }
        });
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
};






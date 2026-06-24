"use server";

import { currentUser } from "@clerk/nextjs/server";

const MOCK_QUESTIONS = {
  FRONTEND: [
    {
      question: "Explain the difference between Server Components and Client Components in Next.js.",
      answer: "Server Components render on the server, minimizing bundle size and enabling direct database access. Client Components render on the client (or are pre-rendered on the server) and allow interactivity using React hooks like useState and useEffect."
    },
    {
      question: "What is the Critical Rendering Path and how do you optimize it?",
      answer: "The Critical Rendering Path is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels on screen. You optimize it by minimizing DOM size, deferring non-critical JS, inlining critical CSS, and optimizing resource delivery via preload/dns-prefetch."
    },
    {
      question: "How does the 'use' hook in React 19 differ from standard promise handling?",
      answer: "The 'use' hook can consume Promises and Context directly inside loops, conditional statements, and early returns, whereas other hooks like useEffect or useContext are restricted to top-level scopes."
    },
    {
      question: "What is hydration mismatch in Next.js and how do you fix it?",
      answer: "Hydration mismatch occurs when the pre-rendered HTML on the server doesn't match the first render in the browser. It is fixed by ensuring components render the same content, using suppressHydrationWarning on elements displaying dynamic data like dates, or wrapping client-only components in dynamic imports with ssr: false."
    },
    {
      question: "How does CSS specificity work and how does Tailwind v4 handle cascades?",
      answer: "Specificity is the weight applied to a CSS rule. Tailwind v4 introduces native CSS cascade layers using @layer directives to organize utility styles, ensuring custom overrides always take precedence over base utility values cleanly."
    },
    {
      question: "What is cross-site scripting (XSS) and how does React prevent it?",
      answer: "XSS is a vulnerability where an attacker injects malicious scripts into trusted websites. React automatically escapes strings rendered in JSX, and developers must explicitly use dangerouslySetInnerHTML to render unescaped raw HTML."
    }
  ],
  BACKEND: [
    {
      question: "What is connection pooling and why is it important in relational databases?",
      answer: "Connection pooling maintains a cache of active database connections that can be reused for future requests, avoiding the high overhead of establishing a new TCP connection on every API call. This significantly improves backend performance and prevents database exhaustion."
    },
    {
      question: "How does JWT-based authentication work and what are its security risks?",
      answer: "JWT authentication works by signing a payload containing user details and storing it client-side. The server validates the signature to authenticate requests. Security risks include XSS/CSRF token theft, inability to easily revoke active tokens, and storing sensitive data in the unencrypted payload."
    },
    {
      question: "What is the difference between SQL and NoSQL databases, and when would you use each?",
      answer: "SQL databases are relational, schema-enforced, and support complex JOINs and ACID transactions, ideal for financial or structured applications. NoSQL databases are schema-less, scale horizontally, and use formats like document, key-value, or graph, ideal for high-write, unstructured datasets."
    },
    {
      question: "How do you implement rate limiting in a Node.js REST API?",
      answer: "Rate limiting is implemented using middleware (e.g. with Redis to track request counts per IP or token over a time window). It blocks excessive requests, protecting the server from brute force attacks and denial-of-service."
    },
    {
      question: "Explain the concept of database indexing and how it affects read/write performance.",
      answer: "Indexing creates a data structure (like a B-Tree) that allows the database engine to find rows rapidly without scanning the entire table. While it speeds up SELECT queries (reads), it slows down INSERT, UPDATE, and DELETE operations (writes) because the index must also be updated."
    },
    {
      question: "What is a deadlock in database transactions and how can you prevent it?",
      answer: "A deadlock occurs when two or more transactions are waiting for each other to release locks, causing a circular dependency. Prevent deadlocks by keeping transactions short, accessing tables/rows in a consistent order across the app, and using optimistic concurrency control or query timeouts."
    }
  ],
  FULLSTACK: [
    {
      question: "Explain how Server-Side Rendering (SSR) differs from Static Site Generation (SSG).",
      answer: "SSR generates HTML dynamically on the server for each incoming request, ensuring content is always fresh at the cost of higher latency. SSG builds pages at build time, serving static files directly from a CDN for instant loading, though contents may become stale."
    },
    {
      question: "How would you design a system to handle real-time notifications for millions of users?",
      answer: "Implement a publish-subscribe model (e.g., using Redis Pub/Sub) and establish persistent WebSocket connections between the servers and client browsers. Push messages to the user's active WebSocket connection, and fall back to polling or push notifications for offline users."
    },
    {
      question: "What is CORS (Cross-Origin Resource Sharing) and how does it protect web apps?",
      answer: "CORS is a browser-enforced security mechanism that uses HTTP headers to define which origins are permitted to access resources on a server. It prevents malicious scripts on one site from reading sensitive data from another site's APIs."
    },
    {
      question: "What is database migration and why is it essential in teams?",
      answer: "Database migrations are version-controlled scripts that define database schema changes over time. They ensure all environments (development, staging, production) stay synchronized and permit safe, repeatable alterations to tables, columns, and constraints."
    },
    {
      question: "How would you implement optimistic locking vs pessimistic locking in a Fullstack application?",
      answer: "Optimistic locking checks a version field before updating a row and fails if the version has changed, ideal for low-contention environments. Pessimistic locking locks the database row explicitly (e.g. SELECT FOR UPDATE) from read to write, blocking others until the transaction completes."
    },
    {
      question: "What is the role of an API Gateway in microservice architectures?",
      answer: "An API Gateway acts as a single entry point for all client requests, routing them to the appropriate microservices. It handles cross-cutting concerns like authentication, SSL termination, request rate limiting, and API composition."
    }
  ],
  DSA: [
    {
      question: "Explain the difference between Depth First Search (DFS) and Breadth First Search (BFS).",
      answer: "DFS explores as far as possible along each branch before backtracking, utilizing a stack (or recursion). BFS explores all neighbors at the current depth before moving to the next level, utilizing a queue. BFS is useful for finding the shortest path on unweighted graphs."
    },
    {
      question: "What is time and space complexity, and how is it represented using Big O notation?",
      answer: "Big O notation describes the upper bound of execution time or memory space required by an algorithm as a function of input size. Time complexity measures the number of operations, while space complexity measures auxiliary memory used during execution."
    },
    {
      question: "How does a hash table resolve collision, and what are the average and worst-case complexities?",
      answer: "Collisions occur when two keys map to the same bucket. They are resolved via chaining (linked lists or BSTs at each bucket) or open addressing (linear probing, quadratic probing). Average lookup complexity is O(1), but can degrade to O(N) if the hash function is poor or load factor is high."
    },
    {
      question: "Explain the difference between Dynamic Programming and Divide and Conquer.",
      answer: "Divide and Conquer breaks a problem into independent subproblems and solves them recursively (e.g. Merge Sort). Dynamic Programming solves overlapping subproblems, saving the results of subproblems in a table (memoization or tabulation) to avoid redundant computation."
    },
    {
      question: "What is a binary search tree (BST) and what are its traversal algorithms?",
      answer: "A BST is a node-based binary tree where the left subtree contains values less than the parent, and the right subtree contains values greater. Traversal algorithms include In-order (produces sorted order), Pre-order (good for copying a tree), and Post-order (good for deleting a tree)."
    },
    {
      question: "Explain the working of Quick Sort and its worst-case complexity.",
      answer: "Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element, partitions the array such that elements smaller than the pivot go to the left and larger to the right, and then recursively sorts the sub-arrays. Its worst-case time complexity is O(N^2) (e.g. if the pivot is always the min/max), but average complexity is O(N log N)."
    }
  ],
  SYSTEM_DESIGN: [
    {
      question: "What is horizontal scaling versus vertical scaling?",
      answer: "Vertical scaling increases the resources (CPU, RAM) of a single server, which is simple but capped by hardware limits and creates a single point of failure. Horizontal scaling adds more machines to the pool, requiring a load balancer to distribute traffic, which scales indefinitely."
    },
    {
      question: "Explain the CAP theorem and its implications on distributed systems.",
      answer: "The CAP theorem states that a distributed system can guarantee at most two out of three characteristics: Consistency (all nodes see the same data at the same time), Availability (every request receives a response), and Partition Tolerance (the system continues to operate despite node communication failures). In practice, systems must choose between Consistency (CP) and Availability (AP) during a network partition."
    },
    {
      question: "What is a Content Delivery Network (CDN) and how does it improve system design?",
      answer: "A CDN is a geographically distributed network of proxy servers that cache static and dynamic assets (images, JS, HTML) closer to the end users. This reduces latency, saves origin server bandwidth, and protects against high-traffic spikes."
    },
    {
      question: "How do database replication and database sharding differ?",
      answer: "Replication copies the exact same database schema and data to multiple nodes (e.g., master-slave) to increase read throughput and ensure high availability. Sharding splits the dataset horizontally across multiple databases based on a partition key to scale write throughput and storage capacity."
    },
    {
      question: "What is caching, and how do Cache-Aside, Write-Through, and Write-Back policies work?",
      answer: "Caching stores frequently accessed data in memory (like Redis) for fast retrieval. In Cache-Aside, the application queries the cache, and on miss, reads the DB and updates cache. In Write-Through, data is written to the cache and DB simultaneously. In Write-Back, data is written to the cache first, and lazily synced to the DB."
    },
    {
      question: "Explain the difference between load balancing algorithms (Round Robin, Least Connections, IP Hash).",
      answer: "Round Robin forwards requests sequentially down a list of servers. Least Connections directs traffic to the server with the fewest active connections, ideal for long-running requests. IP Hash computes a hash from the client's IP to assign a server, ensuring the user maintains session state on the same server."
    }
  ],
  BEHAVIORAL: [
    {
      question: "Describe the STAR method and why it is recommended for behavioral questions.",
      answer: "The STAR method stands for Situation, Task, Action, and Result. It provides a structured, concise format to tell a story about past experience, demonstrating problem-solving, teamwork, and clear communication under interview pressure."
    },
    {
      question: "How do you handle disagreement with a technical decision made by your manager or tech lead?",
      answer: "Disagree and commit: voice concerns constructively by presenting data-backed trade-offs, alternative approaches, and user impacts. Once a decision is made, align fully with the team and focus on executing it successfully without harbor of resentment."
    },
    {
      question: "Describe a time you had to deal with a severe production outage. How did you react?",
      answer: "Prioritize mitigation over root-cause investigation: roll back the recent change, spin up healthy instances, or apply a quick patch. Keep stakeholders updated with clear communication, and once the system is stable, conduct a blameless post-mortem to prevent recurrence."
    },
    {
      question: "How do you manage tight deadlines when scope creep begins to threaten delivery?",
      answer: "Communicate proactively with product managers and stakeholders. Detail the timeline risks, identify the core minimum viable product (MVP) requirements, negotiate deferring low-priority features to future sprints, and align on a realistic delivery path."
    },
    {
      question: "Tell me about a time you mentored a junior engineer. What was your approach?",
      answer: "Focus on empowering them rather than just solving their bugs. Guide them through pairing sessions, review their PRs with constructive explanations, set clear milestones, recommend learning resources, and encourage safe failure to build their independent confidence."
    },
    {
      question: "How do you stay motivated and prioritize tasks when working on high-pressure, ambiguous projects?",
      answer: "Break down the ambiguous scope into small, concrete milestones. Define a priority matrix separating critical blockers from nice-to-haves, maintain clear daily targets, celebrate small wins, and solicit feedback early to ensure alignment."
    }
  ],
  DEVOPS: [
    {
      question: "What is CI/CD and why is it crucial for modern software teams?",
      answer: "Continuous Integration (CI) automates compiling, linting, and testing code whenever a developer pushes a branch, detecting bugs early. Continuous Delivery/Deployment (CD) automates deploying verified builds to staging and production, enabling fast, low-risk releases."
    },
    {
      question: "Explain the difference between Docker containers and Virtual Machines (VMs).",
      answer: "Virtual Machines include a full guest operating system and run on physical hardware via a hypervisor, consuming high resources. Docker containers share the host operating system kernel and run isolated processes in user space, making them lightweight, fast to boot, and highly portable."
    },
    {
      question: "What is Infrastructure as Code (IaC) and what are its benefits?",
      answer: "IaC defines and manages infrastructure (compute, network, storage) using configuration files (like Terraform or CloudFormation) instead of manual dashboard clicks. Benefits include version control, reproducibility, auditing, and speed."
    },
    {
      question: "How does blue-green deployment differ from rolling deployment?",
      answer: "Blue-green deployment maintains two identical production environments (Blue is active, Green is idle). New code is deployed to Green, tested, and router traffic is swapped instantly. Rolling deployment updates instances incrementally in batches within a single environment, minimizing resources but resulting in mixed version traffic during rollout."
    },
    {
      question: "What is dynamic application security testing (DAST) vs static application security testing (SAST)?",
      answer: "SAST inspects raw source code or binaries for vulnerabilities offline (like a linter for security). DAST tests a running application externally, simulating attacks (e.g. SQL injection, XSS) to find vulnerabilities exposed in the live execution environment."
    },
    {
      question: "Explain the role of Prometheus and Grafana in production monitoring.",
      answer: "Prometheus is a time-series database that pulls performance metrics (CPU, RAM, API error rates) from targets at regular intervals. Grafana queries Prometheus to build interactive dashboards, charts, and alert triggers, giving visibility into system health."
    }
  ],
  MOBILE: [
    {
      question: "How does React Native bridge communication work between JavaScript and Native layers?",
      answer: "In the legacy architecture, the Bridge serialized asynchronous JSON messages to pass data between JS and Native threads. In the new architecture (Fabric/TurboModules), the JavaScript Interface (JSI) enables direct, synchronous C++ call bindings, improving performance significantly."
    },
    {
      question: "Explain the mobile app lifecycle states and how to handle background transitions.",
      answer: "Lifecycle states include Active (foreground), Background (inactive), and Suspended. When transitioning to the background, save critical user state, cancel heavy network tasks, and release unnecessary memory to prevent the OS from terminating the process."
    },
    {
      question: "How do you optimize mobile app performance and startup time?",
      answer: "Optimize by using Hermes engine, lazy-loading heavy screens, optimizing image assets, caching data locally (e.g. with MMKV), minifying bundle size, avoiding inline functions in renders, and deferring non-essential initializations."
    },
    {
      question: "What is CodePush and how does it help mobile release management?",
      answer: "CodePush (App Center) allows developers to push JS bundle and asset updates directly to users' devices bypass the standard App Store and Google Play review delays, ideal for quick bug fixes that don't involve native binary changes."
    },
    {
      question: "Describe the differences between iOS auto-layout and React Native flexbox layout.",
      answer: "iOS auto-layout relies on constraints (equations defining relationships between views). React Native layout uses a custom C engine (Yoga) to compute flexbox layouts, which is a subset of the web CSS Flexbox standard and layouts nodes linearly."
    },
    {
      question: "How do you handle offline sync and data persistence in mobile apps?",
      answer: "Persist data locally using SQLite, WatermelonDB, or MMKV. Use sync libraries (like TanStack Query or custom synchronizers) to store user updates locally while offline, track mutation queues, and push changes to the backend once a stable internet connection is restored."
    }
  ]
};

export const generateInterviewQuestions = async ({ category }) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  if (!category || !MOCK_QUESTIONS[category])
    throw new Error("Invalid category");

  // Simulate network latency (200ms - 500ms) for realistic UX
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 200));

  const questions = MOCK_QUESTIONS[category];
  return { questions };
};
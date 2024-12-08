<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog API Documentation</title>
    <style>
        :root {
            --primary-color: #3498db;
            --secondary-color: #2c3e50;
            --background-color: #f4f4f4;
            --text-color: #333;
            --code-background: #e8e8e8;
            --border-color: #ddd;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--background-color);
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1, h2, h3 {
            color: var(--primary-color);
        }

        h1 {
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: 10px;
        }

        code {
            background-color: var(--code-background);
            padding: 2px 4px;
            border-radius: 4px;
            font-family: 'Courier New', Courier, monospace;
        }

        pre {
            background-color: var(--code-background);
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
        }

        ul, ol {
            padding-left: 20px;
        }

        .section {
            margin-bottom: 30px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 20px;
        }

        .highlight {
            background-color: #fff3cd;
            padding: 10px;
            border-left: 4px solid #ffc107;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            border: 1px solid var(--border-color);
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: var(--primary-color);
            color: white;
        }

        .collapsible {
            background-color: var(--primary-color);
            color: white;
            cursor: pointer;
            padding: 18px;
            width: 100%;
            border: none;
            text-align: left;
            outline: none;
            font-size: 15px;
        }

        .active, .collapsible:hover {
            background-color: #2980b9;
        }

        .content {
            padding: 0 18px;
            display: none;
            overflow: hidden;
            background-color: #f1f1f1;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Blog API Documentation</h1>

        <div class="section">
            <h2>Project Setup</h2>
            <p>This project is a RESTful API for a blog application using <strong>NestJS</strong>, <strong>TypeScript</strong>, <strong>Firebase Authentication</strong>, <strong>Prisma ORM</strong>, and <strong>Postgres Database</strong>. The project allows authenticated users to perform CRUD operations on blog posts with role-based access control (RBAC) and pagination.</p>
        </div>

        <div class="section">
            <h2>Requirements</h2>
            <ul>
                <li><strong>Node.js</strong> and <strong>Express.js (via NestJS framework)</strong></li>
                <li><strong>Postgres</strong> database</li>
                <li><strong>Firebase Authentication</strong></li>
                <li><strong>Prisma ORM</strong> for database operations</li>
                <li><strong>pnpm</strong> as the package manager</li>
                <li><strong>Environment variables</strong> for configuration</li>
            </ul>
        </div>

        <div class="section">
            <h2>Prerequisites</h2>
            <ol>
                <li><strong>Node.js:</strong> Install <a href="https://nodejs.org/">Node.js</a> (version 16+ recommended).</li>
                <li><strong>Postgres:</strong> Ensure a running instance of Postgres.</li>
                <li><strong>pnpm:</strong> Install pnpm globally:
                    <pre><code>npm install -g pnpm</code></pre>
                </li>
            </ol>
        </div>

        <button class="collapsible">Project Structure</button>
        <div class="content">
            <pre><code>
dist/                     # Compiled output
node_modules/             # Dependencies
prisma/                   # Prisma schema and migrations
src/                      # Source code
  ├── auth/               # Firebase authentication module
  ├── posts/              # Blog posts module (controllers, services, DTOs)
  ├── common/             # Common utilities (interceptors, guards, etc.)
test/                     # Unit and integration tests
uploads/                  # Local image storage for posts
.env                      # Environment variables
firebase-service-account.json # Firebase service account credentials
package.json              # Project metadata and dependencies
pnpm-lock.yaml            # Lockfile for dependencies
README.md                 # Project documentation
            </code></pre>
        </div>

        <div class="section">
            <h2>Setup Instructions</h2>
            <h3>1. Clone the Repository</h3>
            <pre><code>git clone &lt;repository_url&gt;
cd &lt;repository_folder&gt;</code></pre>

            <h3>2. Install Dependencies</h3>
            <pre><code>pnpm install</code></pre>

            <h3>3. Set Up Environment Variables</h3>
            <p>Create a <code>.env</code> file in the project root and provide the following:</p>
            <pre><code>DATABASE_URL=postgresql://&lt;user&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/&lt;database&gt;
FIREBASE_PROJECT_ID=&lt;your_firebase_project_id&gt;
FIREBASE_PRIVATE_KEY=&lt;your_firebase_private_key&gt;
FIREBASE_CLIENT_EMAIL=&lt;your_firebase_client_email&gt;
UPLOAD_PATH=./uploads</code></pre>

            <h3>4. Set Up Firebase</h3>
            <p>Obtain the Firebase service account file and place it in the project root as <code>firebase-service-account.json</code>.</p>

            <h3>5. Set Up Prisma</h3>
            <p>Generate the Prisma client:</p>
            <pre><code>pnpm prisma generate</code></pre>
            <p>Apply migrations:</p>
            <pre><code>pnpm prisma migrate dev</code></pre>

            <h3>6. Run the Application</h3>
            <p>Start the development server:</p>
            <pre><code>pnpm start:dev</code></pre>
            <p>For production:</p>
            <pre><code>pnpm build
pnpm start:prod</code></pre>
        </div>

        <div class="section">
            <h2>API Endpoints</h2>
            <h3>Authentication</h3>
            <p>Authentication is handled via Firebase JWT tokens. Include the token in the Authorization header of requests:</p>
            <pre><code>Authorization: Bearer &lt;firebase_jwt_token&gt;</code></pre>

            <h3>Blog Endpoints</h3>
            <table>
                <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                    <th>Auth Required</th>
                    <th>Notes</th>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/posts</td>
                    <td>Retrieve all blog posts</td>
                    <td>Yes</td>
                    <td>Supports pagination</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/posts/:id</td>
                    <td>Retrieve a specific post</td>
                    <td>Yes</td>
                    <td></td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/posts</td>
                    <td>Create a new blog post</td>
                    <td>Yes</td>
                    <td>Requires title, content, image</td>
                </tr>
                <tr>
                    <td>PUT</td>
                    <td>/posts/:id</td>
                    <td>Update a blog post by ID</td>
                    <td>Yes</td>
                    <td></td>
                </tr>
                <tr>
                    <td>DELETE</td>
                    <td>/posts/:id</td>
                    <td>Delete a blog post by ID</td>
                    <td>Yes</td>
                    <td>Admin only</td>
                </tr>
            </table>
        </div>

        <button class="collapsible">Features</button>
        <div class="content">
            <h3>1. Firebase Authentication</h3>
            <ul>
                <li>Users authenticate via Firebase.</li>
                <li>JWT tokens are used for securing API access.</li>
            </ul>

            <h3>2. CRUD Operations</h3>
            <ul>
                <li>Full Create, Read, Update, Delete functionality for blog posts.</li>
                <li>Blog posts have attributes:
                    <ul>
                        <li>id: Auto-generated UUID.</li>
                        <li>title: String, required.</li>
                        <li>content: String, required.</li>
                        <li>image: Uploaded to local storage.</li>
                    </ul>
                </li>
            </ul>

            <h3>3. RBAC (Role-Based Access Control)</h3>
            <ul>
                <li>Roles:
                    <ul>
                        <li>admin: Full access.</li>
                        <li>user: Limited access (cannot delete posts).</li>
                    </ul>
                </li>
                <li>Guard implemented using custom Firebase claims.</li>
            </ul>

            <h3>4. Pagination</h3>
            <ul>
                <li>List posts with query parameters:
                    <ul>
                        <li>page: Current page number (default: 1).</li>
                        <li>limit: Number of posts per page (default: 10).</li>
                    </ul>
                </li>
            </ul>

            <h3>5. Error Handling and Validation</h3>
            <ul>
                <li>Comprehensive validation with DTOs.</li>
                <li>Centralized exception filters.</li>
            </ul>
        </div>

        <div class="section">
            <h2>Testing</h2>
            <h3>Unit Tests</h3>
            <pre><code>pnpm test</code></pre>
            <h3>Integration Tests</h3>
            <pre><code>pnpm test:e2e</code></pre>
        </div>

        <div class="section">
            <h2>Deployment</h2>
            <h3>1. Build the Project</h3>
            <pre><code>pnpm build</code></pre>
            <h3>2. Run Migrations on the Server</h3>
            <pre><code>pnpm prisma migrate deploy</code></pre>
            <h3>3. Start the Application</h3>
            <pre><code>pnpm start:prod</code></pre>
        </div>

        <div class="section">
            <h2>Postman Documentation</h2>
            <p>Import the <code>Blog-api.postman_collection.json</code> file into Postman to test the endpoints.</p>
        </div>

        <div class="highlight">
            <h3>Notes</h3>
            <ul>
                <li>Ensure the <code>uploads</code> directory has proper write permissions.</li>
                <li>Secure the <code>firebase-service-account.json</code> file and <code>.env</code> file.</li>
                <li>Adjust CORS settings in <code>src/main.ts</code> if deploying to a frontend.</li>
            </ul>
        </div>
    </div>

    <script>
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    </script>
</body>
</html>
# Benjamin Okumu Portfolio

A modern portfolio website built with the MENN stack (MongoDB, Express.js, Next.js, Node.js) to showcase skills, projects, work experience, and certifications.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Benja988/portfolio.git
   cd portfolio

2. **Frontend Setup (client)**
    ```bash
    cd client
    npm install
    npm run dev

3. **Backend Setup (server)**
    ```bash
    cd server
    npm install
    npm run dev

4. **Environment VariablesCreate a .env file in the server directory with:**
    ```bash
    MONGO_URI=mongodb://localhost/portfolio
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

5. **Database Setup**
Ensure MongoDB is running locally or use a cloud MongoDB service.

6. **Deployment**
    Deploy the Next.js app to Vercel or similar platforms.
    Deploy the Express.js server to a Node.js-compatible host (e.g., Heroku, Render).
    Configure Cloudinary for media uploads.

*Features*
    Responsive design with Tailwind CSS
    Authentication with NextAuth.js and JWT
    Admin dashboard to manage projects and skills
    Cloudinary integration for project image uploads
    SEO optimized with Next.js server-side rendering
    Type-safe with TypeScript










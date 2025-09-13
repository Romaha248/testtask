# 🦸 Superheroes App

Fullstack project with **Node.js/Express backend** and **React frontend**.  
The backend provides a REST API for managing heroes, and the frontend consumes it.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

Install for both **backend** and **frontend**:

```bash
cd backend && npm install
cd ../frontend && npm install
cd ..
```

Alternatively (Linux/Mac):

```bash
npm install
```

---

## ⚙️ Environment Variables

The backend requires some environment variables to work.  
Create a `.env` file inside the `backend` and `frontend` folder.

Example(backend):

```env
DATABASE_URL=your_database_connection_string
PORT=5000
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

Example(frontend):

```env
VITE_API_BASE_URL=your_API_connection_string
```

## 🏃 Running the App

### Start backend

```bash
cd backend
npm run devStart
```

### Start frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

Now you should have:

- **Backend API** running on `http://localhost:5000`
- **Frontend** running on `http://localhost:5173` (default Vite port)

---

## 🔄 Run Both Together (optional)

If you want to run **frontend + backend in one command** from the root directory:

1. Install [concurrently](https://www.npmjs.com/package/concurrently) in root:

   ```bash
   npm install --save-dev concurrently
   ```

2. Add this to the **root `package.json`**:

   ```json
   {
     "scripts": {
       "dev": "concurrently \"npm run devStart --prefix backend\" \"npm run dev --prefix frontend\""
     }
   }
   ```

3. Run everything:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```
root/
 ├─ backend/     # Express + MongoDB API
 │   └─ package.json
 ├─ frontend/    # React + Vite
 │   └─ package.json
 ├─ README.md
 └─ package.json (optional root scripts for dev)
```

---

## 🛡️ Notes

- **Do not commit `.env`** with real secrets.
- You can replace `DATABASE_URL` with a free MongoDB Atlas cluster string.
- Cloudinary is used for image storage(and also u can use your CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY).
- For VITE_API_BASE_URL u must use your localhost url - `http://localhost:5000` for example(if you use PORT=5000)

---

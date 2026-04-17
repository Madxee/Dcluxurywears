# DC Luxury Wears - Backend API

Full-stack backend for the DC Luxury Wears e-commerce platform. Built with Node.js, Express, MongoDB, and Cloudinary.

---

## Features

- **REST API** for products, orders, and settings
- **Image Upload** via Cloudinary (product images, payment proofs, CEO image)
- **JWT Authentication** for admin dashboard
- **MongoDB Database** with Mongoose ODM
- **Payment Proof Upload** - customers upload bank transfer receipts
- **Admin Settings** - update CEO image, bank details, site config

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js + Express | Server framework |
| MongoDB + Mongoose | Database |
| Cloudinary | Image storage & CDN |
| JWT | Authentication |
| Multer | File upload handling |
| bcryptjs | Password hashing |
| CORS | Cross-origin requests |

---

## Prerequisites

1. **Node.js** v18+ installed
2. **MongoDB Atlas** account (free tier works)
3. **Cloudinary** account (free tier works)

---

## Step-by-Step Setup

### 1. Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Click **Database Access** → Add New Database User
4. Click **Network Access** → Add IP Address → Allow from anywhere (`0.0.0.0/0`)
5. Go to **Database** → Click **Connect** → **Drivers** → **Node.js**
6. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dc-luxury?retryWrites=true&w=majority
   ```

### 2. Get Cloudinary Credentials

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free
3. Go to **Dashboard**
4. Copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Configure Environment Variables

Edit the `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/dc-luxury?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here_make_it_long_and_random
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@dcluxury.com
ADMIN_PASSWORD_HASH=$2a$10$changeme
```

**To generate the admin password hash**, run this once:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('admin123', 10));"
```

Replace `$2a$10$changeme` with the generated hash.

### 4. Install Dependencies

```bash
npm install
```

### 5. Seed the Database

Populate with sample products:

```bash
npm run seed
```

### 6. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server runs on `http://localhost:5000`

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current admin |

### Products (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (supports `?category=`, `?search=`, `?featured=true`, `?new=true`) |
| GET | `/api/products/:id` | Get single product |

### Products (Admin - requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Orders (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |

### Orders (Admin - requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | List all orders |
| GET | `/api/orders/:id` | Get single order |
| PUT | `/api/orders/:id/status` | Update order status |
| DELETE | `/api/orders/:id` | Delete order |

### Settings (Public GET, Admin PUT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings` | Get site settings |
| PUT | `/api/settings` | Update settings |

### Upload (Admin - requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload/image` | Upload single image |
| POST | `/api/upload/images` | Upload multiple images |

### Upload (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload/payment-proof` | Upload payment proof |

---

## Deploy Backend to Render (Free)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Render

1. Go to [Render](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Name**: `dc-luxury-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables (from your `.env` file)
6. Click **Create Web Service**

Your API will be live at `https://dc-luxury-api.onrender.com`

---

## Connect Frontend to Backend

After deploying the backend, update the frontend API URL:

### Option 1: Environment Variable (Recommended)

Create a `.env` file in the frontend root:
```env
VITE_API_URL=https://dc-luxury-api.onrender.com/api
```

Then rebuild:
```bash
cd ../app
npm run build
```

### Option 2: Direct Edit

Edit `src/api/index.ts` and change:
```typescript
const API_URL = 'https://dc-luxury-api.onrender.com/api';
```

---

## Admin Login Credentials

- **Email**: `admin@dcluxury.com`
- **Password**: `admin123` (or whatever you set during hash generation)

---

## Folder Structure

```
dc-luxury-backend/
  config/
    database.js       # MongoDB connection
    cloudinary.js     # Cloudinary config + upload middleware
  middleware/
    auth.js           # JWT verification
  models/
    Product.js        # Product schema
    Order.js          # Order schema
    Settings.js       # Site settings schema
  routes/
    auth.js           # Auth endpoints
    products.js       # Product CRUD
    orders.js         # Order management
    settings.js       # Site settings
    upload.js         # File upload endpoints
  .env                 # Environment variables
  seed.js              # Database seeder
  server.js            # Entry point
  README.md            # This file
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check IP whitelist in Atlas, verify credentials |
| Images not uploading | Verify Cloudinary credentials, check file size < 5MB |
| CORS errors | Ensure `cors` middleware is enabled (it is by default) |
| JWT errors | Check `JWT_SECRET` is set, token hasn't expired |
| 500 errors | Check server logs with `console.error()` |

---

## Security Notes

1. Change the default `JWT_SECRET` to a long random string
2. Change the default admin password
3. Never commit `.env` to version control
4. Use MongoDB Atlas IP whitelist for production
5. Enable Cloudinary's authenticated requests for sensitive images

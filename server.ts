import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Mock Database ---
  const products = [
    { id: "1", name: "13 Diamonds", price: 26, discount: 1.5, popular: false, bonus: 0, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
    { id: "2", name: "35 Diamonds", price: 70, discount: 1.5, popular: false, bonus: 0, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
    { id: "3", name: "70 Diamonds", price: 140, discount: 1.5, popular: true, bonus: 0, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
    { id: "4", name: "140 Diamonds", price: 280, discount: 1.5, popular: false, bonus: 0, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
    { id: "5", name: "355 Diamonds", price: 710, discount: 1.5, popular: true, bonus: 35, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
    { id: "6", name: "713 Diamonds", price: 1426, discount: 1.5, popular: false, bonus: 70, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
    { id: "7", name: "1426 Diamonds", price: 2852, discount: 1.5, popular: true, bonus: 140, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
    { id: "8", name: "3565 Diamonds", price: 7130, discount: 1.5, popular: false, bonus: 350, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
    { id: "9", name: "7130 Diamonds", price: 14260, discount: 1.5, popular: true, bonus: 710, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
    { id: "10", name: "14260 Diamonds", price: 28520, discount: 1.5, popular: false, bonus: 1400, image: "https://images.unsplash.com/photo-1614811514919-f033cf031cca?auto=format&fit=crop&q=80&w=200" },
  ];

  let orders: any[] = [
    {
      id: "ORD-123456",
      userId: "user-1",
      gameId: "123456789",
      nickname: "GamerPro",
      productId: "3",
      productName: "70 Diamonds",
      amount: 140,
      status: "completed",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    }
  ];

  let users: any[] = [
    { id: "user-1", email: "user@example.com", name: "Test User", password: "password", balance: 5000, role: "user" },
    { id: "admin-1", email: "admin@diamondrush.com", name: "Admin", password: "adminpassword", role: "admin" }
  ];

  // --- API Routes ---

  // Auth
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token: "mock-jwt-token" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  app.post("/api/auth/register", (req, res) => {
    const { email, name, password } = req.body;
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = { id: `user-${Date.now()}`, email, name, password, balance: 0, role: "user" };
    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ user: userWithoutPassword, token: "mock-jwt-token" });
  });

  // Products
  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  // Orders
  app.get("/api/orders", (req, res) => {
    const { userId } = req.query;
    if (userId) {
      res.json(orders.filter(o => o.userId === userId));
    } else {
      res.json(orders);
    }
  });

  app.post("/api/orders", (req, res) => {
    const { userId, gameId, nickname, productId, amount } = req.body;
    const product = products.find(p => p.id === productId);
    const newOrder = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId,
      gameId,
      nickname,
      productId,
      productName: product?.name || "Unknown Product",
      amount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    res.json(newOrder);
  });

  // Admin Routes
  app.get("/api/admin/stats", (req, res) => {
    const totalRevenue = orders.filter(o => o.status === "completed").reduce((acc, o) => acc + o.amount, 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;
    res.json({
      revenue: totalRevenue,
      orders: totalOrders,
      users: totalUsers,
      recentActivity: orders.slice(-5).reverse(),
      revenueData: [
        { name: "Mon", total: 400 },
        { name: "Tue", total: 300 },
        { name: "Wed", total: 500 },
        { name: "Thu", total: 200 },
        { name: "Fri", total: 700 },
        { name: "Sat", total: 900 },
        { name: "Sun", total: 600 },
      ]
    });
  });

  app.patch("/api/admin/orders/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      res.json(orders[orderIndex]);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  });

  // --- Vite / Static Handling ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

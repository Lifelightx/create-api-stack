<div align="center">

  <h1>🚀 Create ServerKit</h1>

  <p><strong>The fastest way to scaffold a robust, production-ready Express API.</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/create-serverkit"><img src="https://img.shields.io/npm/v/create-serverkit.svg?style=for-the-badge&color=fbbf24&labelColor=2d3748" alt="NPM version"></a>
    <a href="https://www.npmjs.com/package/create-serverkit"><img src="https://img.shields.io/npm/dt/create-serverkit.svg?style=for-the-badge&color=3b82f6&labelColor=2d3748" alt="NPM downloads"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-6366f1?style=for-the-badge&labelColor=2d3748" alt="License"></a>
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-roadmap">Roadmap</a>
  </p>

</div>

---

## 🧐 Why ServerKit?

Setting up a new Express project usually involves hours of boilerplate: configuring folders, setting up environment variables, connecting databases, adding middleware, and fixing TypeScript errors.

**ServerKit** does all of this for you in **under 10 seconds**. It’s not just a folder creator; it’s a pre-configured architecture that follows industry best practices.

## ✨ Key Features

- **⚡ Blazing Fast**: Scaffolds your entire project in seconds.
- **�️ Type Safe**: Choice of **TypeScript** or **Modern JavaScript (ESM)**.
- **🗄️ Database Choice**: Integrated support for **MongoDB (Mongoose)** and **Postgres (Sequelize)**.
- **📦 Docker Ready**: One-click Dockerization with `Dockerfile` and `docker-compose`.
- **🌐 Network Visibility**: Automatically displays your Local and Network IP for easy testing on other devices.
- **🔒 Production Ready**: Includes security middleware (Helmet, CORS, Rate Limiting) and Graceful Shutdown logic.
- **🏗️ Organized**: Clean, modular folder structure (MVC Pattern).

---

## � Quick Start

You don't even need to install it. Just run:

```bash
npx create-serverkit my-awesome-api
```

### Or scaffold in your current folder:

```bash
npx create-serverkit .
```

---

## 🛠️ The Experience

When you start your new server, you'll see a beautiful, informative dashboard:

```text
🚀 Server is ready!
  - Local:    http://localhost:5000
  - Network:  http://192.168.1.5:5000

Mode: development
```

## 📁 Project Structure

```text
my-api/
├── src/
│   ├── config/         # Database and environment config
│   ├── controllers/    # Route controllers (Business logic)
│   ├── middleware/     # Auth, error handling, and logging
│   ├── models/         # Database schemas/models
│   ├── routes/         # API Route definitions
│   ├── app.js          # Express app setup
│   └── server.js       # Entry point & listener
├── .env.example        # Environment variable template
├── .gitignore          # Pre-configured git rules
├── package.json        # scripts: dev, start, build
└── README.md           # Your project's documentation
```

---

## 🔧 Requirements

- **Node.js**: 16.x or higher
- **NPM**: 7.x or higher

## 🗺️ Roadmap

- [x] JWT Authentication boilerplate.
- [x] Full PostgreSQL Support.
- [x] Network IP visibility on start.
- [ ] Redis caching integration.
- [ ] Fastify Framework support.
- [ ] Automated Testing (Vitest/Jest).

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Lifelightx">Lifelightx</a>
</p>

const config = {
  host: "localhost",
  port: 3000,
  database: {
    user: "admin",
    password: "secret",
    options: {
      ssl: true,
      timeout: 5000,
    },
  },
  features: ["auth", "logging", "cache"],
};

function connectDatabase(options) {
  if (!options) throw new Error("Options required");
  const connection = {
    host: options.host || "localhost",
    port: options.port || 3000,
    secure: options.ssl === true,
  };
  return connection;
}

class UserManager {
  constructor(config) {
    this.config = config;
    this.users = [];
  }

  addUser(name, email, role = "user") {
    if (!name || !email) {
      throw new Error("Name and email required");
    }
    const user = {
      id: Date.now(),
      name: name,
      email: email,
      role: role,
      createdAt: new Date(),
      active: true,
    };
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.find(u => u.id === id);
  }

  getAllUsers() {
    return this.users.filter(user => user.active);
  }
}
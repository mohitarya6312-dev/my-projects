const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

async function createUser() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/featureflags";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Get email and password from command line arguments or use defaults
    const email = process.argv[2] || process.env.USER_EMAIL || "mohitarya6312@gmail.com";
    const password = process.argv[3] || process.env.USER_PASSWORD || "password123";
    const role = process.argv[4] || process.env.USER_ROLE || "admin";

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️  User already exists!");
      console.log(`   Email: ${email}`);
      console.log(`   Role: ${existingUser.role}`);
      console.log(`   To change password, delete this user first or update manually.`);
      await mongoose.disconnect();
      return;
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name: email.split("@")[0],
      role,
    });

    console.log("✅ User account created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:    " + email);
    console.log("🔑 Password: " + password);
    console.log("👤 Role:     " + role);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("⚠️  Please change the password after first login!");

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error creating user:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the script
createUser();


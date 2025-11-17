const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

async function createOwner() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/featureflags";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Default owner credentials
    const ownerEmail = process.env.OWNER_EMAIL || "owner@admin.com";
    const ownerPassword = process.env.OWNER_PASSWORD || "admin123";

    // Check if owner already exists
    const existingOwner = await User.findOne({ email: ownerEmail });
    if (existingOwner) {
      console.log("⚠️  Owner already exists!");
      console.log(`   Email: ${ownerEmail}`);
      console.log(`   Role: ${existingOwner.role}`);
      console.log(`   To change password, delete this user first or update manually.`);
      await mongoose.disconnect();
      return;
    }

    // Create owner user
    const owner = await User.create({
      email: ownerEmail,
      password: ownerPassword,
      name: "Owner",
      role: "admin",
    });

    console.log("✅ Owner account created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:    " + ownerEmail);
    console.log("🔑 Password: " + ownerPassword);
    console.log("👤 Role:     admin");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("⚠️  Please change the password after first login!");

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error creating owner:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the script
createOwner();


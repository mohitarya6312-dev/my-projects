const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

async function updateRole() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/featureflags";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Get email and role from command line arguments
    const email = process.argv[2] || process.env.USER_EMAIL || "mohitarya6312@gmail.com";
    const newRole = process.argv[3] || process.env.USER_ROLE || "admin";

    // Validate role
    const validRoles = ["admin", "developer", "viewer"];
    if (!validRoles.includes(newRole)) {
      console.log("❌ Invalid role! Must be: admin, developer, or viewer");
      await mongoose.disconnect();
      return;
    }

    // Find and update user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found!");
      console.log(`   Email: ${email}`);
      await mongoose.disconnect();
      return;
    }

    user.role = newRole;
    await user.save();

    console.log("✅ Role updated successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:    " + email);
    console.log("👤 New Role: " + newRole);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error updating role:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the script
updateRole();


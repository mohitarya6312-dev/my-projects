const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

async function resetPassword() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/featureflags";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Get email and new password from command line arguments
    const email = process.argv[2] || process.env.USER_EMAIL || "mohitarya6312@gmail.com";
    const newPassword = process.argv[3] || process.env.NEW_PASSWORD || "password123";

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found!");
      console.log(`   Email: ${email}`);
      await mongoose.disconnect();
      return;
    }

    // Update password (will be hashed automatically by pre-save hook)
    user.password = newPassword;
    await user.save();

    console.log("✅ Password reset successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:    " + email);
    console.log("🔑 New Password: " + newPassword);
    console.log("👤 Role:     " + user.role);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error resetting password:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the script
resetPassword();


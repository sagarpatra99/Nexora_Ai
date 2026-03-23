import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on URL: http://localhost:${PORT}`);
    });
  } catch (errorerr) {
    console.error("✗ Failed to start server:", error.message);
    process.exit(1); // ✅ kill process if DB fails
  }
};

startServer();

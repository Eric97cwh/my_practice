const express = require("express");
const sequelize = require("./database");
const userRoutes = require("././src/routes/userRoutes");
const User = require("./src/models/User"); // Ensure model is registered

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

// Export the raw app object for testing
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}
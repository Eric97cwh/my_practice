import express, { json } from "express";
import sequelize from "./database.js";
import userRoutes from "././src/routes/userRoutes.js";
import { pathToFileURL } from 'url';

const app = express();
app.use(json());
app.use("/api", userRoutes);

// Export the raw app object for testing
export default app;

// Start the server only if this file is run directly
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const PORT = process.env.PORT || 3000;
  sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}
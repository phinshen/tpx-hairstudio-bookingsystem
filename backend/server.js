let express = require("express");
const userRoutes = require("./routes/users");
const pool = require("./db");
const cors = require("cors");
const authenticateToken = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

async function getPostgresVersion() {
  const client = await pool.connect();
  try {
    const response = await client.query("SELECT version()");
    console.log(response.rows[0]);
  } finally {
    client.release();
  }
}

getPostgresVersion();

// -------------------------- fetching booking list -----------------------------
app.get("/bookings", authenticateToken, async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM bookings ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});

// -------------------------- creating booking list -----------------------------
app.post("/bookings", async (req, res) => {
  const client = await pool.connect();

  try {
    const { title, description, date, time, phone_number, email, user_id } =
      req.body;
    const result = await client.query(
      "INSERT INTO bookings (title, description, date, time, phone_number, email, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, description, date, time, phone_number, email, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking posting failed" });
  } finally {
    client.release();
  }
});

// -------------------------- updating booking list -----------------------------
app.put("/bookings/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { title, description, date, time, phone_number, email, user_id } =
      req.body;

    const result = await client.query(
      `UPDATE bookings SET title = $1, description = $2, date = $3, time = $4, phone_number = $5, email = $6, user_id = $7 WHERE id = $8 RETURNING *`,
      [title, description, date, time, phone_number, email, user_id, id]
    );
    res.json({
      message: "Booking update successfully!",
      update: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  } finally {
    client.release();
  }
});

// -------------------------- deleting booking list -----------------------------
app.delete("/bookings/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const result = await client.query(
      `DELETE FROM bookings WHERE id = $1 RETURNING *`,
      [id]
    );
    res.json({
      message: "Booking deleted successfully!",
      deleted: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

app.get("/", async (req, res) => {
  res.send("Booking System API is running!");
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});

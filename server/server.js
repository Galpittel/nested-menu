import { menuData } from "./dummyData.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3500;

// const menuData = [
//   {
//     id: 1,
//     data: "Home",
//     children: [],
//   },
//   {
//     id: 2,
//     data: "Products",
//     children: [
//       {
//         id: 3,
//         data: "Laptops",
//         children: [
//           {
//             id: 4,
//             data: "Gaming Laptops",
//           },
//           {
//             id: 5,
//             data: "Business Laptops",
//           },
//         ],
//       },
//       {
//         id: 6,
//         data: "Smartphones",
//       },
//     ],
//   },
//   {
//     id: 7,
//     data: "Contact Us",
//   },
// ];

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const items = menuData;

// Create (POST) a new user
app.post("/items", (req, res) => {
  const newUser = req.body;
  items.push(newUser);
  res.status(201).json(newUser);
});

// Read (GET) all users
app.get("/items", (req, res) => {
  res.json(items);
});

// Read (GET) a specific user by ID
app.get("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(item);
  }
});

// Update (PUT) a user by ID
app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex((i) => i.id === itemId);

  if (index === -1) {
    res.status(404).json({ message: "Item not found" });
  } else {
    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
  }
});

// Delete (DELETE) a user by ID
app.delete("/items/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === userId);

  if (index === -1) {
    res.status(404).json({ message: "User not found" });
  } else {
    items.splice(index, 1);
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

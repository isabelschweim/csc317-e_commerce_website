// Shopping Cart backend implementation

//*******************************************************
//* POST /cart/add
//* Body: { user_id, product_id, quantity }
//*******************************************************

app.post("/cart/add", (req, res) => {
  const { user_id, product_id, quantity } = req.body;
    // Check product stock
  db.get("SELECT stock FROM Products WHERE product_id = ?", [product_id], (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ error: "Product not found!" });
    if (product.stock < quantity) return res.status(400).json({ error: "Not enough stock available." });

    // Check if product already in cart
    db.get(
      "SELECT quantity FROM Cart WHERE user_id = ? AND product_id = ?",
      [user_id, product_id],
      (err, cartItem) => {
        if (err) return res.status(500).json({ error: err.message });

        if (cartItem) {
          const newQuantity = cartItem.quantity + quantity;
          db.run(
            "UPDATE Cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
            [newQuantity, user_id, product_id],
            () => {
              db.run("UPDATE Products SET stock = stock - ? WHERE product_id = ?", [quantity, product_id]);
              res.json({ message: "Item quantity updated in cart." });
            }
          );
        } else {
          db.run(
            "INSERT INTO Cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
            [user_id, product_id, quantity],
            () => {
              db.run("UPDATE Products SET stock = stock - ? WHERE product_id = ?", [quantity, product_id]);
              res.json({ message: "Item added to cart successfully." });
            }
          );
        }
      }
    );
  });
});

//*******************************************************
//* GET /cart/:user_id
//* View the cart for a specific user
//*******************************************************

app.get("/cart/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  db.all(
    `SELECT Products.name, Products.price, Cart.quantity
     FROM Cart
     JOIN Products ON Cart.product_id = Products.product_id
     WHERE Cart.user_id = ?`,
    [user_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!rows.length) return res.json({ message: "Your cart is empty!" });

      let total = 0;
      const cart = rows.map((item) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal,
        };
      });

      res.json({ cart, total });
    }
  );
});

//*******************************************************
//* POST /cart/update
//* Body: { user_id, product_id, quantity }
//*******************************************************

app.post("/cart/update", (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  db.get(
    "SELECT quantity FROM Cart WHERE user_id = ? AND product_id = ?",
    [user_id, product_id],
    (err, cartItem) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!cartItem) return res.status(404).json({ error: "Item not found in cart." });

      const difference = quantity - cartItem.quantity;

      db.run("UPDATE Cart SET quantity = ? WHERE user_id = ? AND product_id = ?", [quantity, user_id, product_id], () => {
        db.run("UPDATE Products SET stock = stock - ? WHERE product_id = ?", [difference, product_id]);
        res.json({ message: "Cart updated successfully." });
      });
    }
  );
});

//*******************************************************
//* DELETE /cart/remove
//* Body: { user_id, product_id }
//*******************************************************

app.delete("/cart/remove", (req, res) => {
  const { user_id, product_id } = req.body;

  db.get("SELECT quantity FROM Cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, cartItem) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!cartItem) return res.status(404).json({ error: "Item not found in cart." });

    db.run("UPDATE Products SET stock = stock + ? WHERE product_id = ?", [cartItem.quantity, product_id], () => {
      db.run("DELETE FROM Cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], () => {
        res.json({ message: "Item removed from cart." });
      });
    });
  });
});

//*******************************************************
//* POST /cart/checkout
//* Body: { user_id }
//*******************************************************

app.post("/cart/checkout", (req, res) => {
  const { user_id } = req.body;

  db.all("SELECT product_id, quantity FROM Cart WHERE user_id = ?", [user_id], (err, cartItems) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!cartItems.length) return res.json({ message: "Your cart is empty!" });

    db.run("DELETE FROM Cart WHERE user_id = ?", [user_id], () => {
      res.json({ message: "Checkout successful! Your order has been placed." });
    });
  });
});

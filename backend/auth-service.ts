const bcrypt = require("bcryptjs");

const loginUser = async (email, password, pool, session) => {
    try {
      // Check if user exists
      const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userQuery.rows.length === 0) {
        return { status: 400, json: { message: "Invalid email/password" } };
      }
  
      const user = userQuery.rows[0];
  
      // Compare hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { status: 400, json: { message: "Invalid email/password" } };
      }
  
      // Save to session
      session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
  
      return { status: 200, json: { message: "Login successful", user: user.username } };
    } catch (err) {
      console.error(err.message);
      return { status: 500, json: { message: "Server error" } };
    }
  };

  const registerUser = async (username, email, password, pool) => {
    try {
      // Check for empty fields
      if (!username || !email || !password) {
        return { status: 400, json: { message: "Username, email, and password are required" } };
      }
      
      // Check if user already exists
      const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userExists.rows.length > 0) {
        return { status: 400, json: { message: "User already exists" } };
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Insert new user into database
      const newUser = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );
  
      return { status: 201, json: { 
        message: "User registered successfully",
        user: { id: newUser.rows[0].id, username: newUser.rows[0].username, email: newUser.rows[0].email }
      }};
    } catch (err) {
      console.error(err.message);
      return { status: 500, json: { message: "Server error" } };
    }
  }
  
  export { loginUser, registerUser };
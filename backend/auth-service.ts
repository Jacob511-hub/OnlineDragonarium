const loginUser = async (email, password, pool, bcrypt, session) => {
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
  
  export { loginUser };
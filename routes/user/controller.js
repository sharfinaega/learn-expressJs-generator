let users = require("../../models/users");

module.exports = {
  allUsers: (req, res) => {
    res.status(200).send(users);
  },

  usersByName: (req, res) => {
    const parameter_name = req.params.name;
    const user = users.find(item => item.name.startsWith(parameter_name));
    console.log(user);
    res.send(user);
  },

  register: (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(401).json({
          message: "body cannot be empty"
        });
      }

      const existedUser = users.find(user => user.email === email);

      if (existedUser) {
        return res.status(409).json({
          message: "user already registered, please login"
        });
      }
      users.push({ name, email, password });
      res.status(201).json({
        message: "user successfully created",
        name,
        email
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in register route",
        error: error.message
      });
    }
  },
  authentication: (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existedUser = users.find(user => user.email === email);
      if (!existedUser) {
        return res.status(400).json({
          message: "email doesn't exist, please register"
        });
      }
      if (existedUser.password === password) {
        return res.status(200).json({
          message: "login successfull",
          isLoggedIn: true,
          name,
          email,
          fakeId: 10201
        });
      } else {
        return res.status(400).json({
          message: "login failed, your password is not match"
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "error in authentication route",
        error: error.stack
      });
    }
  },

  logout: (req, res) => {
    return res.status(200).json({
      message: "logout successfull",
      isLoggedIn: false
    });
  }
};

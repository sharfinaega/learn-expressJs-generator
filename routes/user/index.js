var express = require("express");
var router = express.Router();

const { allUsers, usersByName, logout, register, authentication } = require("./controller");
/* GET users listing. */
router.get("/all-users", allUsers);
router.get("/:name", usersByName);
router.get("/logout", logout);
router.post("/register", register);
router.post("/authentication", authentication);

module.exports = router;

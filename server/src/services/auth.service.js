const { User } = require("../db");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and should be min 6 characters long");
  const userExist = await User.findOne({ where: { email } });
  if (userExist) return res.status(400).send("Email is already taken");
  try {
    await User.create(req.body);
    return res.json({ ok: true });
  } catch (error) {
    console.log(`User create failed: ${error}`);
    res.status(400).send("Error. Try again");
  }
};

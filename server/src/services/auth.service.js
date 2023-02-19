const { User } = require("../db");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and should be min 6 characters long");
  const userExist = await User.findOne({ where: { email } });
  if (userExist) return res.status(400).send("Email is already taken");
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      ...req.body,
      password: hashedPassword,
    });
    return res.json({ ok: true });
  } catch (error) {
    console.log(`User create failed: ${error}`);
    res.status(400).send("Error. Try again");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("Email not found. Please, signup");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Wrong password");
    console.log("Generate a token");
  } catch (error) {
    console.log(`Login error: ${error}`);
    res.status(400).send("Sign in failed. Try again");
  }
};

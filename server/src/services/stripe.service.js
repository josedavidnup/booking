const { User } = require("../db");
const { stripeSecret, stripeRedirect_Url } = require("../../utils/config");
const stripe = require("stripe")(stripeSecret);
const querystring = require("querystring");

exports.createConnectAccount = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({ type: "express" });
      user.stripe_account_id = account.id;
      await user.save();
    }

    let loginLink = await await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: stripeRedirect_Url,
      return_url: stripeRedirect_Url,
      type: "account_onboarding",
    });

    loginLink = Object.assign(loginLink, {
      "stripe_user[email]": user.email || undefined,
    });
    let link = `${loginLink.url}?${querystring.stringify(loginLink)}`;
    console.log(link);
    res.send(link);
  } catch (error) {
    console.log(error);
  }
};

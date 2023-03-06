const User = require("../schemas/user.schema");
const Room = require("../schemas/room.schema");
const Stripe = require("stripe");
const querystring = require("querystring");
const {
  stripeSecret,
  stripeRedirect_Url,
  stripe_Setting_Redirect_Url,
  stripe_cancel_Url,
  stripe_success_Url,
} = require("../utils/config");
const stripe = Stripe(stripeSecret);

const createConnectAccount = async (req, res) => {
  // 1. find user from db
  const user = await User.findById(req.user._id).exec();
  console.log("USER ==> ", user);
  // 2. if user don't have stripe_account_id yet, create now
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });
    console.log("ACCOUNT ===> ", account);
    user.stripe_account_id = account.id;
    user.save();
  }
  // 3. create login link based on account id (for frontend to complete onboarding)
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: stripeRedirect_Url,
    return_url: stripeRedirect_Url,
    type: "account_onboarding",
  });
  // prefill any info such as email
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  // console.log("ACCOUNT LINK", accountLink);
  let link = `${accountLink.url}?${querystring.stringify(accountLink)}`;
  console.log("LOGIN LINK", link);
  res.send(link);
  // 4. update payment schedule (optional. default is 2 days
};

const updateDelayDays = async (accountId) => {
  const account = await stripe.account.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

const getAccountStatus = async (req, res) => {
  // console.log("GET ACCOUNT STATUS");
  const user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  // console.log("USER ACCOUNT RETRIEVE", account);
  // update delay days
  const updatedAccount = await updateDelayDays(account.id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount,
    },
    { new: true }
  )
    .select("-password")
    .exec();
  // console.log(updatedUser);
  res.json(updatedUser);
};

const getAccountBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    res.json(balance);
  } catch (error) {
    console.log(error);
  }
};

const payoutSetting = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_seller.id,
      {
        redirect_url: stripe_Setting_Redirect_Url,
      }
    );
    console.log("Login link", loginLink);
    res.json(loginLink);
  } catch (error) {
    console.log(error);
  }
};

const stripeSessionId = async (req, res) => {
  const { roomId } = req.body;

  const item = await Room.findById(roomId).populate("postedBy").exec();

  const fee = (item.price * 20) / 100;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: fee * 100,
      transfer_data: { destination: item.postedBy.stripe_account_id },
    },
    success_url: stripe_success_Url,
    cancel_url: stripe_cancel_Url,
  });

  await User.findByIdAndUpdate(req.user._id, {
    stripeSession: session,
  }).exec();

  res.send({
    sessionId: session.id,
  });
};

module.exports = {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
  stripeSessionId,
};

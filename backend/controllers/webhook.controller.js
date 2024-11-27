import User from "../models/user.model.js";
import { Webhook } from "svix";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const clerkWebhook = async (req, res) => {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    return res.status(400).send("Clerk Webhook Secret not set");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);
  let event;
  try {
    event = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: "Webhhok verification failed",
    });
  }

  console.log(event.data);

  if (event.type === "user.created") {
    const newUser = new User({
      clerkUserId: event.data.id,
      username:
        event.data.username || event.data.email_addresses[0].email_address,
      email: event.data.email_addresses[0].email_address,
      img: event.data.profile_image_url,
    });

    await newUser.save();
  }

  if (event.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: event.data.id,
    });

    await Post.deleteMany({ user: deletedUser._id });
    await Comment.deleteMany({ user: deletedUser._id });
  }

  return res.status(200).json({
    message: "Webhook received",
  });
};

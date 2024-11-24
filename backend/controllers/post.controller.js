import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const clerkId = req.auth.userId;

  console.log("auth", req.auth);

  if (!clerkId) {
    return res.status(401).send("Unauthorized");
  }

  console.log("clerkId", clerkId);

  const user = await User.findOne({ clerkId });

  console.log("user", user);

  if (!user) {
    return res.status(404).json("User not found");
  }

  const post = new Post({ user: user._id, ...req.body });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const clerkId = req.auth.userId;

  if (!clerkId) {
    return res.status(401).send("Unauthorized");
  }

  const user = await User.findOne({ clerkId });

  if (!user) {
    return res.status(404).send("User not found");
  }

  try {
    const seletedPost = await Post.findByIdAndDelete({
      _id: req.params.id,
      user: user._id,
    });
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(403).json("You can delete only your posts!");
  }
};

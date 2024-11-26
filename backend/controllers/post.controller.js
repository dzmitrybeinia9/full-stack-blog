import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  try {
    const posts = await Post.find()
      .populate("user", "username")
      .limit(limit)
      .skip(limit * (page - 1));

    const totalPosts = await Post.countDocuments();
    const hasMore = totalPosts > page * limit;

    res.status(200).send({ posts, hasMore });
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
  console.log("CREATE POST");
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

  let slug = req.body.title.toLowerCase().split(" ").join("-");

  let exisingSlug = await Post.findOne({ slug });

  let count = 2;

  while (exisingSlug) {
    slug = `${slug}-${count}`;
    exisingSlug = await Post.findOne({ slug });
    count++;
  }

  const post = new Post({ user: user._id, slug, ...req.body });
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

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};

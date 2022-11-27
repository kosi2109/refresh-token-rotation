const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(403).json("All fields are required.");

  const user = await User.findOne({ username });

  if (!user) return res.sendStatus(401);

  if (!user.matchPassword(password)) return res.sendStatus(401);

  const accessToken = jwt.sign({ username }, "access secret", {
    expiresIn: "10s",
  });

  const refreshToken = jwt.sign({ username }, "refresh secret", {
    expiresIn: "30s",
  });

  user.refresh_token = refreshToken;

  await user.save();

  res.cookie("refresh_token", refreshToken, {
    maxAge: 30 * 1000,
    httpOnly: true,
    sameSite : "None",
    secure : true
  });
  return res.status(201).json({ username, accessToken });
};

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(403).json("All fields are required.");

  const exist = await User.findOne({ username });

  if (exist) {
    return res.status(403).json("Username already exist.");
  }

  await User.create({ username, password });

  return res.status(201).json("Created Successfully");
};

const refresh = async (req,res)=> {
  const {refresh_token} = req.cookies;
  console.log(req.cookies);
  if (!refresh_token) return res.sendStatus(401);
  
  const user = await User.findOne({refresh_token});
  console.log(user);

  jwt.verify(
    refresh_token,
    'refresh secret',
    (err,decoded) => {
      if (err || decoded?.username !== user?.username) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {username : user.username},
        'access secret',
        {expiresIn : '10s'}
        )
        res.json({accessToken})
    }
  )
}

const logout = async (req,res) => {
  const {refresh_token} = req.cookies;
  console.log(req.cookies);
  if (!refresh_token) return res.sendStatus(401);
  
  const user = await User.findOne({refresh_token});
  
  if (user) {
    user.refresh_token = '';
    await user.save();
  }
  
  res.clearCookie('refresh_token', {httpOnly : true,sameSite : 'None' , secure : true});
  return res.sendStatus(204);
}

module.exports = {
  login,
  register,
  refresh,
  logout
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", "", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logged out successfully." });
};
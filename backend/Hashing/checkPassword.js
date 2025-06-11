import bcrypt from "bcryptjs";

export const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}
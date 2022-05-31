import jwt from "jsonwebtoken";

export const generateToken = (gmail:string) => {
    const expiresIn = 1000 * 60 * 15;
    const token = jwt.sign({ gmail }, 'julio', { expiresIn });
    return { token, expiresIn };
};

export const generateRefreshToken = (gmail:string, res) => {
    const expiresIn = 1000 * 60 * 60 * 24 * 30;
    const refreshToken = jwt.sign({ gmail }, 'cesar', {
        expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: !(process.env.MODO === "developer"),
        expires: new Date(Date.now() + expiresIn),
    });
};
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const generateToken = (id: string) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};
const generateAccessToken = (id: string) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

const generateRefreshToken = (id: string) => {
  return jwt.sign({ _id: id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
};

export const generateTokens = (user: { _id: string }) => {
  const token = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  return { token, refreshToken };
};


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('🔥 ====> loginUser', email, password);
  try {
    const user = await User.findOne({ email, status: true });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }
    console.log('🔥 ====> user', user);

    const { token, refreshToken } = generateTokens(user);
    console.log('🔥 ====> token', token);
    console.log('🔥 ====> refreshToken', refreshToken);
    res.status(200).json({ token, refreshToken, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Erreur lors de la connexion', error });
  }
};


// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  const userName = `${firstName.toLowerCase()}. ${lastName.toLowerCase()}`;
  try {
    const user = new User({ email, password, role: 'user', userName, firstName, lastName });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du compte', error });
  }
};

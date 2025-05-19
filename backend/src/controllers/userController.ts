import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserPredictions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const predictions = await userService.getUserPredictions(id);
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPredictions = async (req: Request, res: Response) => {
  try {
    const predictions = await userService.getAllPredictions();
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}; 
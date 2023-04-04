import { Request, Response, NextFunction, RequestHandler } from 'express';

const ValiFields: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  // const requiresFields = ['email', 'password'];
  // for (let i = 0; i < requiresFields.length; i += 1) {
  //   if (!req.body[requiresFields[i]]) {
  //     return res.status(400).json({ message: 'All fields must be filled' });
  //   }
  // }
  // next();
  console.log(req.body);
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const emailTest = regex.test(email);
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!emailTest || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default ValiFields;

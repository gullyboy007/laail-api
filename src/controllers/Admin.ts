import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Admin from '../models/Admin';
import { createJWT, hashPassword , comparePasswords} from "../middleware/auth";


const createAdmin = async (req,res) => {
    try{
        const { username,password } = req.body;
        const hash = await hashPassword(password);
        const user = Admin.create({
            _id: new mongoose.Types.ObjectId(),
            username:username,
            hash_password:hash
        });
        const token = createJWT(user);
        res.status(201).json({ user:user,token: token })
    } catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }

};

const findAll = (req: Request, res: Response, next: NextFunction) => {
    return Admin.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};

const signin = function(req, res) {
  Admin.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ user:user,token: createJWT(user)});
  });
};
export default { createAdmin , findAll,signin};
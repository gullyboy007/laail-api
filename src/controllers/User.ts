import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';


const createUser = (req: Request, res: Response, next: NextFunction)=> {
    const { username,name,email,password,mobileno } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        name,
        email,
        password,
        mobileno
    });
    
    return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};

const findUser = async (req, res) =>{
    
    const userId = req.body.id;
    const user = await User.findById(userId)
    .populate({
        path:'contracts'
    })
    if(!user){
        return res.status(404).json({ message: 'not found' })
    }
    return res.json(user)
}


/*const findUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.email;
    console.log(userId)
    return User.where("Email").equals(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};*/

const findAll = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};

const nloans = async (req, res) => {
    const n = req.body.num;
    const user = await User.find(
        { numLoangiven: { $gt: -1 } }
            
      /*$project: {
         item: 1,
         numberOfLoans: { $cond: { if: { $isArray: "$contracts" }, then: { $size: "$contracts" }, else: "NA"} }
      }*/

    )
    if(!user){
        return res.status(404).json({ message: 'No such lender' })
    }
    res.json(user )
}
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId= req.params.mobileno;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.id;
    console.log(userId)
    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ user, message: 'Deleted' }) : res.status(404).json({ message: 'User not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createUser, findUser, findAll, nloans,updateUser, deleteUser };
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Contract from '../models/Contracts';
import User from '../models/User';


const createContract = async (req,res) => {
    try{
    const { lenderid,borrowerid,principal,interest,startDate,dueDate } = req.body;

    const contract = await Contract.create({
        _id: new mongoose.Types.ObjectId(),
        lenderid,
        borrowerid,
        principal,
        interest,
        startDate,
        dueDate
    });
    await User.updateOne(
        {_id: lenderid},
        {$push: {contracts: contract}},
        {$inc: { numLoangiven: 1 }},
        )
    res.status(201).json({ contracts: contract })
     
    }catch(error) {
        console.log(error.message);
        res.status(500).json({ error: error})
    } 
};

const findContract = async (req, res) =>{
    
    const contractId = req.body.id;
    const contract = await Contract.findById(contractId)
    //.populate('lenderid')
    .populate({
        path: 'lenderid'
    })

    if(!contract){
        return res.status(404).json({ message: 'not found' })
    }
    return res.json(contract)
}


/*const findUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.email;
    console.log(userId)
    return User.where("Email").equals(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};*/

const findAll = (req: Request, res: Response, next: NextFunction) => {
    return Contract.find()
        .then((contracts) => res.status(200).json({ contracts }))
        .catch((error) => res.status(500).json({ error }));
};

const updateContract = (req: Request, res: Response, next: NextFunction) => {
    const contractId= req.body.id;

    return Contract.findById(contractId)
        .then((contract) => {
            if (contract) {
                contract.set(req.body);

                return contract
                    .save()
                    .then((contract) => res.status(201).json({ contract }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteContract = (req: Request, res: Response, next: NextFunction) => {
    const contractId = req.body.id;
    
    return Contract.findByIdAndDelete(contractId)
        .then((contract) => (contract ? res.status(201).json({ contract, message: 'Deleted' }) : res.status(404).json({ message: 'User not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createContract, findContract, findAll, updateContract, deleteContract };
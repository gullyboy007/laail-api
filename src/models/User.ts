import mongoose, { Document, Schema } from 'mongoose';
var uniqueValidator = require('mongoose-unique-validator');
export interface IUser {
    name: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: {type: String, unique: true,required: true},
        name: { type: String,required: true  },
        email: { type: String,required: true , lowercase: true},
        password: { type: String,required: true  },
        mobileno: { type: Number,required: true  },
        contracts: [{ type: Schema.Types.ObjectId, ref: 'Contract' }],
        numLoangiven: {type: Number, default:  0} ,
        totalLoan: {type: Number, default: 0}
        
    },
    {
        versionKey: false
    }
);
UserSchema.plugin(uniqueValidator);
export default mongoose.model<IUserModel>('User', UserSchema);
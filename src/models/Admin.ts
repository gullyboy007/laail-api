import mongoose, { Document, Schema } from 'mongoose';
import * as bcrypt from "bcrypt";

export interface IAdmin {
    name: string;
}

export interface IAdminModel extends IAdmin, Document {}

const AdminSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        hash_password: { type: String, required: true },
    
    },
    {
        versionKey: false
    }
);
AdminSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

export default mongoose.model<IAdminModel>('Admin', AdminSchema);
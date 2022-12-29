import mongoose, { Document, Schema } from 'mongoose';

export interface IContract {
    lenderid: string;
    borrowerid: string;
}

export interface IContractModel extends IContract, Document {}

const ContractSchema: Schema = new Schema(
    {
        lenderid: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        borrowerid: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        principal: { type: Number, required: true },
        interest: { type: Number, required: true },
        startDate: { type: Date, required: true , default: () => Date.now()},
        dueDate: { type: Date, required: true },
        isRepaid:{ type: Boolean,default: false}
        
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IContractModel>('Contract', ContractSchema);
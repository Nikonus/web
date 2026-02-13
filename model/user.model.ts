import mongoose,{Schema,  model, models} from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    _id?:mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    
    this.password = await bcrypt.hash(this.password, 10);
    
});

const User = models.User || model<IUser>('User', userSchema);
export default User;    



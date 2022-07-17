import mongoose, {Schema, Document} from 'mongoose';


export interface UserInterface extends Document {
    name: String,
    email: String,
    phone: String
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    }
})

const User  = mongoose.model<UserInterface>('User', userSchema)
export default User;
import mongoose, { Document, Schema, Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from 'config';

const secret = config.get<string>('jwt.secret');
const expiresIn = config.get<string>('jwt.expiresIn');
const refreshSecret = config.get<string>('jwt_refresh.secret');
const refreshExpiresIn = config.get<string>('jwt_refresh.expiresIn');

interface UserDocument extends Document {
    firstName?: string;
    lastName?: string;
    userName: string;
    password: string;
    email: string;
    image: string;
    my_recipes: mongoose.Types.ObjectId[];
    saved_recipes: mongoose.Types.ObjectId[];
    activated: boolean;
    activation_token?: string;
    reset_password_token?: string;
    generateAuthToken(): string;
    generateRefreshToken(): string;
    generateActivationToken(): Promise<string>;
    generateResetPasswordToken(): Promise<string>;
}

interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument>({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true }, // image url
    my_recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: false
    }],
    saved_recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: false
    }],
    activated: { type: Boolean, required: true },
    activation_token: { type: String, required: false },
    reset_password_token: { type: String, required: false },
});

userSchema.methods.generateAuthToken = function () : string {
    const token = jwt.sign({ _id: this._id }, secret, {
        expiresIn: expiresIn,
    })
    return token
}

userSchema.methods.generateRefreshToken = function () : string {
    const token = jwt.sign({ _id: this._id }, refreshSecret, {
        expiresIn: refreshExpiresIn,
    })
    return token
}

userSchema.methods.generateActivationToken = async function (): Promise<string> {
    console.log("this in generate", this)
    const buffer = crypto.randomBytes(32)
    const token = buffer.toString('hex')
    this.activation_token = token
    await this.save()
    return token
}

userSchema.methods.generateResetPasswordToken = async function () :Promise<void> {
    await crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString('hex')
        this.reset_password_token = token
        await this.save()
        return token
    }
    )
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

export {User, userSchema, UserDocument}
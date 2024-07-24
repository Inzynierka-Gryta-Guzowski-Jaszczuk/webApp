import mongoose, {Document, Schema} from 'mongoose'
import { UserDocument } from './User';

interface CommentDocument extends  Document {
    comment: string;
    user: mongoose.Schema.Types.ObjectId | UserDocument;
}

export default CommentDocument
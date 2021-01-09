import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permissao: {
        type: Number,
        default: 1
    },
    originalName: {
        type: String,
        required: false
    } ,
    fileName: {
        type: String,
        required: false
    }   
},
{
    timestamps: true,
});

User.plugin(mongoosePaginate);

export default mongoose.model('user', User);
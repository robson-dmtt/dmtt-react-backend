import mongoose from 'mongoose';

const Menu = new mongoose.Schema({
    menu: {
        type: String,
        required: true
    },
    icone: {
        type: String,
        required: true
    },
    nivelPermissao: {
        type: Number,
        default: 1
    },
    url: {
        type: String,
        required: true
    } 
},
{
    timestamps: true,
});


export default mongoose.model('menu', Menu);
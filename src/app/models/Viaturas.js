import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

const Viatura = new mongoose.Schema({
    viatura: {
        type: String,
        required: true
    },
    prefixo: {
        type: String,
        required: true
    },
    placa: {
        type: String,
        required: true
    },
    ativo: {
        type: Boolean,
        default: true
    },
    tipo: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});


export default mongoose.model('viatura', Viatura);
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Viatura from '../models/Viaturas';

class ViaturaController
 {

    async index(req, res) {
        
        await Viatura.find({}).then((viatura) => {
            return res.json({
                error: false,
                viatura: viatura
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async show(req, res) {
        User.findOne({ _id: req.params.id }, '_id name email createdAt updatedAt originalName fileName').then((user) => {
           
            return res.json({
                error: false,
                user: user
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };

    async store(req, res) {
        const schema = Yup.object().shape({
            viatura: Yup.string()
                .required(),
            prefixo: Yup.string()
                .required(),
            placa: Yup.string()
                .required(),
            ativo: Yup.boolean(),
            tipo: Yup.string()
                .required(),
                
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        const viaturaExiste = await Viatura.findOne({ viatura: req.body.viatura });
        if (viaturaExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este viatura já está cadastrada!"
            });
        };

        var dados = req.body;

        const viatura = await Viatura.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: viatura não foi cadastrada com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Viatura cadastrado com sucesso!",
                dados: viatura
            })
        });
    };

    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
            name: Yup.string(),
            email: Yup.string()
                .email(),
            password: Yup.string()
                .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const { _id, email }= req.body;

        const usuarioExiste = await User.findOne({_id: _id});

        if(!usuarioExiste){
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Usuário não encontrado!"
            });
        };

        if(email != usuarioExiste.email){
            const emailExiste = await User.findOne({email});
            if(emailExiste){
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Erro: Este e-mail já está cadastrado!"
                });
            };
        };

        var dados = req.body;
        if(dados.password){
            dados.password = await bcrypt.hash(dados.password, 8);
        };

        await User.updateOne({_id: dados._id}, dados, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Usuário não foi editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Usuário editado com sucesso!"
            });
        });        
    };

    async delete(req, res) {
        const usuarioExiste = await User.findOne({ _id: req.params.id });

        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Usuário não encontrado"
            });
        };

        const user = await User.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Usuário não foi apagado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        });
    };
};

export default new ViaturaController();
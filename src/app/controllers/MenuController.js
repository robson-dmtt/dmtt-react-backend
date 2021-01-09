import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Menu from '../models/Menu';

class MenuController
 {

    async index(req, res) {
        
        await Menu.find().then((menu) => {
            return res.json({
                error: false,
                menu: menu
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
            menu: Yup.string()
                .required(),
            icone: Yup.string()
                .required(),
            nivelPermissao: Yup.string()
                .required(),
            url: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        const menuExiste = await Menu.findOne({ menu: req.body.menu });
        if (menuExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este menu já está cadastrado!"
            });
        };

        var dados = req.body;

        const menu = await Menu.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Menu não foi cadastrado com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Menu cadastrado com sucesso!",
                dados: menu
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

export default new MenuController
();
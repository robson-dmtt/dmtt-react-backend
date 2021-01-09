import mongoose from 'mongoose';

class DataBase {
    constructor() {
        this.mongoDataBase();
    }
    mongoDataBase() {
        this.mongoDBConnection = mongoose.connect('mongodb+srv://dmtt:c0ntr0l3@cluster0.x8bkc.mongodb.net/transito?retryWrites=true&w=majority', {
        //this.mongoDBConnection = mongoose.connect('mongodb://localhost/celke', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conexão com MongoDB realizada com sucesso!")
        }).catch((erro) => {
            console.log("Erro: Conexão com MongoDB não foi realizado com sucesso: " + erro)
        })
    }
}
//mongodb+srv://<username>:<password>@cluster0.x8bkc.mongodb.net/<dbname>?retryWrites=true&w=majority
export default new DataBase();

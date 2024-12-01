const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb+srv://muriloorsi:BXZOaFc45YBJLrH9@cluster0.mongodb.net/jornadaDoSaberdb?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado ao MongoDB Atlas");
}).catch(err => {
  console.error("Erro ao conectar ao MongoDB Atlas", err);
});

const jogoDaVelhaSchema = new mongoose.Schema({
  jogador: String,
  resultado: String,
  nivel: String,
  data: { type: Date, default: Date.now },
});

const JogoDaVelha = mongoose.model('JogoDaVelha', jogoDaVelhaSchema);

app.post('/jogo-da-velha', async (req, res) => {
  try {
    const { jogador, resultado, nivel } = req.body;
    const novoResultado = new JogoDaVelha({ jogador, resultado, nivel });
    await novoResultado.save();
    res.status(201).json({ message: "Resultado salvo com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar resultado", error: err });
  }
});

const JogoDaMemoria = mongoose.model('Result', ResultSchema);

app.post('/jogo-da-memoria', async (req, res) => {
    try {
      const result = new JogoDaMemoria(req.body);
      await result.save();
      res.status(201).send({ message: 'Resultado salvo com sucesso!' });
    } catch (error) {
      console.error('Erro ao salvar o resultado:', error);
      res.status(500).send({ error: 'Erro ao salvar o resultado' });
    }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

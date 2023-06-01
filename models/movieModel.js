const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
       
      },
      nome: {
        type: String,
       
      },
      sobrenome: {
        type: String,
      
      },
      dataNascimento: {
        type: String,
      },
      telefone: {
        type: String,
      },
      endereco: {
        type: String,
      
      },
      cidade: {
        type: String,
        
      },
      estado: {
        type: String,
       
      },
      status: {
        type: String,
        enum: ['Ativo', 'Inativo'],
        default: 'Ativo',
        
      },
      ImagemPerfil:{
            data: Buffer,
            contentType: String
        
      }
    });

module.exports = mongoose.model('movies', movieSchema);

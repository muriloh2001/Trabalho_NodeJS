const movieModel = require('../models/movieModel');


class MovieController {
    async cadastrarAssinante(req, res) {
        try {
          const { id, nome, sobrenome, dataNascimento, telefone, endereco, cidade, estado, status } = req.body;
      
          const assinanteExistente = await movieModel.findOne({ id });
          if (assinanteExistente) {
            return res.status(400).json({ error: 'Id do assinante já está em uso' });
          }
      
          const assinante = await movieModel.create({
            id,
            nome,
            sobrenome,
            dataNascimento,
            telefone,
            endereco,
            cidade,
            estado,
            status,
          });
      
          res.status(201).json(assinante);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao cadastrar assinante' });
        }

      }
      async salvar(req, res) {
        try {
            let movie = req.body;

            if (req.file) {
                movie.imagemPerfil = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                };
            }

            const max = await movieModel.findOne({}).sort({ codigo: -1 });
            movie.id = max == null ? 1 : max.id + 1;

            const resultado = await movieModel.create(movie);
            res.status(201).json(resultado);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Erro ao salvar o assinante.' });
        }
    }

    async listar(req, res) {
        try {
            const movies = await movieModel.find({});
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar assinante' });
        }
    }

    async buscarPorId(req, res) {
        try {
            const movie = await movieModel.findById(req.params.id);
            
            if (!movie) {
                return res.status(404).json({ error: 'Assinante não encontrado' });
            }
            
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar assinante por ID' });
        }
    }

    async atualizar(req, res) {
        try {
            const movieId = req.params.id;
            const { status } = req.body;

            if (req.file) {
                const fotoPerfil = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                };
                await movieModel.findByIdAndUpdate(movieId, { status, fotoPerfil });
            } else {
                await movieModel.findByIdAndUpdate(movieId, { status });
            }

            res.status(200).json({ message: 'Informações do Assinante atualizadas com sucesso.' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Erro ao atualizar as informações do Assinante.' });
        }
    }
    async excluir(req, res) {
        try {
            const { id } = req.params;
        
            const movie = await movieModel.findById(id);
            if (!movie) {
                return res.status(404).json({ error: 'Assinante não encontrado' });
            }
     
            await movieModel.findByIdAndRemove(id);
        
            res.status(200).json({ message: 'Assinante  deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar assinante' });
        }
    }
    
    async buscarAssinante(req, res) {
        try {
            const { nome, sobrenome, cidade, estado, status } = req.query;
        
            const filtro = {};
        
            if (nome) {
                filtro.nome = nome;
            }
        
            if (sobrenome) {
                filtro.sobrenome = sobrenome;
            }
        
            if (cidade) {
                filtro.cidade = cidade;
            }
        
            if (estado) {
                filtro.estado = estado;
            }
        
            if (status) {
                filtro.status = status;
            }
        
            const Assinante = await movieModel.find(filtro);
        
            res.status(200).json(Assinante);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar Assinante' });
        }
    }

}

module.exports = new MovieController();

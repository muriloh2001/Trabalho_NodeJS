const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const multer = require ('multer');

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/', movieController.cadastrarAssinante);
router.get('/', movieController.listar);
router.get('/buscar', movieController.buscarUsuarios);
router.post('/',upload.single('ImagemPerfil'), movieController.salvar);
router.get('/:id', movieController.buscarPorId);
router.put('/:id', movieController.atualizar);
router.delete('/:id', movieController.excluir);

module.exports = router;

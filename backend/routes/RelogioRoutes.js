const router = require('express').Router()
const RelogioController = require('../Controller/RelogioController')
//helpers
const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')

//rota para criar "registrar" um usuario
//rotas publicas
router.post('/create',imageUpload.array('images', 5),  RelogioController.CreateRelogio)
router.get('/getall/', RelogioController.getAllRelogio)
router.get('/getalluser', RelogioController.getAllUserRelogios)
router.get('/getRelogio/:id', RelogioController.getRelogioById)
router.get('/:removerelogio', RelogioController.removeRelogioById)
router.get('/:id', RelogioController.updateRelogio)


//rotas protegidas, só acessar caso esteja logado!!!
router.patch(
    '/edit/:id',
    verifyToken,
    imageUpload.single('RelogioImagem'),
    RelogioController.updateRelogio
)

module.exports = router
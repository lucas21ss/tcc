const Relogio = require('../Model/Relogio')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//helpers
const createUserToken = require('../Helpers/create-user-token')
const Relogioimagem = require('../Model/Relogioimagem')

module.exports = class RelogioController {

    //create user
    static async CreateRelogio(req, res) {
        const { name, descricao, tamanho, marca, material, referencia, comprar } = req.body;
        const images = req.files;
        //regras de negocio
        if (!name) {
            res.status(422).json({ message: 'O nome do relógio é obrigatório' })
            return
        }
        if (!descricao) {
            res.status(422).json({ message: 'A descricao do relógio é obrigatório' })
            return
        }

        if (!tamanho) {
            res.status(422).json({ message: 'O tamanho do relogio é obrigatório' })
            return
        }
        if (!marca) {
            res.status(422).json({ message: 'A marca do produto é obrigatório' })
            return
        }
        if (!material) {
            res.status(422).json({ message: 'O material do relogio é obrigatório' })
            return
        }
        if (!referencia) {
            res.status(422).json({ message: 'A referencia do relogio é obrigatório' })
            return
        }
        if (!comprar) {
            res.status(422).json({ message: 'A comprar do relogio é obrigatório' })
            return
        }

        //Checar se o produto existe
        const RelogioExists = await Relogio.findOne({ where: { name: name } })

        if (RelogioExists) {
            res.status(422).json({ message: 'Produto já cadastrado' })
            return
        }

        const newRelogio = new Relogio({
            name: name,
            descricao: descricao,
            tamanho: tamanho,
            marca: marca,
            material: material,
            referencia: referencia,
            comprar: comprar,
        })

        try {
            //criar novo Produto no banco
            const Relogio = await newRelogio.save();
            if (images && images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    const filename = images[i].filename;
                    const newImageRelogio = new Relogioimagem({
                        image: filename,
                        RelogioId: Relogio.id,
                    });
                    await newImageRelogio.save();
                }
            }

            res.status(200).json({ message: 'Produto cadastrado' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //mostrando todos os pets
    static async getAllRelogio(req, res) {
        const relogios = await Relogio.findAll({
            order: [['createdAt', 'DESC']],
            include: Relogioimagem
        });

        res.status(200).json({ relogios: relogios });

    }

    //filtrando os pets por usuario
    static async getAllUserRelogios(req, res) {
        //encontrando o usuario logado
        let currentRelogio
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentRelogio = await Relogio.findByPk(decoded.id)
        currentRelogio.password = undefined
        const currentRelogioId = Relogio.id

        const Relogios = await Relogio.findAll({
            where: { RelogioId: currentRelogioId },
            order: [['createdAt', 'DESC']],
            include: Relogioimagem
        })

        res.status(200).json({ Relogios })

    }

    static async getRelogioById(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' })
            return
        }
        //get pet by id
        const relogio = await Relogio.findByPk(id, { include: Relogioimagem });

        //validando se o ID é valido
        if (!relogio) {
            res.status(422).json({ message: 'Relogio não existe' })
            return
        }

        res.status(200).json({ Relogio: Relogio })
    }
    static async removeRelogioById(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' })
            return
        }
        //get pet by id
        const Relogio = await Relogio.findByPk(id)

        //validando se o ID é valido
        if (!Relogio) {
            res.status(422).json({ message: 'Pet não existe' })
            return
        }

        let currentRelogio
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentRelogio = await Relogio.findByPk(decoded.id)
        currentRelogio.password = undefined
        const currentRelogioId = currentRelogio.id

        if (Number(Relogio.userId) !== Number(currentUserId)) {
            res.status(422).json({ message: 'ID inválido' })
            return
        }

        await Relogio.destroy({ where: { id: id } })

        res.status(200).json({ message: 'Relogio removido com sucesso' })

    }

    static async updateRelogio(req, res) {
        const id = req.params.id
        const { name, descricao, tamanho, marca, material, referencia, comprar } = req.body

        const updateData = {}
        const Relogio = await Relogio.findByPk(id);

        if (!Relogio) {
            res.status(404).json({ message: "Relogio não existe!" });
            return;
        }

        //pegando o dono do pet
        let currentRelogio
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentRelogio = await Relogio.findByPk(decoded.id)

        if (Relogio.RelogioId !== currentRelogio.id) {
            res.status(422).json({ message: "ID inválido!" });
            return;
        }

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        } else {
            updateData.name = name
        }
        if (!descricao) {
            res.status(422).json({ message: "A descricao é obrigatória!" });
            return;
        } else {
            updateData.descricao = descricao
        }
        if (!tamanho) {
            res.status(422).json({ message: "O tamanho é obrigatório!" });
            return;
        } else {
            updateData.tamanho = tamanho
        }
        if (!marca) {
            res.status(422).json({ message: "A marca é obrigatória!" });
            return;
        } else {
            updateData.marca = marca
        }
        if (!material) {
            res.status(422).json({ message: "O material é obrigatória!" });
            return;
        } else {
            updateData.material = material
        }
        if (!referencia) {
            res.status(422).json({ message: "A referencia é obrigatória!" });
            return;
        } else {
            updateData.referencia = referencia
        }
        if (!comprar) {
            res.status(422).json({ message: "A informação de onde comprar é obrigatória!" });
            return;
        } else {
            updateData.comprar = comprar
        }



        const image = req.files
        if (!image || image.length === 0) {
            res.status(422).json({ message: "As imagens são obrigatórias!" });
            return;
        } else {
            // Atualizar as imagens do pet
            const imageFilenames = image.map((image) => image.filename);
            // Remover imagens antigas
            await ImagePet.destroy({ where: { RelogioId: Relogio.id } });
            // Adicionar novas imagens
            for (let i = 0; i < imageFilenames.length; i++) {
                const filename = imageFilenames[i];
                const newRelogioimagem = new ImagePet({ image: filename, RelogioId: Relogio.id });
                await newRelogioimagem.save();
            }

        }

        await Pet.update(updateData, { where: { id: id } });

        res.status(200).json({ message: "att com successo!" })
    }


}


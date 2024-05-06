import express from 'express';
import cors from 'cors';
import { getProvinces, getProvinceById, addProvince, updateProvince, deleteProvince } from './repositories/province-repository.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/province', async (req, res) => {
    try {
        const provinces = await getProvinces();
        res.status(200).send(provinces);
    } catch (error) {
        console.error('Error al solicitar las provincias:', error);
        res.status(500).send('Error del servidor: ', error);
    }
});

app.get('/api/province/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const provinces = await getProvinceById(id);
        if (provinces.length < 1){
            res.status(404).send('La provincia solicitada no existe');
        } else {
            res.status(200).send(provinces);
        }
    } catch (error) {
        console.error('Error al solicitar la provincia:', error);
        res.status(500).send('Error del servidor: ', error);
    }
});

app.post('/api/province/', async (req, res) => {
    try {
        await addProvince(req.body);
        res.status(201).send("Provincia creada correctamente");
    } catch (error) {
        console.error('Error al crear la provincia:', error);
        res.status(400).send('Error al procesar la solicitud: ' + error.message);
    }
});

app.put('/api/province/', async (req, res) => {
    const { id, name } = req.body;
    try {
        const provinceExists = await getProvinceById(id);
        if (provinceExists.length === 0) {
            res.status(404).send('La provincia solicitada no existe');
            return;
        }

        if (!name || name.length < 3) {
            res.status(400).send('El nombre de la provincia debe tener al menos 3 letras.');
            return;
        }
    
        await updateProvince(req.body);
        res.status(200).send('Provincia actualizada correctamente');
    } catch (error) {
        console.error('Error al actualizar la provincia:', error);
        res.status(500).send('Error del servidor: ' + error.message);
    }
});

app.delete('/api/province/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const provinceExists = await getProvinceById(id);
        if (provinceExists.length === 0) {
            res.status(404).send('La provincia solicitada no existe');
            return;
        }
        await deleteProvince(id);
        res.status(200).send('Provincia eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la provincia:', error);
        res.status(500).send('Error del servidor: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`La App esta corriendo en el puerto ${port}`);
});

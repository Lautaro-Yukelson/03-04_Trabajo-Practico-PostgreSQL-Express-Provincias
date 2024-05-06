import { Router } from "express";
import ProvinceService from "../services/province-service.js";

const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    try {
        const returnArray = await svc.getProvinces();
        return res.status(200).json(returnArray);
    } catch (error) {
        console.error("Error al obtener las provincias:", error);
        return res.status(500).send("Error al obtener las provincias:", error);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const province = await svc.getProvinceById(id);
        if (!province) {
            return res.status(404).send("Provincia no encontrada");
        }
        return res.status(200).json(province);
    } catch (error) {
        console.error("Error al obtener la provincia por ID:", error);
        return res.status(500).send("Error al obtener la provincia por ID:", error);
    }
});

router.post('', async (req, res) => {
    const provinceData = req.body;
    try {
        await svc.addProvince(provinceData);
        return res.status(201).send("La provincia se agrego correctamente");
    } catch (error) {
        console.error("Error al agregar la provincia:", error);
        return res.status(500).send("Error al agregar la provincia:", error);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const provinceData = req.body;
    try {
        const updatedProvince = await svc.updateProvince({ id, ...provinceData });
        return res.status(200).json(updatedProvince);
    } catch (error) {
        console.error("Error al actualizar la provincia:", error);
        return res.status(500).send("Error al actualizar la provincia:", error);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await svc.deleteProvince(id);
        return res.status(200).send("la provincia se elimino correctamente");
    } catch (error) {
        console.error("Error al eliminar la provincia:", error);
        return res.status(500).send("Error al eliminar la provincia:", error);
    }
});

export default router;

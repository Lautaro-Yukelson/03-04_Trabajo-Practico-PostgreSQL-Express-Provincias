import ProvinceRepository from "../repositories/province-repository.js";

export default class ProvinceService {
    constructor() {
        this.repo = new ProvinceRepository();
    }

    async getProvinces() {
        try {
            return await this.repo.getProvinces();
        } catch (error) {
            throw new Error("Error al obtener las provincias: " + error.message);
        }
    }

    async getProvinceById(id) {
        try {
            let res = await this.repo.getProvinceById(id);
            if (res <1){
               return "La provincia solicitada no existe"
            }else{
                return res
            }
        } catch (error) {
            throw new Error("Error al obtener la provincia por ID: " + error.message);
        }
    }

    async addProvince({ name, full_name, latitude, longitude, display_order }) {
        if (!name || name.length < 3) {
            throw new Error("El nombre de la provincia debe tener al menos 3 letras.");
        }

        try {
            return await this.repo.addProvince({ name, full_name, latitude, longitude, display_order });
        } catch (error) {
            throw new Error("Error al agregar la provincia: " + error.message);
        }
    }

    async updateProvince(provinceData) {
        try {
            return await this.repo.updateProvince(provinceData);
        } catch (error) {
            throw new Error("Error al actualizar la provincia: " + error.message);
        }
    }
    

    async deleteProvince(id) {
        try {
            return await this.repo.deleteProvince(id);
        } catch (error) {
            throw new Error("Error al eliminar la provincia: " + error.message);
        }
    }
}

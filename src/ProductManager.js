import fs from "fs";

class ManagerUsuarios {
    async consultarUsuarios() {
        try {
            const data = await fs.promises.readFile("./Usuarios.json", "utf-8");
            const respData = JSON.parse(data);
            return respData
        } catch (error) {
            return []            
        }
    }

    async crearUsuario(usuario) {
        let usuarios = await this.consultarUsuarios();
        if (usuarios) {
            usuarios = [...usuarios, usuario]
        } else {
            usuarios = [usuario]
        }
        await fs.promises.writeFile("./Usuarios.json", JSON.stringify(usuarios, null, 2));
    }
}

export default ManagerUsuarios
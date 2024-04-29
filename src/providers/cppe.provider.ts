import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CppeProvider {
    async searchTeacherDNI(dni: string): Promise<TeacherCPPeData> {
        const url = `${process.env.LINK_CPPE_CONSULTA}/controller/profesor.php?op=buscar_profesor_dni`;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*',
            'Accept-Language': 'es-US,es-419;q=0.9,es;q=0.8',
            'Origin': 'https://sistema.cppe.org.pe',
            'Referer': 'https://sistema.cppe.org.pe/view/Colegiado/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
        };

        const formData = new URLSearchParams();
        formData.append('dni', dni);

        try {
            const response = await axios.post(url, formData.toString(), { headers });
            return response.data;
        } catch (error) {
            throw new Error(`Error al buscar profesor por DNI: ${error.message}`);
        }
    }
}
import { Injectable } from '@nestjs/common';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import * as fs from 'fs';

@Injectable()
export class ChallengesService {
  create(createChallengeDto: any) {
    // Convierte el objeto a una cadena JSON
    const jsonString = JSON.stringify(createChallengeDto);
    
    try {
      // Escribe la cadena JSON en un archivo
      fs.writeFileSync('payload.json', jsonString);
      console.log('Archivo JSON creado exitosamente.');
    } catch (error) {
      console.error('Error al crear el archivo JSON:', error);
    }

    return 'This action adds a new challenge';
  }

  findAll() {
    return `This action returns all challenges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}

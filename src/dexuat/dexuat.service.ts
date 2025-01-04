import { Injectable } from '@nestjs/common';
import { CreateDexuatDto } from './dto/create-dexuat.dto';
import { UpdateDexuatDto } from './dto/update-dexuat.dto';

@Injectable()
export class DexuatService {
  create(createDexuatDto: CreateDexuatDto) {
    return 'This action adds a new dexuat';
  }

  findAll() {
    return `This action returns all dexuat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dexuat`;
  }

  update(id: number, updateDexuatDto: UpdateDexuatDto) {
    return `This action updates a #${id} dexuat`;
  }

  remove(id: number) {
    return `This action removes a #${id} dexuat`;
  }
}

import { CreateDexuatDto } from './dto/create-dexuat.dto';
import { UpdateDexuatDto } from './dto/update-dexuat.dto';
export declare class DexuatService {
    create(createDexuatDto: CreateDexuatDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDexuatDto: UpdateDexuatDto): string;
    remove(id: number): string;
}

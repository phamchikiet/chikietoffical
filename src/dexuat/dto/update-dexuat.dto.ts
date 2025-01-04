import { PartialType } from '@nestjs/mapped-types';
import { CreateDexuatDto } from './create-dexuat.dto';

export class UpdateDexuatDto extends PartialType(CreateDexuatDto) {}

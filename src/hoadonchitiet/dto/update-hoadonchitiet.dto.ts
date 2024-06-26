import { PartialType } from '@nestjs/mapped-types';
import { CreateHoadonchitietDto } from './create-hoadonchitiet.dto';

export class UpdateHoadonchitietDto extends PartialType(CreateHoadonchitietDto) {}

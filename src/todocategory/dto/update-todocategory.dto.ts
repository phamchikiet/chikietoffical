import { PartialType } from '@nestjs/swagger';
import { CreateTodocategoryDto } from './create-todocategory.dto';

export class UpdateTodocategoryDto extends PartialType(CreateTodocategoryDto) {}

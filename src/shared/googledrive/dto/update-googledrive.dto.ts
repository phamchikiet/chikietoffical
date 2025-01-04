import { PartialType } from '@nestjs/mapped-types';
import { CreateGoogledriveDto } from './create-googledrive.dto';

export class UpdateGoogledriveDto extends PartialType(CreateGoogledriveDto) {}

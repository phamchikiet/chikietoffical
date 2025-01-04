"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGoogledriveDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_googledrive_dto_1 = require("./create-googledrive.dto");
class UpdateGoogledriveDto extends (0, mapped_types_1.PartialType)(create_googledrive_dto_1.CreateGoogledriveDto) {
}
exports.UpdateGoogledriveDto = UpdateGoogledriveDto;
//# sourceMappingURL=update-googledrive.dto.js.map
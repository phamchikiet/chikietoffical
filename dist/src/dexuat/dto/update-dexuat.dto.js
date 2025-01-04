"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDexuatDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_dexuat_dto_1 = require("./create-dexuat.dto");
class UpdateDexuatDto extends (0, mapped_types_1.PartialType)(create_dexuat_dto_1.CreateDexuatDto) {
}
exports.UpdateDexuatDto = UpdateDexuatDto;
//# sourceMappingURL=update-dexuat.dto.js.map
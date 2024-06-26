"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsergroupDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_usergroup_dto_1 = require("./create-usergroup.dto");
class UpdateUsergroupDto extends (0, mapped_types_1.PartialType)(create_usergroup_dto_1.CreateUsergroupDto) {
}
exports.UpdateUsergroupDto = UpdateUsergroupDto;
//# sourceMappingURL=update-usergroup.dto.js.map
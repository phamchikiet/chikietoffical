"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAclDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_acl_dto_1 = require("./create-acl.dto");
class UpdateAclDto extends (0, mapped_types_1.PartialType)(create_acl_dto_1.CreateAclDto) {
}
exports.UpdateAclDto = UpdateAclDto;
//# sourceMappingURL=update-acl.dto.js.map
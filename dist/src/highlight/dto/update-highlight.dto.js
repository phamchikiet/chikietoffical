"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHighlightDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_highlight_dto_1 = require("./create-highlight.dto");
class UpdateHighlightDto extends (0, mapped_types_1.PartialType)(create_highlight_dto_1.CreateHighlightDto) {
}
exports.UpdateHighlightDto = UpdateHighlightDto;
//# sourceMappingURL=update-highlight.dto.js.map
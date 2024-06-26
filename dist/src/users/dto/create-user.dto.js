"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.Role = exports.CreateUserDto = void 0;
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Manager"] = "manager";
    Role["User"] = "user";
    Role["Dev"] = "dev";
    Role["Iso"] = "iso";
    Role["Customer"] = "customer";
})(Role || (exports.Role = Role = {}));
var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Create"] = "create";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
})(Action || (exports.Action = Action = {}));
//# sourceMappingURL=create-user.dto.js.map
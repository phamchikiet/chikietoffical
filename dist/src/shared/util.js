"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_TEMPLATE = exports.ListNotifyType = exports.ListRole = exports.ListTrangThaiDonhang = exports.ListHinhthucthanhtoan = exports.ListTrangthailichhen = exports.LIST_CHI_NHANH = void 0;
exports.ConvertDriveData = ConvertDriveData;
exports.genMaDonhang = genMaDonhang;
exports.Trangthai_Lichhen = Trangthai_Lichhen;
exports.TYPE_ZNS = TYPE_ZNS;
exports.ZALO_OA = ZALO_OA;
exports.CHI_NHANH = CHI_NHANH;
exports.convertPhoneNum = convertPhoneNum;
exports.Phone_To_0 = Phone_To_0;
exports.nest = nest;
exports.getInitials = getInitials;
exports.convertToSlug = convertToSlug;
exports.GenId = GenId;
exports.mergeNoDup = mergeNoDup;
exports.dateVNPAY = dateVNPAY;
exports.sortObject = sortObject;
exports.groupBy = groupBy;
exports.groupByfield = groupByfield;
exports.flattenData = flattenData;
function ConvertDriveData(data) {
    return data.slice(1).map((row) => {
        return {
            Title: row[0],
            Danhmuc: row[1],
            SKU: row[2],
        };
    });
}
function genMaDonhang(startNumber) {
    let code = startNumber.toString();
    while (code.length < 3) {
        code = "0" + code;
    }
    code = "TGO-AA" + code;
    startNumber++;
    return code;
}
exports.LIST_CHI_NHANH = [
    { id: '268b7a06-d2c5-4c98-af1d-334144ae280f', BranchCode: 'Q_T', idtempdanhgia: '304742', idtemp: '301891', idtoken: '9e148d63-1716-4aa8-b760-ad3700393d4c', idVttech: 3, Title: 'Taza Skin Clinic Gò Vấp' },
    { id: 'f54de1e1-66bd-4690-8015-ad7315d6f14e', BranchCode: 'PVD', idtempdanhgia: '304997', idtemp: '302261', idtoken: '22ddea78-f244-4dea-838a-c4c5d8e40a16', idVttech: 1, Title: 'Taza Skin Clinic Thủ Đức' },
    { id: 'ca725bf4-4810-4ea2-8ef2-520b2a3121cc', BranchCode: 'C_T', idtempdanhgia: '304942', idtemp: '302259', idtoken: 'e4d7426e-53df-4285-be74-aba10259e188', idVttech: 2, Title: 'Taza Skin Clinic Quận 10' },
    { id: 'e173b1c0-fbdb-4eeb-a00c-b56664068515', BranchCode: 'NHH', idtempdanhgia: '305001', idtemp: '303760', idtoken: 'd046cec3-ea49-4117-9a1c-f67959406443', idVttech: 4, Title: 'Taza Skin Clinic Nha Trang' },
    { id: '9887ad61-4b2c-4db1-83e6-570f33cb540a', BranchCode: 'H_V', idtempdanhgia: '304998', idtemp: '302281', idtoken: 'b3b61395-1760-49ae-b5e7-70c310c1c2fb', idVttech: 6, Title: 'Taza Skin Clinic Đà Nẵng' },
    { id: 'ca725bf4-4810-4ea2-8ef2-520b2a3121cc', BranchCode: 'VPC', idtempdanhgia: '304942', idtemp: '302259', idtoken: 'e4d7426e-53df-4285-be74-aba10259e188', idVttech: 7, Title: 'Văn Phòng' },
    { id: '', idtemp: '', idtoken: '', idVttech: 14, Title: 'Timona Academy Quận 10' },
    { id: '', idtemp: '', idtoken: '', idVttech: 15, Title: 'Timona Academy Thủ Đức' },
    { id: '', idtemp: '', idtoken: '', idVttech: 16, Title: 'Timona Academy Gò Vấp' },
    { id: '', idtemp: '', idtoken: '', idVttech: 17, Title: 'Timona Academy Nha Trang' },
    { id: '', idtemp: '', idtoken: '', idVttech: 18, Title: 'Timona Academy Đà Nẵng' },
    { id: '', idtemp: '', idtoken: '', idVttech: 19, Title: 'HR Tazagroup' },
    { id: '', idtemp: '', idtoken: '', idVttech: 20, Title: 'Timona Academy Hà Nội' },
    { id: '', idtemp: '', idtoken: '', idVttech: 21, Title: 'Building Timona CMT8' },
];
exports.ListTrangthailichhen = [
    { id: 0, Title: "Chờ Xác Nhận", Class: "text-yellow-400" },
    { id: 1, Title: "Đã Đặt Lịch", Class: "text-blue-400" },
    { id: 2, Title: "Đã Đến", Class: "text-green-400" },
    { id: 3, Title: "Đang Tham Khám", Class: "text-blue-400" },
    { id: 4, Title: "Đang Tư Vấn", Class: "text-blue-400" },
    { id: 5, Title: "Đang Lên phòng dịch vụ", Class: "text-blue-400" }
];
exports.ListHinhthucthanhtoan = [
    { id: "MOMO", Title: "MOMO", Class: "text-white bg-[#A52167]" },
    { id: "COD", Title: "Tiền Mặt", Class: "text-white bg-[#439c30]" },
    { id: "BANK", Title: "Chuyển Khoản", Class: "text-white bg-[#ED860A]" },
];
exports.ListTrangThaiDonhang = [
    { id: 0, Title: "Đơn Mới", Class: "text-white bg-[#44C8F5]" },
    { id: 1, Title: "Xác Nhận", Class: "text-white bg-[#ED860A]" },
    { id: 2, Title: "Đang xử lý", Class: "text-white bg-[#632B85]" },
    { id: 3, Title: "Đang Giao", Class: "text-white bg-[#FBCD18]" },
    { id: 4, Title: "Hoàn Thành", Class: "text-white bg-[#32A649]" },
    { id: 5, Title: "Huỷ", Class: "text-white bg-[#E1232A]" }
];
exports.ListRole = [
    { id: 'admin', value: 'Admin' },
    { id: 'manager', value: 'Quản Lý' },
    { id: 'user', value: 'Nhân Viên' },
    { id: 'customer', value: 'Khách Hàng' },
    { id: 'nhanvienkho', value: 'Nhân Viên Kho' },
    { id: 'nhanvienbanhang', value: 'Nhân Viên Bán Hàng' },
    { id: 'nhanvienketoan', value: 'Nhân Viên Kế Toán' },
];
exports.ListNotifyType = {
    success: 'check_circle',
    danger: 'dangerous',
    warning: 'warning',
    info: 'info'
};
exports.TYPE_TEMPLATE = {
    user_received_message: "Sự kiện người dùng nhận thông báo ZNS",
    change_template_quota: "Thông báo thay đổi quota mẫu ZNS rủi ro",
    change_template_quality: "Thông báo thay đổi về chất lượng gửi của mẫu tin ZNS",
    change_oa_template_tags: "Thông báo thay đổi về loại nội dung ZNS có thể gửi",
    change_oa_daily_quota: "Thông báo về thay đổi hạn mức gửi ZNS",
    user_feedback: "Sự kiện người dùng phản hồi template đánh giá dịch vụ",
};
function Trangthai_Lichhen(item) {
    const ListType = [
        { id: 0, Title: "Chờ Xác Nhận", Class: "text-yellow-400" },
        { id: 1, Title: "Đã Đặt Lịch", Class: "text-blue-400" },
        { id: 2, Title: "Đã Đến", Class: "text-green-400" },
        { id: 3, Title: "Đang Tham Khám", Class: "text-blue-400" },
        { id: 4, Title: "Đang Tư Vấn", Class: "text-blue-400" },
        { id: 5, Title: "Đang Lên phòng dịch vụ", Class: "text-blue-400" },
    ];
    return ListType.find((v) => v.id == item);
}
function TYPE_ZNS(item) {
    const ListType = {
        user_received_message: "Sự kiện người dùng nhận thông báo ZNS",
        change_template_quota: "Thông báo thay đổi quota mẫu ZNS rủi ro",
        change_template_quality: "Thông báo thay đổi về chất lượng gửi của mẫu tin ZNS",
        change_oa_template_tags: "Thông báo thay đổi về loại nội dung ZNS có thể gửi",
        change_oa_daily_quota: "Thông báo về thay đổi hạn mức gửi ZNS",
        user_feedback: "Sự kiện người dùng phản hồi template đánh giá dịch vụ",
    };
    return ListType[item];
}
function ZALO_OA(item) {
    const ListType = {
        "3605866963832105989": "Taza Skin Clinic Quận 10",
        "4353626177205058888": "Taza Skin Clinic Gò Vấp",
    };
    return ListType[item];
}
function CHI_NHANH(item) {
    const ListType = {
        "268b7a06-d2c5-4c98-af1d-334144ae280f": "Gò Vấp",
        "f54de1e1-66bd-4690-8015-ad7315d6f14e": "Thủ Đức",
        "ca725bf4-4810-4ea2-8ef2-520b2a3121cc": "Quận 10",
        "e173b1c0-fbdb-4eeb-a00c-b56664068515": "Nha Trang",
        "9887ad61-4b2c-4db1-83e6-570f33cb540a": "Đà Nẵng",
        "d516ed9c-5453-4c1e-9c05-40de3cd0e7b1": "Bình Thạnh"
    };
    return ListType[item];
}
function convertPhoneNum(phoneNumber) {
    if (phoneNumber.startsWith("0")) {
        return phoneNumber.replace(/^0/, "84");
    }
    else if (phoneNumber.length === 10) {
        return `84${phoneNumber}`;
    }
    else {
        throw new Error("Invalid phone number format");
    }
}
function Phone_To_0(phoneNumber) {
    if (phoneNumber.startsWith("84")) {
        return "0" + phoneNumber.slice(2);
    }
    else {
        return phoneNumber;
    }
}
function nest(items, id = '', link = 'pid') {
    if (items) {
        return items.filter((item) => item[link] == id)
            .map((item) => ({
            ...item,
            children: nest(items, item.id),
        }));
    }
    ;
}
function getInitials(name) {
    const words = name.split(' ');
    const initials = words.map((word) => word[0].toUpperCase()).join('');
    return initials;
}
function convertToSlug(str) {
    return str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[àáảạãâầấẩậẫăằắẳặẵ]/g, 'a')
        .replace(/[èéẻẹẽêềếểệễ]/g, 'e')
        .replace(/[ìíỉịĩ]/g, 'i')
        .replace(/[òóỏọõôồốổộỗơờớởợỡ]/g, 'o')
        .replace(/[ùúủụũưừứửựữ]/g, 'u')
        .replace(/[ỳýỷỵỹ]/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9-]/g, '');
}
function GenId(length, onlynumber = true) {
    let result = '';
    let characters = '';
    if (onlynumber) {
        characters = '0123456789';
    }
    else {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function mergeNoDup(arr1, arr2, key) {
    const mergedArray = arr1.concat(arr2);
    const uniqueItems = mergedArray.reduce((acc, item) => {
        if (!acc[item[key]]) {
            acc[item[key]] = item;
        }
        return acc;
    }, {});
    return Object.values(uniqueItems);
}
function dateVNPAY(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
function groupBy(data) {
    if (data) {
        return Object.values(data.reduce((result, currentItem) => {
            const group = currentItem.Nhom;
            if (!result[group]) {
                result[group] = { Nhom: group, items: [] };
            }
            result[group].items.push({ id: currentItem.id, Cauhoi: currentItem.Cauhoi, Dapan: currentItem.Dapan });
            return result;
        }, {}));
    }
    else
        return null;
}
;
function groupByfield(data) {
    const convertedData = {};
    data.forEach((item) => {
        const nhomId = item.idSP;
        if (!convertedData[nhomId]) {
            convertedData[nhomId] = {
                idSP: item.idSP,
                children: [],
            };
        }
        const { idSP, ...transitem } = item;
        convertedData[nhomId].children.push(transitem);
    });
    return Object.values(convertedData);
}
;
function flattenData(data) {
    const flattenedData = [];
    data.forEach((item) => {
        flattenedData.push(item);
        if (item.children) {
            flattenedData.push(...flattenData(item.children));
        }
    });
    return flattenedData;
}
;
//# sourceMappingURL=util.js.map
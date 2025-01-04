"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogledriveService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
let GoogledriveService = class GoogledriveService {
    constructor() {
        const credentials = {
            "type": "service_account",
            "project_id": "speedy-atom-351508",
            "private_key_id": "50528a1b0bb9141e3b8b1043c1b4755f1f24d446",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC9UDDPmXLBx77Q\n16kva+X3ElT/zDF8T1yyDzkF1ngp0K57KkCeqYA1WiCYGuMhwgkmUH/t43kNhv1e\nMG/PMn+xBC17g1aA4JogDkaUsamv8Rv0ng+KSlQnAgxpcLWBy/cROPsd4olR6P41\nywHi5P2AkdFeSnacInIGsX+4INqXqbmbK8XdbUB75yGCfdTbQJxC2HFRmjEgfKtm\n7ZfFVWnBCsd7DpRVgtSzVwa9KMk91WVNcJWWNPvpxm5E86tyz7Ndg5jmQ9UK3ypg\nGv8Op2P/WGykuozIXZmz8LjpEgfeY9/wJE/ZTt6DzGbzm5enxhczqa8A9P7YGvgr\n+BBmuFXxAgMBAAECggEAEhy/fBqMHQJy0lanzwEtkHzBBB4xp9k3Sak6L+xL39hM\nMT14JECcTb5wkDeWU9mqzW8gkOPVZkLBhUbwvkFFxUEHPEzIXxkzYG4X46G3Kz2l\nX+XVdR9/u0xaCqZ9acyCuAjxwZ4LEaVPLloHYAFqSD2V60Wy4Q+h8DEAQrS7T+Iu\nIMGtSrDXY8sGqlOfjWueD6bX43ss2XeDm+hLsbLPjY5Btk8WzhPuFrtppSyTh7Pm\n17EWxoBrj+EsgKGVSForYP5gPsHjpyhjhZ1VtjDlHde9CDCk50JYeF2DBcMeGtiq\n5BA8liqfCZRJv8XozIbRgeKW3ZILDQZep5PAWkfHFwKBgQDp8OvkFPW27rBrz1SH\nuM9ser0AliOsF/aqkiyb7bAL3pYEH7NPGNybBSWZaQaVf/zSc0XCDo/AaQO+cEED\nePHnZHokaXNAJFfwrP7KL46WODqGRkOvmvEewnxWf1W8j60M40VLM9YsTTHcXvhV\nOIdux0Uqw9K7w9Z9CLFzzBSLQwKBgQDPKgCYn82pRsgWWKrVeo5i6/OVYf+z5fmG\nEgw54ZLm79lHNYRP0zUhi1iZmLdOLhsn59O/bNAzmqSNuFGY5//KXDgCiYi6QaX9\nK+8ESOfhBoIzGhHdWfwEKIocEX/7jshyG5WkxZ8+SXB+x1xBl+eohiNBhpSvYVIK\n0kh/3480uwKBgQDaKsHyXNGhnguNHzdXszRNmFE2gM4XqelxvQw5BnsNNrF0exO/\nihIBx9T+soFfXpKquLGvfeD1sXm6WflngZ0nC/8UgfrnMH2Kh+q9J4iz8xAxNMne\ntIJ1Cy7lg66zQNJDmJeAwIDVo9ACEddJsoQq/U81yJV4YfRfeoHy2bm2/QKBgQDN\nNRf+F13LblfI+u/OI2ZjysIwmTCHbSjsi3gc5bt0kuWxyetUfyzEG5oaG9KH2NgB\ngXyYxBrA41BZKdl6E2WneA3rRX1wspLP4/MRVX6Lwry6DfrgPsCLBfU4tIUIFHmt\nvnFPFIsXUfvjOWvDdct9fdHymHMz/r0cBwzVzge2/QKBgQDOfqDetphpmIRqnikw\nudVQ8ry78H4jlHZZaxck5b33O4n4EkjyqDj2KMIu5CnFiWCeVvzltMWZaeo/VX9I\noCjBIZrVZ4ajfb/VGWWEd5qJsiGhFF0R+0KOJhNS/eYeeEwhs7qv8ipH/6QTU37q\nIDqjLGaMGXjwnTBnBU3nBWBQ3w==\n-----END PRIVATE KEY-----\n",
            "client_email": "uploaddrive@speedy-atom-351508.iam.gserviceaccount.com",
            "client_id": "115987672125197354922",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/uploaddrive%40speedy-atom-351508.iam.gserviceaccount.com",
            "universe_domain": "googleapis.com"
        };
        const auth = new googleapis_1.google
            .auth
            .GoogleAuth({
            credentials,
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file'
            ]
        });
        this.driveClient = googleapis_1.google.drive({ version: 'v3', auth });
    }
    create(createGoogledriveDto) {
        return 'This action adds a new googledrive';
    }
    findAll() {
        return `This action returns all googledrive`;
    }
    findOne(id) {
        return `This action returns a #${id} googledrive`;
    }
    update(id, updateGoogledriveDto) {
        return `This action updates a #${id} googledrive`;
    }
    remove(id) {
        return `This action removes a #${id} googledrive`;
    }
    async uploadFileFromBuffer(file, folderId) {
        const result = {};
        const fileMetadata = {
            name: file.originalname,
        };
        const bufferStream = new stream_1.PassThrough();
        bufferStream.end(file.buffer);
        if (folderId) {
            fileMetadata.parents = [folderId];
        }
        const media = {
            mimeType: file.mimetype,
            body: bufferStream,
        };
        const response = await this.driveClient.files.create({
            supportsAllDrives: true,
            requestBody: fileMetadata,
            media: media,
            fields: 'id',
        });
        result.fileId = response.data.id;
        result.folderId = folderId;
        const { buffer, ...fileMetadataWithoutBuffer } = file;
        result.Metadata = fileMetadataWithoutBuffer;
        return result;
    }
    async getFileList() {
        const res = await this.driveClient.files.list({});
        return res.data;
    }
    async deleteFile(fileId) {
        return await this
            .driveClient
            .files
            .delete({ fileId });
    }
};
exports.GoogledriveService = GoogledriveService;
exports.GoogledriveService = GoogledriveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogledriveService);
//# sourceMappingURL=googledrive.service.js.map
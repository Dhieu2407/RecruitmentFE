import {Major} from "./major.model";

export class Company {
    id: number;
    tenCongTy: string;
    sdt: string;
    diaChi: string;
    email: string;
    moTa: string;
    phucLoi: string;
    quyMo: number;
    imgUrl: string;
    ungVienSaved: any[];
    congtyId: number;
    idNganh: number;
    major: Major;
}

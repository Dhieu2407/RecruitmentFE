import {Major} from "./major.model";

export class Job {
    jobId : number;
    tenJob: string;
    tenNganh: string; //chuyen ngành
    yeuCauUngVien: string; // yêu cầu kĩ năng ứng viên
    knToiThieu: number; // yêu cầu số năm kinh nghiệm
    luongToiThieu: number;
    luongToiDa: number;
    chiTiet: string; // mô tả công việc
    hanCuoi: string; // hạn apply
    congTyId: number;
    diaChi: string;
    chucVu1: string;
    soLuong: number;
    tgLamViec: number;
    quyenLoi: string;
    yeuCauHoSo: string;
    gioiTinh: number;
    trangThai: string;
    ngayDang: string;
    yeuCauCongViec: string;
    soLuongView: number;
    nganh: Major;
}

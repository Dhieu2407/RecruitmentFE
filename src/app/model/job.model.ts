import {Company} from './company.model';

export class Job {
  id: number;
  titleJob: string;
  location: string;
  major: string; //chuyen ngành
  requireCadiate: string; // yêu cầu kĩ năng ứng viên
  requireYear: number; // yêu cầu số năm kinh nghiệm
  salaryMin: number;
  salaryMax: number;
  description: string; // mô tả công việc
  duedate: string; // hạn apply
  chiTiet: string;
  idCongTy: number;
  diaChi: string;
  chucVu1: string;
  soLuong: number;
  tgLamViec: number;
  quyenLoi: string;
  yeuCauHoSo: string;
  yeuCauGioiTinh: number;
  jobId : number;
  trangThai: string;
}

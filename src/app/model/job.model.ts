import {Company} from './company.model';

export class Job {
  id: number;
  email: string;
  titleJob: string;
  location: string;
  major: string; //chuyen ngành
  requireCadiate: string; // yêu cầu kĩ năng ứng viên
  requireYear: number; // yêu cầu số năm kinh nghiệm
  salary: number;
  description: string; // mô tả công việc
  duedate: string; // hạn apply
  chiTiet: string;
  congTy: Company;
  diaChi: string;
  chucVu1: string;

}

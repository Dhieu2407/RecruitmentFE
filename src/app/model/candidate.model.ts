import { skill } from './skill.model';
import { Major } from './major.model';

export class Candidate {
  id: number;
  username : string;
  email : string;
  password : string;
  major : Major;
  tenUngVien : string;
  diachi : string;
  sdt : string;
  trinhDoDaiHoc : string;
  luongMongMuon : number;
  moTa : string;
  kiNang: skill;
  nganh: Major;
  lichSuLamViec: string;
  mucTieuNgheNghiep: string
}

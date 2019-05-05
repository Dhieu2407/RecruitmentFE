export class Resume {
  id: number;

  // basic infomation
  name: string;
  email: string;
  phone: string;
  career: string; // nganh nghe
  address : string;
  wantedPosition: string;
  age: number;
  wantedSalary: number;
  yearsOfExperience: number;
  workForm: number; // part time
  expertise: string; //kiến thức chuyên môn
  careerGoals: string; // mục tiêu nghề nghiệp

  // education
  certificate: string; // bằng cấp
  major: string; // ngành học
  school: string;
  fromDate: any;
  toDate: any;
  description: string;

  // experience
  companyName: string;
  workPosition: string;
  startDate: any;
  endDate: any;
  workDescription: string;

  // skill
  skill: string;
  competentlyPercent: number;

  imgUrl: string;
}

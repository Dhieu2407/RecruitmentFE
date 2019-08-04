import {Candidate} from './candidate.model';
import {Job} from "./job.model";

export class Apply {
    applyId: number;
    jobId: number;
    candidateId: number;
    status: number;
    trangThai: number;
    ungVien: Candidate;
    job: Job;

}

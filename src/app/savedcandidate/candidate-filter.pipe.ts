import {Pipe, PipeTransform} from '@angular/core';
import {Candidate} from "../model/candidate.model";

@Pipe({
    name: 'candateFilter'
})

export class CandidateFilterPipe implements PipeTransform {
    transform(companySaveCandidate: Candidate[], searchName: string): Candidate[] {
        if (!companySaveCandidate || !searchName) {
            return companySaveCandidate;
        }

        return companySaveCandidate.filter(candidate =>
        candidate.tenUngVien.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
}

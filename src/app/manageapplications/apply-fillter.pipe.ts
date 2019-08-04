import {Pipe, PipeTransform} from '@angular/core';
import {Apply} from "../model/apply.model";

@Pipe({
    name: 'applyFilter'
})
export class ApplyFillterPipe implements PipeTransform{
    transform(listCandidateApplyOfCompany: Apply[], searchName: string): Apply[] {
        if (!listCandidateApplyOfCompany || !searchName) {
            return listCandidateApplyOfCompany;
        }
        return listCandidateApplyOfCompany.filter(apply =>
        apply.job.tenJob.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
}

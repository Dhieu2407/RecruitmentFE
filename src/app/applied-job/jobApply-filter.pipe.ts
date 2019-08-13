import {Pipe, PipeTransform} from '@angular/core';
import {Apply} from "../model/apply.model";

@Pipe({
    name: 'jobApplyFilter'
})
export class JobApplyFilterPipe implements PipeTransform {
    transform(jobList: Apply[], searchName: string): Apply[] {
        if ( !jobList || !searchName) {
            return jobList;
        }
        return jobList.filter(apply =>
        apply.job.tenJob.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
}

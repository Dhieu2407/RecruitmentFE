import {Pipe, PipeTransform} from '@angular/core';
import {Job} from "../model/job.model";

@Pipe ({
    name: 'jobFilter'
})
export class JobFilterPipe implements PipeTransform {
    transform(listJobOfCompany: Job[], searchName: string): Job[] {
        if (!listJobOfCompany || !searchName) {
            return listJobOfCompany;
        }
        return listJobOfCompany.filter(job =>
        job.tenJob.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
}

import {Pipe, PipeTransform} from '@angular/core';
import {Company} from "../model/company.model";

@Pipe({
    name: 'filterCompany'
})
export class CompanyFilterPipe implements PipeTransform{
    transform(companyList: Company[], searchName: string): any {
        if (!companyList || !searchName) {
            return companyList;
        }
        return companyList.filter(company =>
        company.tenCongTy.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
}

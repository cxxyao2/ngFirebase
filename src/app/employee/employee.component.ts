import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../firebase.service';

import Employee from '../employ';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  title = 'angular9-firebaseapp';

  employee: any;
  employeeName!: string;
  employeeAge!: number;
  employeeAddress!: string;
  message!: string;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.get_Allemployee().subscribe((data) => {
      // this.employee = data;
      console.log(data);
    });
  }

  CreateRecord() {
    const Record: Employee = {
      name: '',
      age: 0,
      address: '',
    };
    Record.name = this.employeeName;
    Record.age = this.employeeAge;
    Record.address = this.employeeAddress;

    this.firebaseService
      .create_Newemployee(Record)
      .then((res) => {
        this.employeeName = '';
        this.employeeAge = 0;
        this.employeeAddress = '';
        console.log('added record is ', res.id);
        this.message = 'Employee data save Done';
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  EditRecord(Record: any) {
    Record.isedit = true;
    Record.editname = Record.name;
    Record.editage = Record.age;
    Record.editaddress = Record.address;
  }

  Updatarecord(recorddata: any) {
    let record: Employee = {
      name: '',
      age: 0,
      address: '',
    };
    // tslint:disable-next-line: no-string-literal
    record['name'] = recorddata.editname;
    record['age'] = recorddata.editage;
    record['address'] = recorddata.editaddress;
    this.firebaseService.update_employee(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deleteemployee(record_id: any) {
    this.firebaseService.delete_employee(record_id);
  }
}

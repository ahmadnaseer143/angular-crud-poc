import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserModel } from './user-dashboard-model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  formValue!: FormGroup;
  users!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  userModelObj: UserModel = new UserModel();

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
    });
    this.getAllUsers();
  }

  clickOnAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUserDetails() {
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;

    this.api.create(this.userModelObj).subscribe(
      (res) => {
        // console.log(res);
        let closeRef = document.getElementById('close');
        closeRef?.click();
        this.formValue.reset();
        this.getAllUsers();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllUsers() {
    this.api.getAll().subscribe(
      (res) => {
        this.users = res;
      },
      (err) => console.log(err)
    );
  }

  deleteUser(id: any) {
    this.api.delete(id).subscribe((res) => this.getAllUsers());
  }

  onEdit(user: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = user.id;
    this.formValue.controls['name'].setValue(user.name);
    this.formValue.controls['email'].setValue(user.email);
    this.formValue.controls['mobile'].setValue(user.mobile);
  }

  updateUserDetails() {
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;

    this.api.update(this.userModelObj.id, this.userModelObj).subscribe(
      (res) => {
        // console.log(res);
        let closeRef = document.getElementById('close');
        closeRef?.click();
        this.formValue.reset();
        this.getAllUsers();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.router.navigate(['login']);
  }
}

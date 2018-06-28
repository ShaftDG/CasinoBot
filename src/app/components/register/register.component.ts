import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../_models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string;
  username: string;
  password: string;

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  constructor(private userService: UserService,
              private router: Router, private route: ActivatedRoute) { }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit() {
  }

  createUser() {
    let data = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.firstName
    };

    console.log(data);
    this.userService.postUser(data)
      .subscribe(res => {
        this.router.navigate(['']);
      }, (err) => {
        console.log(err);
      });
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}

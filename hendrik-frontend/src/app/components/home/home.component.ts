import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-bootstrap-ext';
import {BuildEvent} from "../../common/BuildEvent";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
  ) { }

  subjectNumber = ''

  ngOnInit(): void {
    this.toastService.add({
      title: '\n',
      body: 'Please enter your subject number (Versuchspersonennummer) below',
      class: 'bg-primary text-white',
      delay: 5000,
    });
  }

  formGroup = new FormGroup({
    subjectNumber: new FormControl('', [Validators.required]),
  })

  submit() {
    const newEntry = {
      subjectNumber: this.formGroup.get('subjectNumber')?.value,

    }

    this.http.post<BuildEvent>(environment.baseurl + 'event/', newEntry).subscribe(
      () => {
        this.router.navigate(['home', this.formGroup.get('user')?.value]);
      },
      (error) => {
        this.toastService.error('Exception', `Problem: ${JSON.stringify(error, null, 3)}`);
      }
    )
  }
}

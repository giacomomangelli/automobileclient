import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Automobile } from '../automobile'
import { AutomobileService } from '../automobile.service';

@Component({
  selector: 'app-automobile-create',
  templateUrl: './automobile-create.component.html',
  styleUrls: ['./automobile-create.component.css']
})
export class AutomobileCreateComponent implements OnInit {
  automobile: Automobile = new Automobile();
  errorMessage: string = '';

  constructor(private automobileService: AutomobileService, private router: Router) { }

  ngOnInit(): void {
  }

  save(automobileForm: NgForm): void {
    console.log('sub ' + JSON.stringify(this.automobile));
    console.log('Errori ' + automobileForm.form.controls);
    console.log('touched ' + automobileForm.touched);
    console.log('valid ' + automobileForm.form.valid);
    if (automobileForm.valid) {
      this.automobileService.create(this.automobile).subscribe(
        automobileItem => {
          this.automobile = automobileItem;
          console.log('inserito ' + JSON.stringify(automobileItem))
        },
        err => this.errorMessage = err,
        () => this.router.navigate([`/automobile/${this.automobile.id}`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
      );
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }
  }

}
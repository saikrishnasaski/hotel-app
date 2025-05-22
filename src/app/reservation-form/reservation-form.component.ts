import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Reservation} from '../models/reservation';
import {ReservationService} from '../reservation/reservation.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private service: ReservationService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      let reservation = this.service.getReservationById(id);

      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  checkInDate() {
    return this.reservationForm.get('checkInDate');
  }

  checkOutDate() {
    return this.reservationForm.get('checkOutDate');
  }

  guestName() {
    return this.reservationForm.get('guestName');
  }

  guestEmail() {
    return this.reservationForm.get('guestEmail');
  }

  roomNumber() {
    return this.reservationForm.get('roomNumber');
  }

  onSubmit() {
    console.log(this.reservationForm.valid)
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      let id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.service.updateReservation(id, reservation);
      }
      else {
        this.service.addReservation(reservation);
      }
      this.router.navigate(['/list']);
    }
  }
}

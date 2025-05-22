import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../reservation/reservation.service';
import {Reservation} from '../models/reservation';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  standalone: false,
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(
    private service: ReservationService,
    private router: Router) {
  }

  ngOnInit(): void {
     this.reservations = this.service.listReservations();
  }

  deleteReservation(id: string) {

    this.service.deleteReservation(id);
  }

  editReservation(reservation: Reservation) {
    this.router.navigate(['/edit', reservation.id])
  }
}

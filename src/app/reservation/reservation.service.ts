import {Injectable, OnInit} from '@angular/core';
import {Reservation} from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservation[] = [];

  constructor() {
    if (this.reservations.length === 0) {
      let json = localStorage.getItem('reservations');
      if (json) {
        this.reservations = JSON.parse(json);
      }
    }
  }

  addReservation(reservation: Reservation) {

    reservation.id = Date.now().toString();
    this.reservations.push(reservation);

    let json = JSON.stringify(this.reservations);

    localStorage.setItem('reservations', json);
  }

  listReservations() : Reservation[] {
    return this.reservations;
  }

  getReservationById(id: string): Reservation | undefined {

    return this.reservations.find(r => r.id === id);
  }

  deleteReservation(id: string) {
    let index =this.reservations.findIndex(r => r.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(id: string, reservation: Reservation) {

    let index =this.reservations.findIndex(r => r.id === id);
    reservation.id = id;
    this.reservations[index] = reservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}

/* eslint-disable prettier/prettier */
import { startOfHour } from "date-fns";

import { Injectable } from "@nestjs/common";

import Appointment from "../models/Appointment";
import { AppointmentsRepository } from "../repositories/AppointmentsRepository";
interface IRequest {
  date: Date;
  provider: string;
}

@Injectable()
export class CreateAppointmentService{
  constructor(private readonly appointmentRepository: AppointmentsRepository) {}

  async createUser(firstName: string, lastName: string):Promise<Appointment> {
    return this.appointmentRepository.CreateAppointmentService(firstName, lastName);
  }
}









export default CreateAppointmentService;

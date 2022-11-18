/* eslint-disable prettier/prettier */

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/commonjs";
import { MongoRepository } from "typeorm";
 
import Appointment from "../models/Appointment";

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: MongoRepository<Appointment>,

  ) {}


async CreateAppointmentService(firstName: string, lastName: string): Promise<Appointment> {
  const appointment = new Appointment();

  await this.appointmentsRepository.save(appointment);

  return appointment;

} 


}
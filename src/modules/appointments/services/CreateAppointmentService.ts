import "reflect-metadata"
import { startOfHour } from "date-fns";
import {injectable ,inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";
import Appointment from "../infra/typeorm/entities/Appointments";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
//SOLID
//Dependency Inversion Principle
//Open Closed Principle
//Liskov Substitution Principle
//Interface Segregation Principle
//Dependency Invertion Principle
interface IRequest { 
  provider_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository') 
    private appointmentsRepository: IAppointmentsRepository, 
    ) {}

    public async execute({ date , provider_id }: IRequest): Promise <Appointment> {

      const appointmentDate = startOfHour(date); 

      const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate,);

    if (findAppointmentInSameDate) {
      throw new AppError('this appointment is already booked'); 
    
    } 

    const appointment = await this.appointmentsRepository.create({ 
    provider_id,
    date: appointmentDate,
  }); 

    return appointment;
  }
}
export default CreateAppointmentService;


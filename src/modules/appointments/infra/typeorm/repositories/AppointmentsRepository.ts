import { EntityRepository, Repository } from "typeorm";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import Appointment from "../entities/Appointment";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> 

//solid

//liskov substitution principle

implements IAppointmentsRepository { //responsavel por , criar , armazenar , deletar , editar 
  
  public async findByDate(date: Date): Promise <Appointment | undefined> { //um por data 
      const findAppointment = await this.findOne({
        where: {date},
      });
      return findAppointment || null; // ta encontrando um compromisso 

  }

}

export default AppointmentsRepository;
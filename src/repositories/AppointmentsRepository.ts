import { EntityRepository, Repository } from "typeorm";

import Appointment from "../models/Appointment";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> { //responsavel por , criar , armazenar , deletar , editar 
  public async findByDate(date: Date): Promise <Appointment | null> { //um por data 
      const findAppointment = await this.findOne({
        where: {date},
      });
      return findAppointment || null; // ta encontrando um compromisso 

  }

}

export default AppointmentsRepository;
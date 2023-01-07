import Appointment from "../infra/typeorm/entities/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";

/*
* [x] recebimento de informacoes
* [x] tratativa de erros/excessoes
* [x] acesso ao repositorio

*/ 

interface Request { // DTO data transfer object
  provider_id: string;
  date: Date;
}


/*
* dependency inversion (SOLID) (inversão de dependência)
* single responsability principle (princípio da responsabilidade única)
*/ 
 //DRY: dont repeat yourself

class CreateAppointmentService { //executando a criancao de um novo appointment
    public async execute({ date , provider_id }: Request): Promise <Appointment> {
      const appointmentsRepository = getCustomRepository(AppointmentsRepository);

      const appointmentDate = startOfHour(date); // regra de negocio , agendamento de hora em hora

      const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate); // retornar um objeto appointmnet se tiver um agendamento pela data e um unico parametro data

    if (findAppointmentInSameDate) { //encontrando um appointment na mesma data
      throw new AppError('this appointment is already booked'); //lancando um erro
    
    } 

    const appointment = appointmentsRepository.create({ 
    provider_id,
    date: appointmentDate,
  }); 
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;

//service nao tem acesso direto aos dados da requisicao e os dados da resposta
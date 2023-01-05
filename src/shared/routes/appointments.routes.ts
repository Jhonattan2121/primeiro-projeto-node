import {  Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";


import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import AppointmentsRepository from "../modules/appointments/repositories/AppointmentsRepository";
import CreateAppointmentService from "../modules/appointments/services/CreateAppointmentService";

const appointmentsRouter = Router(); // Agendar 

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request , response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository) 
  const appointments = await appointmentsRepository.find();  //busca todos os dados la dentro

  return response.json(appointments);
})

appointmentsRouter.post("/", async (request, response) => {
 
  const { provider_id , date } = request.body; //corpo do agendamento

  const parsedDate = parseISO(date); //transformando dado
    
  const createAppointment = new CreateAppointmentService()
    
  const appointment = await createAppointment.execute({ 
    date: parsedDate, 
    provider_id 
  });

  return response.json({appointment}) // retorna a resposta do compromisso
 
});
 

export default appointmentsRouter;


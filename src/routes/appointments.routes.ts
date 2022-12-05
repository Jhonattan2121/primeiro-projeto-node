import {  Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router(); // Agendar 

appointmentsRouter.get('/', async (request , response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository) 
  const appointments = await appointmentsRepository.find();  //busca todos os dados la dentro

  return response.json(appointments);
})

appointmentsRouter.post("/", async (request, response) => {
 try {
  const { provider , date } = request.body; //corpo do agendamento

  const parsedDate = parseISO(date); //transformando dado
    
  const createAppointment = new CreateAppointmentService()
    
  const appointment = await createAppointment.execute({ 
    date: parsedDate, 
    provider 
  });

  return response.json({appointment}) // retorna a resposta do compromisso
 } catch (err: any) {
  return response.status(400).json({ error: err.message });
 }
});
 

export default appointmentsRouter;


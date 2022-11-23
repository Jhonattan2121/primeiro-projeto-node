/* eslint-disable prettier/prettier */
import {  Router } from "express";
import {parseISO} from "date-fns";
import { getCustomRepository } from "typeorm"; 

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import { AppDataSource } from "../database/data-source"

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get("/", (_request , response) => {
  const  appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post("/", (request, response) => {
  try {
    const { provider, date } = request.body;

  const parsedDate = parseISO(date);


  const createAppointment = new CreateAppointmentService(appointmentsRepository,);

  const appointment = createAppointment.execute({date: parsedDate, provider});


  return response.json(appointment);
  } catch (err:any) {
    return response.status(400).json({ error: err.message });
  }

});

export default appointmentsRouter;


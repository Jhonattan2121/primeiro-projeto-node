import {  Router } from "express";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

const sessionsRouter = Router(); // Agendar 


sessionsRouter.post('/', async (request, response) => {
 
    const {email , password} = request.body;
    const usersRepository = new UsersRepository();
    const AuthenticateUser = new AuthenticateUserService(usersRepository);

    const { user ,token } = await AuthenticateUser.execute({
      email,
      password,
    })

    delete user.password;

    return response.json({ user, token });
 
});
 

export default sessionsRouter;


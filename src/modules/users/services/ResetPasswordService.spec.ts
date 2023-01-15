import AppError from "@shared/errors/AppError";

import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from "./ResetPasswordService";


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let ResetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository();
      fakeUserTokensRepository = new FakeUserTokensRepository();
    
     ResetPassword = new ResetPasswordService(
      fakeUsersRepository, 
      fakeUserTokensRepository,
      );
  })
  it('should be able to reset the password', async () => {
   let user = await fakeUsersRepository.create({
      name: 'Jhon Ferri',
      email: 'jhonferri@gmail.com',
      password: '123456789',
    });

    const {token} = await fakeUserTokensRepository.generate(user.id);
      


     await ResetPassword.execute({
        password: '123456',
        token,
      });

      const updatedUser = await fakeUsersRepository.findById(user.id)


      expect(updatedUser.password).toBe('123456');
  });

});
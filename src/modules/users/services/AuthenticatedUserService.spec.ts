import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository, 
      fakeHashProvider, 
      );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

      const  user = await createUser.execute({
        name: 'Jhon Ferri',
        email:  'jhonferri@gmail.com',
        password: '123456789',
      })

    const response = await authenticateUser.execute({
        email:  'jhonferri@gmail.com',
        password: '123456789',
      });
      expect(response).toHaveProperty('token');
      expect(response.user).toEqual(user);
  });
});
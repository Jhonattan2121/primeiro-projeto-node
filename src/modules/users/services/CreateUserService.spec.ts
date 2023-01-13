import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
describe('CreateUser', () => {
  it('should be able to create a new appointment', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const user = await createUser.execute({
        name: 'Jhon Ferri',
        email:  'jhonferri@gmail.com',
        password: '123456789',
      });
      expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const user = await createUser.execute({
        name: 'Jhon Ferri',
        email:  'jhonferri@gmail.com',
        password: '123456789',
      });
      expect(createUser.execute({
        name: 'Jhon Ferri',
        email:  'jhonferri@gmail.com',
        password: '123456789',
      }),
       ).rejects.toBeInstanceOf(AppError);
  });
});
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Ferri',
      email: 'jhonferri@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Ferri f',
      email: 'jhonferrif@test.com',
    });

    expect(updatedUser.name).toBe('Jhon Ferri f');
    expect(updatedUser.email).toBe('jhonferrif@test.com');
  });

  it('should not be able update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'test',
        email: 'test@gmail.com'
      }),
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Ferri',
      email: 'jhonferri@test.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: '123123',
    });

    await expect( // Erro de teste
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon ferreira',
        email: 'jhonferreira@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing id',
        name: 'John Doe',
        email: 'joedoe@exemple.com'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Ferri',
      email: 'jhonferri@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Pedro Pascal',
      email: 'pedropascal@cal.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Ferri',
      email: 'jhonferri@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Pedro Pascal',
        email: 'pedropascal@cal.com',

        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Ferri',
      email: 'jhonferri@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Pedro Pascal',
        email: 'pedropascal@cal.com',
        old_password: 'wrong-old_password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
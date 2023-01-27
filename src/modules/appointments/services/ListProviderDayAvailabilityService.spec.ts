import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 14, 0, 0 )
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 15, 0, 0 )
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2023 , 1 , 26 , 11).getTime();

    });

   const availability = await listProviderDayAvailability.execute({
    provider_id: 'user',
    year: 2023,
    month: 0,
    day: 26,
   });

   expect(availability).toEqual(
    expect.arrayContaining([
    {hour: 8, available: false},
    {hour: 9, available: false},
    {hour: 10, available: false},
    {hour: 13, available: true},
    {hour: 14, available: false},
    {hour: 15, available: false},
    {hour: 16, available: true},
   ]),
   );
  });

  
});
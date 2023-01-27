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
      date: new Date(2023, 1, 26, 9, 0, 0 )
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 11, 0, 0 )
    });

   const availability = await listProviderDayAvailability.execute({
    provider_id: 'user',
    year: 2023,
    month: 1,
    day: 26,
   });

   expect(availability).toEqual(expect.arrayContaining([
    {hour: 8, available: false},
    {hour: 9, available: true},
    {hour: 10, available: true},
    {hour: 11, available: true},
   ])
   )
  });
});
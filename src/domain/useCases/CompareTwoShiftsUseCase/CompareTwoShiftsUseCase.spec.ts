/* eslint-disable no-undef */
import { compareTwoShiftsUseCase } from '.';

describe('CompareTwoShiftsUseCase', () => {
  describe('Different facility id', () => {
    test('No overlap in the same day', () => {
      const firstShift = {
        shiftId: 1,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '07:00:00',
        endTime: '15:00:00',
      };
      const secondShift = {
        shiftId: 2,
        facilityId: 101,
        shiftDate: new Date('2022-10-01'),
        startTime: '15:00:00',
        endTime: '23:00:00',
      };
      const result = compareTwoShiftsUseCase.execute({
        firstShift,
        secondShift,
      });
      expect(result).toEqual({
        overlapMinutes: 0,
        maximumOverlapThreshold: 0,
        exceedsOverlapThreshold: false,
      });
    });

    test('No overlap in different day', () => {
      const firstShift = {
        shiftId: 1,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '07:00:00',
        endTime: '15:00:00',
      };
      const secondShift = {
        shiftId: 2,
        facilityId: 101,
        shiftDate: new Date('2022-11-01'),
        startTime: '13:00:00',
        endTime: '23:00:00',
      };
      const result = compareTwoShiftsUseCase.execute({
        firstShift,
        secondShift,
      });
      expect(result).toEqual({
        overlapMinutes: 0,
        maximumOverlapThreshold: 0,
        exceedsOverlapThreshold: false,
      });
    });
    test('Exceeded overlap', () => {
      const firstShift = {
        shiftId: 1,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '07:00:00',
        endTime: '15:00:00',
      };
      const secondShift = {
        shiftId: 2,
        facilityId: 101,
        shiftDate: new Date('2022-10-01'),
        startTime: '10:00:00',
        endTime: '23:00:00',
      };
      const result = compareTwoShiftsUseCase.execute({
        firstShift,
        secondShift,
      });
      expect(result).toEqual({
        overlapMinutes: 300,
        maximumOverlapThreshold: 0,
        exceedsOverlapThreshold: true,
      });
    });
  });

  describe('Same facility id', () => {
    test('No overlap in the same day', () => {
      const firstShift = {
        shiftId: 1,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '07:00:00',
        endTime: '15:00:00',
      };
      const secondShift = {
        shiftId: 2,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '15:00:00',
        endTime: '23:00:00',
      };
      const result = compareTwoShiftsUseCase.execute({
        firstShift,
        secondShift,
      });
      expect(result).toEqual({
        overlapMinutes: 0,
        maximumOverlapThreshold: 30,
        exceedsOverlapThreshold: false,
      });
    });
    test('Correct overlap', () => {
      const firstShift = {
        shiftId: 1,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '07:00:00',
        endTime: '15:30:00',
      };
      const secondShift = {
        shiftId: 2,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '15:00:00',
        endTime: '23:00:00',
      };
      const result = compareTwoShiftsUseCase.execute({
        firstShift,
        secondShift,
      });
      expect(result).toEqual({
        overlapMinutes: 30,
        maximumOverlapThreshold: 30,
        exceedsOverlapThreshold: false,
      });
    });
    test('Exceeded overlap', () => {
      const firstShift = {
        shiftId: 1,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '07:00:00',
        endTime: '16:00:00',
      };
      const secondShift = {
        shiftId: 2,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '15:00:00',
        endTime: '23:00:00',
      };
      const result = compareTwoShiftsUseCase.execute({
        firstShift,
        secondShift,
      });
      expect(result).toEqual({
        overlapMinutes: 60,
        maximumOverlapThreshold: 30,
        exceedsOverlapThreshold: true,
      });
    });
  });

  describe('Reverse calculation test', () => {
    test('Reverse exceeded', () => {
      const firstShift = {
        shiftId: 1,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '07:00:00',
        endTime: '15:00:00',
      };
      const secondShift = {
        shiftId: 2,
        facilityId: 101,
        shiftDate: new Date('2022-10-01'),
        startTime: '10:00:00',
        endTime: '23:00:00',
      };
      const result = compareTwoShiftsUseCase.execute({
        secondShift,
        firstShift,
      });
      expect(result).toEqual({
        overlapMinutes: 300,
        maximumOverlapThreshold: 0,
        exceedsOverlapThreshold: true,
      });
    });
    test('Reverse with correct overlap', () => {
      const firstShift = {
        shiftId: 1,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '07:00:00',
        endTime: '15:30:00',
      };
      const secondShift = {
        shiftId: 2,
        facilityId: 100,
        shiftDate: new Date('2022-10-01'),
        startTime: '15:00:00',
        endTime: '23:00:00',
      };
      const result = compareTwoShiftsUseCase.execute({
        secondShift,
        firstShift,
      });
      expect(result).toEqual({
        overlapMinutes: 30,
        maximumOverlapThreshold: 30,
        exceedsOverlapThreshold: false,
      });
    });
  });
});

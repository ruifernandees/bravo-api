/* eslint-disable max-len */
import {
  compareAsc, compareDesc, differenceInMinutes, parse,
} from 'date-fns';
import { IQuestionOneShift } from './IQuestionOneShift';

/* eslint-disable no-unused-vars */
export class ShiftComparison {
  private MAXIMUM_THRESHOLD_SAME_FACILITY = 30;

  private MAXIMUM_THRESHOLD_DIFFERENT_FACILITY = 0;

  private DEFAULT_TIME_FORMAT = 'HH:mm:ss';

  constructor(private firstShift: IQuestionOneShift, private secondShift: IQuestionOneShift) {}

  computeMaximumOverlapThreshold() {
    if (this.firstShift.facilityId !== this.secondShift.facilityId) {
      return this.MAXIMUM_THRESHOLD_DIFFERENT_FACILITY;
    }
    return this.MAXIMUM_THRESHOLD_SAME_FACILITY;
  }

  computeOverlapMinutes(): number {
    const shiftsAreFromDifferentDays = compareAsc(this.firstShift.shiftDate, this.secondShift.shiftDate) !== 0;
    if (shiftsAreFromDifferentDays) return 0;

    const firstShiftStartTimeAsDate = parse(this.firstShift.startTime, this.DEFAULT_TIME_FORMAT, new Date());
    const firstShiftEndTimeAsDate = parse(this.firstShift.endTime, this.DEFAULT_TIME_FORMAT, new Date());
    const secondShiftStartTimeAsDate = parse(this.secondShift.startTime, this.DEFAULT_TIME_FORMAT, new Date());
    const secondShiftEndTimeAsDate = parse(this.secondShift.endTime, this.DEFAULT_TIME_FORMAT, new Date());

    const firstShiftStartedBeforeSecond = compareDesc(firstShiftStartTimeAsDate, secondShiftStartTimeAsDate) === 1;
    console.log({
      firstShiftStartedBeforeSecond,
      firstShiftStartTimeAsDate,
      firstShiftEndTimeAsDate,
      secondShiftStartTimeAsDate,
      secondShiftEndTimeAsDate,
    });

    if (firstShiftStartedBeforeSecond) {
      return this.getDifferenceInMinutes(secondShiftStartTimeAsDate, firstShiftEndTimeAsDate);
    }
    return this.getDifferenceInMinutes(firstShiftStartTimeAsDate, secondShiftEndTimeAsDate);
  }

  isOverlapThresholdExceeded(maximumOverlapThreshold: number, overlapMinutes: number): boolean {
    return overlapMinutes > maximumOverlapThreshold;
  }

  private getDifferenceInMinutes(first: Date, second: Date): number {
    const result = differenceInMinutes(second, first);
    console.log({ result });
    return result > 0 ? result : 0;
  }
}

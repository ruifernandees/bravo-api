import { ICompareTwoShiftsDTOInput } from '../../dtos/ICompareTwoShiftsDTOInput';
import { ICompareTwoShiftsDTOOutput } from '../../dtos/ICompareTwoShiftsDTOOutput';
import { ShiftComparison } from '../../entities/IShiftComparison';

export class CompareTwoShiftsUseCase {
  async execute(
    { firstShift, secondShift }: ICompareTwoShiftsDTOInput,
  ): Promise<ICompareTwoShiftsDTOOutput> {
    const shiftComparison = new ShiftComparison(firstShift, secondShift);
    const maximumOverlapThreshold = shiftComparison.computeMaximumOverlapThreshold();
    const overlapMinutes = shiftComparison.computeOverlapMinutes();
    const exceedsOverlapThreshold = shiftComparison.isOverlapThresholdExceeded(
      maximumOverlapThreshold,
      overlapMinutes,
    );
    return {
      maximumOverlapThreshold,
      overlapMinutes,
      exceedsOverlapThreshold,
    };
  }
}

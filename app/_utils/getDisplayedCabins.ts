import { cabinsFilter, CabinsFilterValue, CabinsFilterValueType } from '../_constants/cabinsFilter';
import { CabinType } from '../_types/dataTypes';

export const getDisplayedCabins = (
  cabins: CabinType[],
  filter: CabinsFilterValueType
) => {
    let displayedCabins: CabinType[] = [];
    switch (filter) {
      case CabinsFilterValue.ALL:
        displayedCabins = cabins;
        break;
      case CabinsFilterValue.SMALL:
        displayedCabins = cabins.filter(
          (c) => c.maxCapacity <= cabinsFilter[CabinsFilterValue.SMALL]
        );
        break;
      case CabinsFilterValue.MEDIUM:
        displayedCabins = cabins.filter(
          (c) =>
            c.maxCapacity > cabinsFilter[CabinsFilterValue.SMALL] &&
            c.maxCapacity < cabinsFilter[CabinsFilterValue.LARGE]
        );
        break;
      case CabinsFilterValue.LARGE:
         displayedCabins = cabins.filter(
           (c) => c.maxCapacity >= cabinsFilter[CabinsFilterValue.LARGE]
         );
        break;
        default:
          throw Error('This filter is incorrect');
    }
    return displayedCabins;
};
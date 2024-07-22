
export const cabinsFilter = {
  small: 3,
  large: 8,
}
 export enum CabinsFilterValue{
  ALL = 'all',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE= 'large',
 }
 export  type CabinsFilterValueType =(typeof CabinsFilterValue)[keyof typeof CabinsFilterValue];
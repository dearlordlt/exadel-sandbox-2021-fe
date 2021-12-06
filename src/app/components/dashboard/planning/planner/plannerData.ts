export interface PlannerDataInt {
  id: string;
  userData: DataObj1[];
}

export interface DataObj1 {
  name: string;
  position: string;
  eventData: DataObj2[];
}

export interface DataObj2 {
  id: number;
  available: boolean;
  taken: boolean;
  candidate: string;
  skype: string;
  description: string;
  time: string;
}

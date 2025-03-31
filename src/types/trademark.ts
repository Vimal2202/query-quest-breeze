
export interface Trademark {
  id: string;
  name: string;
  owner: string;
  registrationNumber: string;
  registrationDate: string;
  status: 'live' | 'dead';
  statusDate: string;
  description: string;
  class: string;
  classCode?: string;
  logo?: string;
  statusType?: 'Live/Registered';
  nextRenewalDate?: string;
}

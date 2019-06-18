export interface DataContainer {
    data: Container
};
  
export interface Container {
    _id: string;
    name: string;
    status: string;
    labels: any;
    ports: any;
};
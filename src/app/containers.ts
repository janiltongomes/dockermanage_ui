export interface DataContainer {
    data: Container
};
  
export interface Container {
    id: string;
    name: string;
    status: string;
    labels: any;
    ports: any;
};
export interface DataImage {
    data: Image
};
  
export interface Image {
    id: string;
    labels: any;
    tags: any;
};

export interface ImageRequestAction {
    id: string
};

export class ImageRequestContainerCreate {
    type: string;
};

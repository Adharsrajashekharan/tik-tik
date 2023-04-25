export type Video= {
    caption: string;
    video: {
      asset: {
        _id: string;
        url: string;
      };
    };
    _id: string;
    postedby: {
      _id: string;
      username: string;
      image: string;
    };
    likes: {
      postedby: {
        _id: string;
        username: string;
        image: string;
      };
    }[];
    comments: {
      comment: string;
      _key: string;
      postedby: {
        _ref: string;
      };
    }[];
    userId: string;
  }
  
  export interface IUser {
    _id: string;
    _type: string;
    username: string;
    image: string;
  }
export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
  url: {
    base: string
    author: string
  }
  links: {
    home: string
    about: string
    github: string
  }
  ogImage: string
  ogImageWidth: number
  ogImageHeight: number
  ogImageAlt: string
}

// Get User
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

// Get Event
export interface IGetEventResponse {
  status: number;
  data: eventProps;
};
export interface eventProps {
  id: number;
  attributes: {
    Name: string;
    Day: eventDayProps[] | null;
    Description: string;
    Content: string;
    Image: {
      data: {
        attributes: {
          name: string;
          alternativeText: string;
          url: string;
          width: number;
          height: number;
        };
      } | null;
    };
  };
};
export interface eventDayProps {
  id: number;
  StartTime: string;
  EndTime: string;
  Price: string;
  Timezone: {
    data: {
      attributes: {
        Abbreviation: string;
        Name: string;
        Offset: string;
      };
    } | null;
  };
  Location: {
    data: {
      attributes: {
        Name: string;
        StreetAddress: string;
        City: string;
        State: string;
        PostalCode: string;
        Website: string;
      };
    } | null;
  };
};

// Get Page
export interface IGetPageResponse {
  status: number;
  data: pagesProps;
};
export interface pagesProps {
  data: pageProps[] | null;
};
export interface pageProps {
  id: number;
  attributes: {
    Title: string;
    Slug: string;
    Content: string;
    SEODescription: string;
    ShowTitle: boolean | null;
    Image: {
      data: {
        attributes: {
          name: string;
          alternativeText: string;
          url: string;
          width: number;
          height: number;
        };
      } | null;
    };
  };
};

// Get Repertoire
export interface songProps {
  id: number;
  attributes: {
    Name: string;
    Artist: string;
    Year: string;
    Genre: string;
  };
};
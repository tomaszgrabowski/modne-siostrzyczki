import { Product, Category } from "src/models";
import * as fromActions from "../actions/";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface ProductsState {
  data: Product[];
  loading: boolean;
  loaded: boolean;
}

const initialState: ProductsState = {
  data: [
    {
      id: "1818b6ee-89a6-5ae3-8715-71d1dfda9277",
      name: "Świąteczna sukienka w kratę",
      date: "2018-11-01",
      category: Category.Sukienki,
      newOffer: true,
      description: `Świąteczna propozycja dla mamy i córki.
      Spódniczki dostępne w rozmiarach od 92 do 140.
      Mama 36 38 40
      Spódniczki dostępne na zamówienie, polski producent`,
      photos: [
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/45027879_566150127157186_3354573653806153728_n.jpg?_nc_cat=109&_nc_ht=scontent-waw1-1.xx&oh=2eaacec4988ae8b5b2fe1cd1cda2d6f4&oe=5C81EF87",
          thumbnail: true
        },
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/45058460_566150147157184_7994547696939565056_n.jpg?_nc_cat=106&_nc_ht=scontent-waw1-1.xx&oh=d8a3139eefa7112238e62959d5e0b4bc&oe=5C7AB19D",
          thumbnail: false
        }
      ],
      price: 130,
      sizes: [
        {
          size: "36",
          reserved: false,
          id: "bf6f3249-3c6a-5808-80d6-1acf72d1a061"
        },
        {
          size: "38",
          reserved: false,
          id: "4824bb9c-d948-5cbb-ad64-bb78103fac80"
        },
        {
          size: "40",
          reserved: false,
          id: "16efb6d7-1eee-5065-86d8-76cdba3ceff7"
        }
      ]
    },
    {
      id: "9f59a90a-77c4-5d9a-a25a-1982107de53c",
      name: "Sukienka w kratę",
      date: "2018-01-02",
      category: Category.Sukienki,
      newOffer: true,
      description: `Ponadczasowa sukienka w kratkę, idealna na zbliżające się świąteczne sesje fotograficzne`,
      photos: [
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/43655166_565960483842817_6519021947370602496_n.jpg?_nc_cat=109&_nc_ht=scontent-waw1-1.xx&oh=34b9588fb04a59e5c2ecea1e3e683449&oe=5C3C9E85",
          thumbnail: true
        }
      ],
      price: 130,
      sizes: [
        {
          size: "80/86",
          reserved: true,
          id: "350cfba2-997e-582c-a909-1d0a305a072b"
        },
        {
          size: "116",
          reserved: true,
          id: "fd7d43c9-d020-5c61-ac64-c0cb056a3374"
        },
        {
          size: "128",
          reserved: false,
          id: "4a1a4766-802a-5c3e-8ec6-ee6ba8a10f5e"
        }
      ]
    },
    {
      id: "498bd6ff-b8e6-50cf-acfd-6903007e809a",
      name: "Kaloszki dziecięce",
      date: "2018-01-01",
      category: Category.Buty,
      newOffer: true,
      description: `Ostatnie dwie pary:
      pszczółki ocieplane, można nosić z ociepleniem i bez, rozmiar 26 długość wkładki z ociepleniem około 16,5 cm
       biedronki nieocieplane rozmiar 25 długość wkładki 16 cm`,
      photos: [
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/44942782_565460203892845_1211861104586653696_n.jpg?_nc_cat=102&_nc_ht=scontent-waw1-1.xx&oh=3c71f0bce9667ff93a762e49ddacbeff&oe=5C3D5E25",
          thumbnail: true
        },
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/43765107_565460230559509_813149807211184128_n.jpg?_nc_cat=105&_nc_ht=scontent-waw1-1.xx&oh=6d7c5450b5d473d4007285e8160ee18d&oe=5C8A7CA3",
          thumbnail: false
        }
      ],
      price: 80,
      sizes: [
        {
          size: "24",
          reserved: false,
          id: "268860f1-ef57-530e-af23-01f7f05826d3"
        },
        {
          size: "26",
          reserved: true,
          id: "db5186f0-6088-5c07-bd6d-5cd372ac9a4f"
        }
      ]
    },
    {
      id: "1818b6ee-89a6-5ae3-8715-71d1dfda9223",
      name: "Świąteczna sukienka",
      date: "2018-01-01",
      category: Category.Sukienki,
      newOffer: true,
      description: `Świąteczna propozycja dla mamy i córki.
      Spódniczki dostępne w rozmiarach od 92 do 140.
      Mama 36 38 40
      Spódniczki dostępne na zamówienie, polski producent`,
      photos: [
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/45027879_566150127157186_3354573653806153728_n.jpg?_nc_cat=109&_nc_ht=scontent-waw1-1.xx&oh=2eaacec4988ae8b5b2fe1cd1cda2d6f4&oe=5C81EF87",
          thumbnail: true
        },
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/45058460_566150147157184_7994547696939565056_n.jpg?_nc_cat=106&_nc_ht=scontent-waw1-1.xx&oh=d8a3139eefa7112238e62959d5e0b4bc&oe=5C7AB19D",
          thumbnail: false
        }
      ],
      price: 130,
      sizes: [
        {
          size: "36",
          reserved: false,
          id: "1ed1b412-f67c-523b-bff8-098c651cb2e2"
        },
        {
          size: "38",
          reserved: false,
          id: "e02a5d95-66e8-51e0-b222-10de709d50a9"
        },
        {
          size: "40",
          reserved: false,
          id: "2f2a90a4-9318-56dc-9cda-55bfe2e15ebd"
        }
      ]
    },
    {
      id: "9f59a90a-77c4-5d9a-a25a-1982107de88c",
      name: "Sukienka w kratę",
      date: "2018-01-01",
      category: Category.Sukienki,
      newOffer: true,
      description: `Ponadczasowa sukienka w kratkę, idealna na zbliżające się świąteczne sesje fotograficzne`,
      photos: [
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/43655166_565960483842817_6519021947370602496_n.jpg?_nc_cat=109&_nc_ht=scontent-waw1-1.xx&oh=34b9588fb04a59e5c2ecea1e3e683449&oe=5C3C9E85",
          thumbnail: true
        }
      ],
      price: 130,
      sizes: [
        {
          size: "80/86",
          reserved: false,
          id: "e5c6a9fb-fe1f-5a8c-a724-b676a51962ae"
        },
        {
          size: "116",
          reserved: false,
          id: "cc29ba10-fdce-5949-9c14-4af3923c0010"
        },
        {
          size: "128",
          reserved: false,
          id: "9b0c8f2f-c2f9-52d7-af33-4ef65cf4ebbd"
        }
      ]
    },
    {
      id: "498bd6ff-b8e6-50cf-acfd-6903007e889a",
      name: "Kaloszki dziecięce",
      date: "2018-01-01",
      category: Category.Buty,
      newOffer: true,
      description: `Ostatnie dwie pary:
      pszczółki ocieplane, można nosić z ociepleniem i bez, rozmiar 26 długość wkładki z ociepleniem około 16,5 cm
       biedronki nieocieplane rozmiar 25 długość wkładki 16 cm`,
      photos: [
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/44942782_565460203892845_1211861104586653696_n.jpg?_nc_cat=102&_nc_ht=scontent-waw1-1.xx&oh=3c71f0bce9667ff93a762e49ddacbeff&oe=5C3D5E25",
          thumbnail: true
        },
        {
          url:
            "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/43765107_565460230559509_813149807211184128_n.jpg?_nc_cat=105&_nc_ht=scontent-waw1-1.xx&oh=6d7c5450b5d473d4007285e8160ee18d&oe=5C8A7CA3",
          thumbnail: false
        }
      ],
      price: 80,
      sizes: [
        {
          size: "24",
          reserved: false,
          id: "57a59f06-3627-5f43-bd24-0680bcb10164"
        },
        {
          size: "26",
          reserved: false,
          id: "7ff60acc-bf61-599a-bbcd-ba550c7cdb58"
        }
      ]
    }
  ],
  loading: false,
  loaded: false
};

export function productsReducer(
  state = initialState,
  action: fromActions.ProductsAction
): ProductsState {
  switch (action.type) {
    case fromActions.LOAD_PRODUCTS:
      ({
        ...state,
        loading: true,
        loaded: false
      });
    case fromActions.LOAD_PRODUCTS_ERROR:
      ({
        ...state,
        loading: false,
        loaded: false
      });
    case fromActions.LOAD_PRODUCTS_SUCCESS:
      ({
        ...state,
        loading: false,
        loaded: true
      });
  }

  return state;
}

//selectors

export const getProductsState = createFeatureSelector<ProductsState>(
  "products"
);
export const getProducts = createSelector(
  getProductsState,
  (state: ProductsState) => state.data
);

export const getProductsByCategories = createSelector(
  getProducts,
  (state: Product[]) =>
    state.reduce((prev, next) => {
      prev[next.category] = prev[next.category] || [];
      prev[next.category].push(next);
      return prev;
    }, {})
);

export const getProductById = (id: string) => {
  return createSelector(
    getProducts,
    (state: Product[]) => {
      return state.find(product => product.id === id);
    }
  );
};

export const getNewProducts = createSelector(
  getProducts,
  (state: Product[]) => state.filter(product => product.newOffer)
);

export const getProductAvailableSizes = (id: string) => {
  return createSelector(
    getProducts,
    (state: Product[]) => {
      return state
        .find(product => product.id === id)
        .sizes.filter(size => size.reserved === false);
    }
  );
};

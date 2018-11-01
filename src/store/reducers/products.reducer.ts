import { Product } from "src/models";
import * as fromActions from "../actions/";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface ProductsState {
  data: Product[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: ProductsState = {
  data: [
    {
      id: "1818b6ee-89a6-5ae3-8715-71d1dfda9277",
      name: "Świąteczna sukienka",
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
        { size: "36", reserved: false },
        { size: "38", reserved: false },
        { size: "40", reserved: false }
      ]
    },
    {
      id: "9f59a90a-77c4-5d9a-a25a-1982107de53c",
      name: "Sukienka w kratę",
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
        { size: "80/86", reserved: false },
        { size: "116", reserved: false },
        { size: "128", reserved: false }
      ]
    },
    {
      id: "498bd6ff-b8e6-50cf-acfd-6903007e809a",
      name: "Kaloszki dziecięce",
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
      sizes: [{ size: "24", reserved: false }, { size: "26", reserved: false }]
    },
    {
      id: "1818b6ee-89a6-5ae3-8715-71d1dfda9277",
      name: "Świąteczna sukienka",
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
        { size: "36", reserved: false },
        { size: "38", reserved: false },
        { size: "40", reserved: false }
      ]
    },
    {
      id: "9f59a90a-77c4-5d9a-a25a-1982107de53c",
      name: "Sukienka w kratę",
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
        { size: "80/86", reserved: false },
        { size: "116", reserved: false },
        { size: "128", reserved: false }
      ]
    },
    {
      id: "498bd6ff-b8e6-50cf-acfd-6903007e809a",
      name: "Kaloszki dziecięce",
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
      sizes: [{ size: "24", reserved: false }, { size: "26", reserved: false }]
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

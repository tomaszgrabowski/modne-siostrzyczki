import { User } from "src/models";
import * as fromActions from "../actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UserState {
  data: User;
  loading: boolean;
  loaded: boolean;
}

const initialState: UserState = {
  data: {
    address: {
      city: "Gdańsk",
      country: "Polska",
      number: "24/35",
      street: "Guderskiego",
      zip: "80-180"
    },
    email: "tomaszgrabowski07@gmail.com",
    id: "f2478c28-9329-5fd0-a7b0-35eb8de6eb80",
    name: "Tomasz",
    phone: "501466878",
    surname: "Grabowski"
  },
  loading: false,
  loaded: false
};

export function userReducer(
  state: UserState = initialState,
  action: fromActions.UserActions
): UserState {
  switch (action.type) {
    case fromActions.LOAD_USER:
      return state;
  }

  return state;
}

//selectors

export const getUserState = createFeatureSelector<UserState>("user");

export const getUser = createSelector(
  getUserState,
  (state: UserState) => state.data
);

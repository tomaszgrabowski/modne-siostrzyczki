import { Action } from "@ngrx/store";

export const REGISTER_USER = "[USER] Register User";
export const CHECK_USER = "[USER] Check User";
export const LOAD_USER = "[USER] Load User";
export const GET_USER = "[USER] Get User";

export class GetUser implements Action{
  type: string = GET_USER;
}

export class CheckUser implements Action{
  type: string = CHECK_USER;
}

export class RegisterUser implements Action{
  type: string = REGISTER_USER;
}

export class LoadUser implements Action{
  type: string = LOAD_USER;
}

export type UserActions = GetUser | CheckUser | RegisterUser | LoadUser;
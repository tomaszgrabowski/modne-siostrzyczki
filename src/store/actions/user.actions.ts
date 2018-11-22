import { Action } from "@ngrx/store";
import { User } from "src/models";

export const REGISTER_USER = "[USER] Register User";

export const LOGIN_USER = "[USER] Login User";
export const LOGIN_USER_SUCCESS = "[USER] Login User Success";
export const LOGIN_USER_FAIL = "[USER] Login User Success";

export class RegisterUser implements Action{
  public readonly type: string = REGISTER_USER;
  constructor(public payload: User){}
}

export class LoginUser implements Action{
  public readonly type: string = LOGIN_USER;
  constructor(public payload: User){}
}
export class LoginUserSuccess implements Action{
  type: string = LOGIN_USER_SUCCESS;
  constructor(public payload: User){}
}

export class LoginUserFail implements Action{
  type: string = LOGIN_USER_FAIL;
}

export type UserActions = LoginUser | RegisterUser | LoginUserSuccess | LoginUserFail;
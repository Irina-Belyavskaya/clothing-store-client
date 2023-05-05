import { BaseState } from "types/base-state.type";
import {UserInfoDto} from "./user-info-dto.type";
import {UpdateUserInfoDtoType} from "./update-user-info-dto.type";

export interface UserInfoState extends BaseState {
  userInfo: UpdateUserInfoDtoType | null;
  pending: {
    userInfo: boolean;
  };
  errors: {
    userInfo: string | null;
  }
}
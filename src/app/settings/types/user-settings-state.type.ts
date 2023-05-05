import {BaseState} from "../../../types/base-state.type";
import {UpdateUserPasswordDtoType} from "./update-user-password-dto.type";

export interface UserSettingsStateType extends BaseState {
    userSettings: UpdateUserPasswordDtoType | null;
    pending: {
        userSettings: boolean;
    };
    errors: {
        userSettings: string | null;
    }
}
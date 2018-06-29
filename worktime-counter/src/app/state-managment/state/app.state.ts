import {User} from './user';
import {EditMode} from './edit-mode';

export interface AppState {
  user: User
  editMode: EditMode
}

import { SessionDto } from './activity.model';
import { UsersDto } from './users.model';


export interface EnrolledDto {
  id: string,
  user: UsersDto,
  session: SessionDto,
}


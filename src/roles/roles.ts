import { SetMetadata } from '@nestjs/common/decorators';
import { Role } from 'src/utils/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

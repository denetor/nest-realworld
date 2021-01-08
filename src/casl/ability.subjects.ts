import { Project } from '../projects/entities/project.entity.ts';
import { Organization } from '../organizations/entities/organization.entity';
import { Team } from '../teams/entities/team.entity';
import { User } from '../users/entities/user.entity';

export type AbilitySubjects =
    | typeof Project
    | Project
    | typeof Organization
    | Organization
    | typeof Team
    | Team
    | typeof User
    | User
    | 'all';

import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Action } from './ability.action';
import { AbilitySubjects } from './ability.subjects';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

export type AppAbility = Ability<[Action, AbilitySubjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const {can, cannot, rules} = new AbilityBuilder<Ability>(Ability);
        // const { can, cannot, build } = new AbilityBuilder<
        //     Ability<[Action, AbilitySubjects]>
        // >(Ability as AbilityClass<AppAbility>);

        if (user.isAdmin) {
            can(Action.Manage, 'all'); // read-write access to everything
        } else {
            can(Action.Read, 'all'); // read-only access to everything
        }

        // can(Action.Update, Project, { ownerId: user.id });
        // cannot(Action.Delete, Project, { isPublished: true });

        //return build();
        return new Ability(rules);
    }
}

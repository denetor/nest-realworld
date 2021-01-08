import { User } from '../users/entities/user.entity';

export class CaslAbilityFactory {
    createForUser(user: User) {
        return {
            can: (action, entity) => {
                return true;
            }
        };
    }
}

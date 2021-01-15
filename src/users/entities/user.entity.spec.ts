import { User } from './user.entity';

describe('User class', () => {
    it('should be instantiable', () => {
        const entity: User = new User();
        expect(entity).toBeDefined();
    });
});

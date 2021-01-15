export class JwtServiceMock {
    sign = (): string => {
        return 'a signed token';
    }
}

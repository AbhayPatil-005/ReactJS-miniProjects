import authReducer, { login, logout } from '../store/authSlice';

test('auth reducer login and logout', () => {
  const initial = { isLoggedIn: false, bearerToken: '', userId: null };
  const logged = authReducer(initial, login({ token: 'tt', userId: 'uu' }));

  expect(logged.isLoggedIn).toBe(true);
  expect(logged.bearerToken).toBe('tt');

  const out = authReducer(logged, logout());
  expect(out.isLoggedIn).toBe(false);
});
 
describe('authSlice', () => {
  test('login and logout', () => {
    const initial = { isLoggedIn: false, bearerToken: '', userId: null };
    const logged = authReducer(initial, login({ token: 'tt', userId: 'uu' }));

    expect(logged.isLoggedIn).toBe(true);
    expect(logged.bearerToken).toBe('tt');
    
    const out = authReducer(logged, logout());
    expect(out.isLoggedIn).toBe(false);
  });
});
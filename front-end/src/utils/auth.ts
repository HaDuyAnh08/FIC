export const isAuthenticated = () => {
  // Simulate authentication check (replace with real logic, e.g., checking token)
  return localStorage.getItem('isLoggedIn') === 'true'
}

export const login = () => {
  localStorage.setItem('isLoggedIn', 'true')
}

export const logout = () => {
  localStorage.removeItem('isLoggedIn')
}
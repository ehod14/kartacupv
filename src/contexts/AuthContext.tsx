import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  user: { email: string } | null
  login: (email: string, password: string) => boolean
  signup: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.email === email && u.password === password)
    
    if (user) {
      setUser({ email })
      localStorage.setItem('user', JSON.stringify({ email }))
      return true
    }
    return false
  }

  const signup = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some((u: any) => u.email === email)) {
      return false
    }
    
    users.push({ email, password })
    localStorage.setItem('users', JSON.stringify(users))
    setUser({ email })
    localStorage.setItem('user', JSON.stringify({ email }))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

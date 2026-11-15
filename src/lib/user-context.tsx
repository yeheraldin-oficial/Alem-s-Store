'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  name: string
  email: string
  phone?: string
  isAdmin?: boolean
}

interface UserContextValue {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Cargar usuario desde localStorage al inicio
    try {
      const stored = localStorage.getItem('alem-user')
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  const login = (newUser: User) => {
    setUser(newUser)
    try {
      localStorage.setItem('alem-user', JSON.stringify(newUser))
    } catch {
      // ignore
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('alem-user')
    } catch {
      // ignore
    }
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser debe usarse dentro de UserProvider')
  return ctx
}

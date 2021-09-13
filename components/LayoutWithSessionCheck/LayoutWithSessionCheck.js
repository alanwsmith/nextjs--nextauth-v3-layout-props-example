import { useSession, signIn } from 'next-auth/client'
import Link from 'next/link'
import { useEffect } from 'react'

function TheLayout({ children }) {
  return children
}

export default function LayoutWithSessionCheck({ children }) {
  const [session, loading] = useSession()
  const isUser = !!session?.user
  useEffect(() => {
    if (loading) {
      return null
    }
    if (!isUser) signIn()
  }, [isUser, loading])

  if (loading) {
    return null
  }
  return <TheLayout>{children}</TheLayout>

  return (
    <SessionCheck>
      <>
        <div>
          Test Links:{' '}
          <Link href="/">
            <a>Home Page</a>
          </Link>{' '}
          ~{' '}
          <Link href="/unprotected-page">
            <a>Unprotected page</a>
          </Link>{' '}
          ~{' '}
          <Link href="/protected-page">
            <a>Protected Page</a>
          </Link>
        </div>
        {children}
      </>
    </SessionCheck>
  )
}

function SessionCheck({ children }) {
  const [session, loading] = useSession()
  const isUser = !!session?.user
  useEffect(() => {
    if (loading) {
      return null
    }
    if (!isUser) signIn()
  }, [isUser, loading])

  if (loading) {
    return null
  }
  return children
}
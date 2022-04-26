import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function withAuth(Component) {
  return (props) => {
    const { status } = useSession()

    useEffect(() => {
      if (status === 'unauthenticated') signIn()
    }, [status])

    if (status === 'loading') return null // <div>Loading...</div>

    return <Component {...props} />
  }
}

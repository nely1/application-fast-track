import {User, getServerSession} from 'next-auth'

export const session = async ({session, token}: any) => {
    session.user.id = token.id;
    return session
}

export const getUserSession = async (): Promise<User> => {
    const authUserSession = await getServerSession({
        callbacks: {
            session,
        }
    })

    console.log(authUserSession?.user)

    return authUserSession?.user
}
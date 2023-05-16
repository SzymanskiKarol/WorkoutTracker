import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()


    const logout = () => {
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
        // czyści listę po wyogowaniu żeby potem przy logowainu na inne konto nie mrugały stare dane
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
    }

    return { logout }
}
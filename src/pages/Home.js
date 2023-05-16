import { useEffect } from "react"
import { WorkoutDetails } from "../components/WorkoutDetails"
import { WorkoutForm } from "../components/WorkoutForm"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

export const Home = () => {
    // już nie trzeba tego state jeśli wprowadzamy useWorkoutCOntext
    // const [workouts, setWorkouts] = useState(null)
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchWorkouts = async () => {
            // nie ma tu w linku "http://localhost:4000/" bo zostało dodane jako proxy w pliku json
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // setWorkouts(json)
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }
        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => {
                    return <WorkoutDetails key={workout._id} workout={workout} />
                })}
            </div>
            <WorkoutForm />
        </div>
    )
}

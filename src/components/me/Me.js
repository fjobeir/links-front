import { useEffect, useContext, useState } from "react"
import { AppContext } from "../../contexts/AppContext"

const Me = () => {
    const appCtx = useContext(AppContext)
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch('http://localhost:3000/users/me', {
            headers: {
                'Authorization': 'Bearer ' + appCtx.token
            }
        }).then(response => {
            response.json().then(currentUser => {
                setUser(currentUser)
            })
        })
    }, [])
    return <div>
        test
    </div>
}

export default Me
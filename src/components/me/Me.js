import update from 'immutability-helper'
import { useEffect, useContext, useState, useCallback } from "react"
import { AppContext } from "../../contexts/AppContext"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import UserLink from "../UserLink/UserLink"

const Me = () => {
    const appCtx = useContext(AppContext)
    const [user, setUser] = useState({})
    const [links, setLinks] = useState([])

    useEffect(() => {
        console.log(links)
    }, [links])
    useEffect(() => {
        setLinks(user.Links)
    }, [user])
    useEffect(() => {
        fetch('http://localhost:3000/users/me', {
            headers: {
                'Authorization': 'Bearer ' + appCtx.token
            }
        }).then(response => {
            response.json().then(currentUser => {
                setUser(currentUser.data.user)
            })
        })
    }, [])
    const moveLink = useCallback((dragIndex, hoverIndex) => {
        setLinks((prevLinks) =>
            update(prevLinks, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevLinks[dragIndex]],
                ],
            }),
        )
    }, [])
    const renderLink = useCallback((link, index) => {
        return (
            <UserLink
                key={link.id}
                index={index}
                id={link.id}
                text={link.title}
                moveLink={moveLink}
            />
        )
    }, [])
    return <div className="container">
        <div className="row">
            <div className="col-12 col-lg-6 offset-lg-3">
                <h2>Welcome {user.name}</h2>
                <DndProvider backend={HTML5Backend}>
                    {links?.map((link, i) => renderLink(link, i))}
                </DndProvider>
            </div>
        </div>
    </div>
}

export default Me
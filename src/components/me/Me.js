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
        const newOrder = links?.map(link => link.id)
        fetch(`${process.env.REACT_APP_API_URL}links/reorder`, {
            method: 'put',
            headers: {
                'authorization': 'bearer ' + appCtx.token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                newOrder
            })
        })
    }, [links])
    useEffect(() => {
        setLinks(user.Links)
        console.log(user)
    }, [user])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/me`, {
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
                <h2 className='mt-4 mb-5 text-center'>Welcome {user.name}</h2>
                <h4 className='mt-3'>Edit your information</h4>
                <div className='mt-3'>
                    <label>Name</label>
                    <input type='text' className='form-control' value={user.name} />
                </div>
                <div className='mt-3'>
                    <label>Email</label>
                    <input type='email' className='form-control' value={user.email} />
                </div>
                <div className='mt-3'>
                    <label>Username</label>
                    <input type='text' className='form-control' value={user.username} />
                </div>
                <div className='mt-3'>
                    <label>Password</label>
                    <input type='password' className='form-control' value='' />
                </div>
                <div className='mt-3'>
                    <label>Password Confirmation</label>
                    <input type='password' className='form-control' value='' />
                </div>
                <div className='mt-3'>
                    <input type='button' className='btn btn-primary' value='Update' />
                </div>
                <h4 className='mt-3'>Reorder Your Links</h4>
                <DndProvider backend={HTML5Backend}>
                    {links?.map((link, i) => renderLink(link, i))}
                </DndProvider>
            </div>
        </div>
    </div>
}

export default Me
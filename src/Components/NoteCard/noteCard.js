import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useDispatch } from 'react-redux';

const NoteCard = (props) => {

    const dispatch = useDispatch();

const NoteCardImg = styled(motion.div)`
width: 100%;
    height: 7rem;
    background-size:cover;
    background-position:50%;
    background-image:linear-gradient(rgba(0,0,0,.9) 2%,rgba(0,0,0,.2),rgba(0,0,0,.9) 90%),url(${props.image});

`;
    
    const setActiveNote = (note) => {
        console.log(props);
        dispatch({
            type: 'SET_NOTE',
            note
        })
    }

    

    return (
        <div className="note-card" key={props.id} onClick={() => setActiveNote({title:props.title,text:props.text,createdAt:props.createdAt,updatedAt:props.updatedAt,image:props.image,fontSize:props.fontSize,id:props.noteId})}>
            {props.image ? <>
                <div className="note-image-container">
                    
                <NoteCardImg></NoteCardImg>
                <h3 className="title">{props.title.length > 22 ? props.title.substr(0, 22) + '...' : props.title}</h3>
                {props.createdAt === props.updatedAt ? <p>Created on : {moment(props.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p> : <p>Last Updated : {moment(props.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</p>}
            
                </div>
                <div className="note-footer">
                    <p className="note-text">{props.text.substr(0, 90) + ' ...'}</p>
                </div>
            </> :
                <>
            <div className="note-text-card">
                <div>
                            {/* <h3 className="title">{props.title.length > 22 ? props.title.substr(0, 22) + '...' : props.title}</h3> */}
                    <h4>{props.title}</h4>
                {props.createdAt === props.updatedAt ? <p>Created on : {moment(props.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p> : <p>Last Updated : {moment(props.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</p>}
                </div>
                    <p className="note-text">{props.text.substr(0, 90) + ' ...'}</p>
                </div>
                    </>
            }
            
        </div>
    )
}


export default NoteCard;
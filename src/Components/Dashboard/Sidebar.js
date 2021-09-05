import React , {useState} from 'react';
import { useSelector } from 'react-redux';
import NoteCard from '../../Components/NoteCard/noteCard';
import Loader from "react-loader-spinner";
import { motion } from 'framer-motion';


const Sidebar = () => {

    const notes = useSelector(state => state.Auth.notes);
    const loading = useSelector(state => state.Auth.sideLoad);
    const [searched, setSearched] = useState('');

    return (
        <motion.div className="Sidebar" initial={{x:-100,opacity:0}} animate={{opacity:1,x:0,transition:{duration:.8,ease:"easeOut"}}}>
            <div style={{padding:10}}>
                <div className="search">
            <input type="text" placeholder="Search by title" onChange={(e) => setSearched(e.target.value.toLowerCase())} />
            {/* <SearchIcon width="20" fill="white" /> */}
                </div>
            </div>
            {loading ? <div className="loadingPosition"><Loader type="TailSpin" color="white" height={29} width={29} /></div> :<div className="sidebar-inner">
                {
                    notes.filter(filteredNote => filteredNote.title.toLowerCase().includes(searched)).map(note => (
                    <NoteCard key={note._id} image={note.image} text={note.text} title={note.title} createdAt={note.createdAt} fontSize={note.fontSize} updatedAt={note.updatedAt} noteId={note._id} />
                    ))
                }
                {/* {notes.map(note => (
                    <NoteCard key={note._id} image={note.image} text={note.text} title={note.title} createdAt={note.createdAt} fontSize={note.fontSize} updatedAt={note.updatedAt} noteId={note._id} />
                
                ))} */}
            </div>}
        </motion.div>
    )
}
export default Sidebar;

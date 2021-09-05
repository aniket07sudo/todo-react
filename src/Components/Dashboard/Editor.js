import React , {useEffect, useRef, useState} from 'react';
import { ReactComponent as Plus} from '../../Assets/Svg/plus.svg';
import { ReactComponent as Edit} from '../../Assets/Svg/edit-2.svg';
import { ReactComponent as Save } from '../../Assets/Svg/save.svg';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from '../../services/axios';
import Loader from "react-loader-spinner";
import { toast } from 'react-toastify';
import { useDispatch, connect } from 'react-redux';
import { motion } from 'framer-motion';


const Editor = (props) => {
    const [typed, setTyped] = useState('');
    const [title, setTitle] = useState('');
    const [fontSize, setfontSize] = useState('');
    const [image, setImage] = useState();
    const [preview, setPreview] = useState('');
    const textAreaRef = useRef();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const fileSelectHandler = (e) => {
        if (e.target.files[0]) {
        setImage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        
        }
    }

    const saveFile = () => {
        if (!title || !typed) {
            toast.warn("Fill Title and Note Atleast");
        }
        const formData = new FormData();
        if (image) {
            console.log(image);
        formData.append('noteImage', image);
            
        }
        if (props.activeNote?.id) {
        formData.append('noteId', props.activeNote?.id);
            
        }
        formData.append('title', title);
        formData.append('text', typed);

        if (fontSize !== '') {
        formData.append('fontSize', fontSize);
            
        }
        if (title && typed) {
        setLoading(true);
            console.log(title,typed,image,fontSize);
        Axios.post("/addNotes", formData).then(res => {
            setTyped('');
            setImage(null);
            setfontSize('');
            setTitle('');
            userData();
        dispatch({
            type: 'CREATE_NEW',
            note:null
        })
            if (props.activeNote) {
            toast.success("Note Updated Successfully");
               
            } else {
            toast.success("Note Added Successfully");
                
           }
        }).catch(err => {
            console.log(err);
            toast.error("Something went wrong");

        }).finally(_ => {
            setLoading(false);
        })
       }
        
    }

    
const options = [
  { value: '10', label: '10px' },
    { value: '12', label: '12px' },
    { value: '14', label: '14px' },
    { value: '16', label: '16px' },
    { value: '18', label: '18px' },
    { value: '20', label: '20px' },
    { value: '22', label: '22px' },
    { value: '24', label: '24px' },
    { value: '26', label: '26px' },
  
    ];
    
    const setFont = (option) => {
   
        if (typeof option === 'string') {

            if (option === 'undefined') {
        setfontSize('Select a Font Size');   
            } else {
                textAreaRef.current.style.fontSize = option;
        setfontSize(props.activeNote?.fontSize);   
            }
            
        } else {
        textAreaRef.current.style.fontSize = option?.label;
        setfontSize(option?.label);
            
        }
    }

    const userData = () => {
        dispatch({
            type:'SIDE_LOAD_START'
        })
        Axios.get("/getUser").then(res => {
             dispatch({
                type: 'SET_NOTES',
                notes: res.data.currentUser.notes
            });
        }).catch(err => {
            console.log(err);
            toast.error("Something went wrong");

        }).finally(_ => {
            dispatch({
            type:'SIDE_LOAD_END'
        })
        })
    }

    let Editor = null;

    if (props.activeNote?.image) {
        Editor = (
            <label htmlFor="file-btn">
                <div className="center-text"><Edit width="20" />&nbsp;Change Image</div>
                <img src={preview} className="preview-img" alt="Preview Image" />
            </label>
        )
    } else if (image) {
        Editor = (
            <label htmlFor="file-btn">
                <div className="center-text"><Edit width="20" />&nbsp;Change Image</div>
                <img src={URL.createObjectURL(image)} className="preview-img" alt="Preview Image" />
                
            </label>
        )
    } else  {
        Editor = (
            <label htmlFor="file-btn" className="intial-text" >
                
                <Plus /> Add Image
                
            </label>
        )
    }

    const createNewNote = () => {
         setTyped('');
            setImage(null);
            setfontSize('');
            setTitle('');
        dispatch({
            type: 'CREATE_NEW',
            note:null
        })
    }

    useEffect(() => {
        setTyped(props.activeNote?.text);
        setTitle(props.activeNote?.title);
        setFont(props.activeNote?.fontSize);
        setPreview(props.activeNote?.image);
    
    },[props.activeNote])

    return (
        <motion.div className="Editor" initial={{scale:0.7}} animate={{scale:1,transition:{duration:.7,ease:'easeOut'}}} exit={{scale:0.7,transition:{duration:.8}}} >
            <div className="editor-inner">
                <input type="file" accept="image/*" onChange={fileSelectHandler} style={{display:'none'}} id="file-btn"  />
                <div className="add-image">
                  {Editor}
                </div>
                <span className="dropdown-container"><div className="flex-align">Font Size : &nbsp;
                    <Dropdown  onChange={setFont} className="DropdownFont" options={options} value={fontSize || ''} placeholder="Select a Font Size" /></div>
                <div className="enter-title">Title : <input type="Text" onChange={(e) => setTitle(e.target.value)} value={title} className="title-input" /></div>
                </span>
                <textarea onChange={(e) => setTyped(e.target.value)} ref={textAreaRef} value={typed} placeholder="Write Note Here..">
                    
                </textarea>
            </div>
            <div className="bottom-container">
                {props.activeNote && <button className="save bg-green" onClick={createNewNote}>
                    Create New {loading ? <Loader type="TailSpin" color="white" height={19} width={19} /> :<Plus />}
            </button>}
            <button className="save bg-blue" onClick={saveFile}>
                    {props.activeNote ? 'Update' : 'Save'} {loading ? <Loader type="TailSpin" color="white" height={19} width={19} /> :<Save />}
            </button>
                
            </div>
        </motion.div>
    )
}

const mapStateToProps = state => {
    return {
        activeNote:state.Auth.activeNote
    }
}

export default connect(mapStateToProps)(Editor);

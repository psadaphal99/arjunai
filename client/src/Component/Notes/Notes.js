import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Calculator from '../calculator/Calculator'
import { useDispatch, useSelector } from 'react-redux';
import './Notes.css'
import { LoadUserNoLoad } from '../../Actions/User'
import { useAlert } from 'react-alert'
import ReadCSV from '../Read_CSV/ReadCSV';
import { Link } from 'react-router-dom'



const Notes = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [note, setNote] = useState('');
  const [id, setId] = useState("");
  const [calcOpen, setCalcOpen] = useState(false);
  // const [videoCompOpen,setVideoCompOpen] = useState(false);
  const [UploadDataOpen, setUploadDataOpen] = useState(false);
  const { companyname } = useSelector(state => state.SidebarDate);
  const { date, blurActive } = useSelector(state => state.SidebarDate)
  const { notes } = useSelector(state => state.user.user)
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });




  const getNote = (e) => {
    e.preventDefault();
    setNote(e.target.value);

  }

  const Addnote = () => {
    try {
      if (note) {
        const obj = {
          note: note,
          date,
          id,
          cname: companyname,
        }
        axiosInstance.post("/postnotes", obj, {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }).then(res => {
          if (res.data === "Notes Added" || res.data === "Notes Updated") {
            dispatch(LoadUserNoLoad());
            alert.success(res.data)
          }
        })
        setId("");
        setNote("");
        dispatch({
          type: "clearCompanyName",
        })
      } else {

        alert.show("Please fill the Note")
      }
    } catch (error) {
      alert.error(error.response.data.message)
    }
  }

  const deleteNote = (id) => {
    try {
      axiosInstance.delete(`/deletenotes/${id}`, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(res => {
          if (res.data === "Note Deleted") {
            dispatch(LoadUserNoLoad());
          }
          alert.success(res.data);
        })
    } catch (error) {
      alert.error(error.response.data.message)
    }

  }

  const editNote = (id) => {
    window.scrollTo(0, 0);
    setId(id);
    const editnote = notes.find(ele => ele._id === id)
    setNote(editnote.note);
  }

  useEffect(() => {
    if (calcOpen) {
      dispatch({
        type: "BlurActive",
        payload: true
      })
    }

    if (!calcOpen) {
      dispatch({
        type: "BlurActive",
        payload: false
      })
    }
  }, [dispatch, calcOpen])

  useEffect(() => {
    if (UploadDataOpen) {
      dispatch({
        type: "BlurActive",
        payload: true
      })
    }

    if (!UploadDataOpen) {
      dispatch({
        type: "BlurActive",
        payload: false
      })
    }
  }, [dispatch, UploadDataOpen])

  // useEffect(() => {
  //  if(videoCompOpen){
  //   dispatch({
  //     type:"BlurActive",
  //     payload: true
  //    })
  //  }

  //  if(!videoCompOpen){
  //   dispatch({
  //     type:"BlurActive",
  //     payload: false
  //    })
  //  }
  // }, [dispatch,videoCompOpen])



  return (
    <>
      <div className={blurActive ? " blur main-body" : "main-body"}>
        <div className='notes'>
          <div className="main-notes">
            <h3 className="notehead">Add Notes</h3>
            <div className='note_cname'>
              {companyname && <h6 className='cnameh6'>{companyname}</h6>}
              <textarea rows={6} type="text" placeholder='Write Your Note' className='inputnote' value={note} onChange={getNote} autoFocus />
            </div>
            <div className='btnaddnote' onClick={Addnote}>Add note</div>
            <hr />

            <h3 className="notehead">My Notes</h3>
            <div className="allnotes">
              {notes.map((ele, index) => {
                const { note, _id, cname, date } = ele;
                return (
                  <div className="box" key={index} >
                    <div className="titledate">
                      <div className="title">Note {index}</div>
                      <p className='notedate'>{date}</p>
                    </div>
                    <div className={cname === "none" ? "notewithcname" : "content cname-content"}>{cname}</div>
                    <div className="content">{note}</div>
                    <div className="btndiv">
                      <div className="btneditnote" onClick={() => editNote(_id)}>
                        <span className="material-icons edit-icon">edit_note</span>
                      </div>
                      <span className='hover-edit'>Edit</span>
                      <div className="btndeletenote" onClick={() => deleteNote(_id)}>
                        <span className="material-icons delete-icon">delete_outline</span>
                      </div>
                      <span className='hover-delete'>Delete</span>

                    </div>
                  </div>
                )
              })}

            </div>
          </div>
          <div className="notes-sidebar">

            <img src="./images/calculator.png" alt="calculator" className="calc-icon" onClick={() => setCalcOpen(true)} />
            <span className="hover_calc">Calculator</span>

            <img src="./images/statistics.png" alt="Analysis" className="analysis-icon" onClick={() => setUploadDataOpen(true)} />
            <span className="hover_analysis">Data Analysis</span>

            <Link to='/notes/video'><img src="./images/book.png" alt="library" className="calc-icon library" />
            </Link>
            <span className="hover-library">Video Library</span>

            <img src="./images/notification-bell.png" alt="bell" className="calc-icon notification" />
            <span className="hover-notification">Notification</span>


            <img src="./images/present.png" alt="gift" className="calc-icon gift" />
            <span className="hover-giftcard">Giftcard</span>

            <img src="./images/chess.png" alt="chess" className="calc-icon chess-icon" />
            <span className="hover-chess">Chess</span>

            <img src="./images/bot.png" alt="chatbot" className="calc-icon chatbot-icon" />
            <span className="hover-chess">Chatbot</span>
          </div>
        </div>
      </div>
      {calcOpen && < Calculator setCalcOpen={setCalcOpen} />}
      {UploadDataOpen && < ReadCSV setUploadDataOpen={setUploadDataOpen} />}
    </>
  )
}

export default Notes;
import React, {useRef,useState} from 'react'
import "./Share.css"
import { Image } from '@mui/icons-material'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Share({user}) {
  //const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now()+file.name;
      data.append("name",fileName);
      data.append("file",file);
      newPost.img = fileName;
      try {
       await axios.post("/upload",data)
      }catch (err) {
        console.log(err)
      }
    }

    try {
      await axios.post("/posts", newPost);
      //window.location.reload();
    } catch(err) {
      console.log(err);
    }
    navigate('/post');
  };

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
              {/*<img src={user.profilePicture
                ? PUBLIC_FOLDER + user.profilePicture
              : PUBLIC_FOLDER + "/person/noAvatar.png"
              } className="icon"/>*/}
              <input type="text" className="shareInput" placeholder="What is happening?!" ref={desc}/>
            </div>
            <hr className="shareHr" />
            <form className="shareButtons" onSubmit={(e)=> handleSubmit(e)}>
              <div className="shareOptions">
                <label class="shareOption" htmlFor="file">
                    <Image className="shareIcon" htmlColor="blue" />
                    <span className="shareOptionText">Posts Picture</span>
                    <input type="file" id="file" accept=".png, .jpeg, .jpg"  style={{display:"none"}}
                    onChange={(e) =>setFile(e.target.files[0])}
                    />
                </label>
       
              </div>
              <button className="shareButton" type="submit">Send</button>
            </form>
         
        </div>
    </div>
  )
}

import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../../../styles/comments.css";
import { Context } from "../../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import HelpfulButton from "./HelpfulButtonComp.jsx";
import DisplayTextArea from "./CommentTextArea.jsx";



export default function CommentSection() {
  const { store, actions } = useContext(Context);
  const [comments, setComments] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const params = useParams();
  let isToken = actions.showToken();
  let navigate = useNavigate()

  useEffect(() => {
    async function fetch() {
      let response = await actions.genericFetch(
        `product/${params.theid}/get_comments`
      );
      let jsonRes = await response.json();
      setComments(jsonRes);
    }
    fetch();
  }, []);


  console.log(comments);
  return (
    <div class="container">
      <h2>Comments section</h2>
      <div >
        {Array.isArray(comments) ? (
          comments.map((comment, index) => {
            return (
              <div className="comment--user-comment">
                <div style={{ display: "flex" }}>
                  <img
                    src={comment.author_img}
                    className="comment--placeholder"
                  ></img>
                  <p>Posted by {comment.author}</p>
                </div>
                <div >
                  {isExpanded ?comment.comment:comment.comment.slice(0, 100)}
                  {comment.comment.length >100&& <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="comment-read-more-btn">
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>}
                  </div>
                  
                <span><HelpfulButton/></span>
              </div>
            );
          })
        ) : (
          <h3>No comments</h3>
        )}

      </div>
          {/*Continue here with the text to send a comment */}
          {isToken?<DisplayTextArea/>:<button
                          onClick={() => navigate("/login")}
                          type="button"
                          className="btn btn-outline-info"
                        >
                          Login to post Comments
                        </button>}
          
    </div>
  );
}

import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationCotnext from "@/store/notification-context";

function Comments(props) {

const notificationCtx = useContext(NotificationCotnext)

  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const [isFetchingComments, setIsFetchingCooments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingCooments(true);
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingCooments(false)
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }
  function addCommentHandler(commentData) {
   
  notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment has been added to database",
      status: "pending",
    });

  //   fetch(`/api/comments/${eventId}`, {
  //     method: "POST",
  //     body: JSON.stringify(commentData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //   }).then((response) => {
  //      if (response.ok) {
  //         return  response.json()
  //       }

  //     return  response.json().then(data => {
  //       throw new Error(data.message || 'something went wrong')
  //     })
  //   }).then((data) => {
  //    notificationCtx.showNotification({
  //     title: "Success",
  //     message: "Your comment was saved",
  //     status: "success",
  //   });
  //   }).catch(error => {
  //        notificationCtx.showNotification({
  //         title: "Error",
  //         message: error.message || 'something went wrong',
  //         status: "error",
  //       })
  //     });
  // }

    fetch(`/api/comments/${eventId}`, {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: {
      "Content-Type": "application/json",
    },
}).then((response) => {
   if (response.ok) {
      return  response.json();
   }

   // Новый код: проверяем, возвращает ли сервер JSON.
   const contentType = response.headers.get("content-type");
   if (contentType && contentType.includes("application/json")) {
     return response.json().then(data => {
       throw new Error(data.message || 'Something went wrong!');
     });
   } else {
     throw new Error('Server error: ' + response.status);
   }

}).then((data) => {
 notificationCtx.showNotification({
  title: "Success",
  message: "Your comment was saved",
  status: "success",
});
}).catch(error => {
     notificationCtx.showNotification({
      title: "Error",
      message: error.message || 'Something went wrong!',
      status: "error",
    });
  });
}

    
    
    
    
    
  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
        {showComments && isFetchingComments &&  <p>Loading...</p>}
    </section>
  );
}

export default Comments;

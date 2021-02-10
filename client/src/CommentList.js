//import  React  from "react";
import  React, {useEffect, useState}  from "react";
//import axios from 'axios';


//const [comments, setComments]=useState([]);
/*const fetchData = async () => {

    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

    setComments(res.data);

};

useEffect( () => {
 fetchData();
},[]
);
*/
export default ( { comments }) => {
    console.log(comments);
const renderedComments = comments.map( comment =>
    {
        let content;
        if(comment.status ==='approved')
        {
            content = comment.content;
        }
        if(comment.status==='pending')
        {
            content = 'This comment is awaiting moderation';

        }
        if(comment.status==='rejected')
        {
            content = 'This comment has been rejected';

        }
        return <li key={comment.id}>{content}</li>
    } );
return renderedComments;
};
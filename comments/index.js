const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {randomBytes} = require('crypto');
const axios = require('axios');
const { EPERM } = require('constants');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const CommentsByPostId={};

app.get('/posts/:id/comments',(req,res)=>{

    res.send(CommentsByPostId[req.params.id] || []);

});

app.post('/posts/:id/comments', async (req,res)=>{
const commentId = randomBytes(4).toString('hex');
const {content} = req.body;
const commentsByID = CommentsByPostId[req.params.id] || [];

commentsByID.push({id:commentId,content});
CommentsByPostId[req.params.id] = commentsByID;
 
await axios.post('http://localhost:4005/events', {
    type : 'CommentCreated',
    data: {
       id: commentId,
       content,
       postId : req.params.id 
    }
});
res.status(201).send(commentsByID);
});

app.post('/events', (req,res) => {
    console.log('Received event', req.body.type);
    res.send({});
    });

app.listen(4001,()=>{


console.log('Listening on 4001');
});
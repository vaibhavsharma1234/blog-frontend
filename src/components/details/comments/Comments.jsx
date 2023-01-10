







import { Box, TextareaAutosize, Button, styled } from "@mui/material"
import axios from 'axios';
import { getAccessToken } from "../../../utils/common-utils";

import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import Comment from "./Comment"
import { API_URL } from "../../../service/api";
const Container = styled(Box)`
margin-Top:100px;
display:flex;



`
const Image = styled("img")({
    width: 50,
    height: 50,
    borderRadius: "50%"
})
const StyledTextArea = styled(TextareaAutosize)`
height:100px;
width:100%;
margin:0 20px


`;
const initialValues = {
    name: "",
    postId: "",
    comments: "",
    date: new Date()

}
const Comments = ({ post }) => {
    // jesa hi mera yeh detail view khulaga humara pass detail view anan  chaye use effect

    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const [comment, setComment] = useState(initialValues);
    const { account } = useContext(DataContext);
    const [comments, setComments] = useState([]);
    // in order to re render the file
    const [togle,setTogle]=useState(false);
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }
    
    useEffect(() => {
        let id1 = post._id;
        const getData = async () => {
            // api call 
            // id bhjo of a post 
            let res = await axios.get(`${API_URL}/comments/${post._id}`, {
                params: {
                    id1
                }, headers: {
                    authorization: getAccessToken()
                }
            })
            if (res) {
                setComments(res.data);
            }
        }
        getData()
    }, [post,togle])
    const addComment = async (e) => {
        let res = await axios.post(`${API_URL}/comment/new`, comment, {
            headers: {
                authorization: getAccessToken()
            }
        })
        if (res) {
            setComment(initialValues);

        }
        setTogle(prevState => !prevState);

    }



    return (
        <Box>
            <Container>
                {/* comments entry box jo comments enter hoga woh value nikal ni hai and save in state  */}
                <Image src={url} alt="dp" />
                < StyledTextArea
                    minRows={5}
                    placeholder="whats on your mind"
                    defaultValue={comment.comments}
                    value={comment.comments}

                    onChange={(e) => handleChange(e)}

                >

                </ StyledTextArea >
                <Button onClick={(e) => addComment(e)} variant="contained" color="primary" size="medium" style={{ height: "40px" }}>Post</Button>

            </Container>
            <Box>
                {/* comments display box */}
                {
                    comments && comments.length >0 && comments.map(comment=>{
                       return  <Comment comment={comment} setTogle={setTogle} />
                    })
                }
            </Box>
        </Box>

    )
}
export default Comments;
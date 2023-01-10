

import {Box,Typography,styled} from "@mui/material";
import {Link, useNavigate, useParams}  from "react-router-dom";
import {useState,useEffect,useContext} from "react";
import axios from "axios";
import { getAccessToken } from "../../utils/common-utils";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {DataContext} from "../../context/DataProvider"
import { API_URL } from "../../service/api";
// import {Link} from "react-router-dom";
import Comments from "./comments/Comments"

const Container = styled(Box)(({theme})=>({
    margin : "50px 100px",
    [theme.breakpoints.down("md")]:{
        margin:0
    }
}));



const Image = styled("img")({
    width:"100%",
    height:"50vh",
    objectFit:"cover"
});
const Heading = styled(Typography)`
font-size:38px;
font-weight:600;
text-align:center;
margin :50px 0;
word-break:break-word;


`
const Description = styled(Typography)`
word-break:break-word;

`
const Edit = styled(EditIcon)`
margin : 5px;
padding : 5px;
border: 1px solid #878787;
border-radius:10px;
`
const Delete = styled(DeleteIcon)`
margin : 5px;
padding : 5px;
border: 1px solid #878787;
border-radius:10px;
`
const Author = styled(Box)`
color:#878787;
margin:20px 0;
display :flex;



`



const DetailView = ()=>{
    const [post,setPost]=useState([]);
    const navigate = useNavigate();
    const url = post.picture ? post.picture: "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    // i have a id coming on thr url wha se  particular blogki details nikal skta hu
    const {id} = useParams();
    // fetch data fromdb

    const {account} = useContext(DataContext);


    
    useEffect(()=>{
        const fetchData = async()=>{
             let res = await axios.get(`${API_URL}/posts/post`,{
                params: {
                  id
                  },headers: {
                    authorization: getAccessToken()
                }
             })
             if(res){
                setPost(res.data);
             }
        }
        fetchData();
    })
    const deleteBlog = async()=>{
        let res = await axios.delete(`${API_URL}/details/${id}`,{
            params: {
              id
              },headers: {
                authorization: getAccessToken()
            }
         })
        if(res){
           console.log("successfully deletion");
           navigate("/")
        }
    }

    return (
        <Container >
            <Image src ={url} alt="blog " />
            <Heading>{post.title}</Heading>
            <Box style={{float:"right"}}>
            {
                (account.username === (post.username )||(account.username === ( "admin"))) && 
                <>
                <Link to={`/update/${post._id}`}>
                < Edit color="primary" ></ Edit >
                </Link>
            <Delete color="error " onClick={()=>deleteBlog()} ></Delete>
                </>
            }
           
            </Box>
            <Author>
                <Typography>Author:<Box component="span" style={{fontWeight:600}} >{post.username}</Box></Typography>
                <Typography style={{marginLeft:"auto"}}>{new Date (post.createdDate).toDateString()}</Typography>
            </Author>
            <Description>{post.description}</Description>
            <Comments post ={post}/>
        
        </Container >
    )
}
export default DetailView;

import { useState, useEffect, useContext } from "react";
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material"
// import { AddCircleIcon as Add } from '@mui/icons-material/AddCircle';
import axios from "axios"
import { getAccessToken } from "../../utils/common-utils";
import { useLocation, useNavigate } from "react-router-dom"
import { DataContext } from "../../context/DataProvider";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { API_URL } from "../../service/api";
const Container = styled(Box)(({theme})=>({
    margin : "50px 100px",
    [theme.breakpoints.down("md")]:{
        margin:0
    }
}));

const Image = styled("img")({
    width: "100%",
    height: "50vh",
    objectFit: "cover"
});


const TextArea = styled(TextareaAutosize)`
width:100%;
margin-top:50px;
fonst-size:18px;
border:none;
&:focus-visible {
    outline:none;
}

`;
const StyledFormControl = styled(FormControl)`
margin-top:10px;
display:flex;

flex-direction:row;
`;


const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date(),

}
const InputTextField = styled(InputBase)`
margin:0 30px;
flex :1;
fontSize:25px;
`;


const CreatePost = () => {

    const [post, setPost] = useState(initialPost);
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const location = useLocation();
    const { account } = useContext(DataContext);
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";


    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                // hummen data dala hai taki bhj paye
                data.append("name", file.name);
                data.append("file", file);


                // api call toupload image then i will get url  then put urlin post.picture 
                let res = await axios.post(`${API_URL}/file/upload`, data);
                post.picture = res.data;// todo
            }
        }
        getImage();
        post.categories = location.search?.split("=")[1] || "ALL";
        post.username = account.username;
    }, [file])

    // pass the content which changes that is file

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    const savePost = async () => {
        let res = await axios.post(`${API_URL}/create`, post, {
            headers: {
                authorization: getAccessToken()
            }
        })
        if (res) {
            navigate("/");
        }
    }

    return (
        <Container>
            <Image src={url} alt="banner" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    < AddCircleIcon fontSize="large" color="action" />
                </label>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                <InputTextField placeholder="tilte" onChange={(e) => handleChange(e)} name="title" />
                <Button variant="contained" onClick={() => savePost()}>Publish</Button>
            </StyledFormControl>
            <TextArea
                minRows={5}
                placeholder="write your blog ..."
                onChange={(e) => handleChange(e)}
                name="description"


            />
        </Container>
    )
}
export default CreatePost;
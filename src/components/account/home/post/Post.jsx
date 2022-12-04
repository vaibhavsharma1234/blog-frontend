



// api call to get all post and store here
import axios from "axios";
import {Box, Grid} from "@mui/material"
import { getAccessToken } from "../../../../utils/common-utils";
import { useEffect, useState } from "react";
import { useSearchParams,Link } from "react-router-dom";
import Post from "./SinglePost"
const Posts = ()=>{
    const [searchParams] = useSearchParams();
    const category =searchParams.get('category');
    console.log(category)
    // now on change of category make a api call and pass category on useeffect 
    // passs the paramin category 
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            // this will be a get api;
         let res =  await axios.get('http://localhost:8000/posts',{
            params: { category : category || ""},
            headers: {
                authorization: getAccessToken()
            }
           
            
        });
        // let res = await API.getALLposts
         if(res){
            setPosts(res.data);
            // all posts save;
            // i  want to loop through the posts


            // lets do its backend now
         }
        }
        fetchData();
    },[category])
    return (
       <>
        {
            posts && posts.length>0 ? posts.map(post=>(
                <Grid item lg={3} sm={4} xs={12}>
                <Link to={`details/${post._id}`} style={{textDecoration:"none",color:"inherit"}}>
                <Post post={post} />
                </Link>
                
                </Grid>
            )) : <Box style={{color:"#878787",margin:"30px 80px",fontSize:18}}> no data available to display</Box>
        }
       </>
    )
}
export default Posts;

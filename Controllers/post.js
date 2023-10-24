import posts from "../Models/post.js";

//fetch all post
export  const getPosts = async (req,res) =>{
    try{
        //if there is cat
        const cat = req.query.cat;

        if(!(cat == undefined)){
            try{
                //finding the post with category
                const postData = await posts.find({cat : cat});

                console.log("working good ->getPostsWithCat");
                return res.status(200).json({
                    status : true,
                    message : `Post with category ${cat} found.`,
                    data : postData,
                })

            }catch(err){
                console.log("Error ->getPostsWithCat :",err);
        
                return res.status(500).json({
                    status : false,
                    message : "Server Error in fetching Post with category",
                    Error : err.message,
                })
            }
        }
        //finding the all postData without any category
        const postData = await posts.find();

        console.log("working good ->getPosts");
        return res.status(200).json({
            status : true,
            message : "all post fetched",
            data : postData,
        })


        
    }catch(err){
        console.log("Error ->getPosts :",err);

        return res.status(500).json({
            status : false,
            message : "Server Error in fetching Posts",
            Error : err.message,
        })
    }
}

//fetching the single Post
export  const getPost = async (req,res) =>{
    try{
        //get the postid from the params
        const postID = req.params.id;

        const postData = await posts.findById(postID);

        console.log("working good ->getPost");
        return res.status(200).json({
            status : true,
            message : `post fetched of postID = ${postID}`,
            data : postData,
        })
    }catch(err){
        console.log("Error ->getPosts :",err);

        return res.status(500).json({
            status : false,
            message : "Server Error in fetching Posts",
            Error : err.message,
        })
    }
}

//deleting the Post
export  const deletePost = async (req,res) =>{
    try{
        //get the postid from the params
        const postID = req.params.id;

        //first find what post to delete
        const postData = await posts.findById(postID);

        //find the author of the post
        const user = await users.findById(postData.User);

        //updating the user Post data
        user.Posts = user.Posts.filter((ID) => ID.toString() !== postID);

        //now save the updated user Data.
        const updatedUser = await user.save();

        //now delete the post
        const deletedPost = await posts.findByIdAndRemove(postID);

        return res.status(200).json({
            status : true,
            message : `post deleted of postID = ${postID}`,
            Deleted_Post : deletedPost,
            Updated_User : updatedUser,
        })
    }catch(err){
        console.log("Error ->deletePost :",err);

        return res.status(500).json({
            status : false,
            message : "Server Error in deleting Posts",
            Error : err.message,
        })
    }
}

//updating the Post
export  const updatePost = async (req,res) =>{
    try{
        //get the postid from the params
        const postID = req.params.id;

        //find the post and update
        const postData = await posts.findByIdAndUpdate(postID,req.body);

        return res.status(200).json({
            status : true,
            message : `post updated of postID = ${postID}`,
            data : postData,
        })
    }catch(err){
        console.log("Error ->updatePosts :",err);

        return res.status(500).json({
            status : false,
            message : "Server Error in Updating Posts",
            Error : err.message,
        })
    }
}

//Create the post
export const addPost = async (req,res) =>{
    try{
        const {title, desc,cat,img, token} = req.body;
        
    }catch(err){
        console.log("Error ->updatePosts :",err);

        return res.status(500).json({
            status : false,
            message : "Server Error in Updating Posts",
            Error : err.message,
        })
    }
}
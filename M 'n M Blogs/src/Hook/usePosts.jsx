import React, { Children, createContext, useState, useContext, useMemo } from "react";
import { faker } from "@faker-js/faker";

const PostContext = createContext();

function randomPosts(){
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
};

const PostProvider = ({children}) => {
    //childrens are to be wrapped in this function while values are provided by PostContext coz that is the context, see bottom 

    const [posts, setPosts] = useState(() => 
    Array.from({ length: 32 }, () => randomPosts()) //Array created from 32 element used using the given function
  );

  const [archived] = useState(() => 
  Array.from({ length: 100 }, () => randomPosts()) //generating a lot of posts can slow down the PC
);

    const [searchQuery, setSearchQuery] = useState("");

    //these posts are saved in posts while returning and they are the posts which will be displayed
    //and i used an input in other file for searching with value searchquery, when that value will change, the posts will be filtered and then returned again
    const searchedPosts = searchQuery.length > 0 ? posts.filter((post) => `${post.title}`.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

      function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]); //post will be added in the start, if [...posts, post] then new post will be at the end
      }
    
      function handleClearPosts() {
        setPosts([]);
      }
    
      const value = useMemo(() => { //useMemo remembers the value of something until the dependency changed
        return {
          posts : searchedPosts, //searchedPosts is saved in post and returned to value and will be provided to the context
          onAddPost: handleAddPost, //same as above
          onClearPosts: handleClearPosts,
          archived,
          searchQuery,
          setSearchQuery,
        };
      }, [searchedPosts, searchQuery]);
    
      return ( //returned by PostProvider
      //PostContext is providing values returned by PostProvider function to all children
        <PostContext.Provider value={value}>{children}</PostContext.Provider>
      );
    }


    // usePost is returning the whole context hook, we can destructure all the returned values using this hook
    function usePosts() {
      const context = useContext(PostContext);
      if (context === undefined)
        throw new Error("PostContext was used outside of the PostProvider");
      return context;
    }
    
    export { PostProvider, usePosts };
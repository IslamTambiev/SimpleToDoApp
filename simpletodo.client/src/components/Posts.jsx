import React, { useEffect, useState } from "react";

const URL = "api/Posts";
const Posts = () => {
  const [allPosts, setPosts] = useState([]);

  const getPosts = async () => {
    const options = {
      method: "GET",
      headers: new Headers(),
    };
    const result = await fetch(URL, options);
    if (result.ok) {
      const posts = await result.json();
      setPosts(posts);
      return posts;
    }
    return [];
  };

  const addPost = async () => {
    const headerFromUser = document.querySelector("#header").value;
    const textFromUser = document.querySelector("#text").value;

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options = {
      method: "Post",
      headers: headers,
      body: JSON.stringify({
        header: headerFromUser,
        text: textFromUser,
      }),
    };
    const result = await fetch(URL, options);
    if (result.ok) {
      const post = await result.json();
      allPosts.push(post);
      setPosts(allPosts.slice());
    }
  };

  const updatePost = async (oldPost) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(oldPost),
    };
    const result = await fetch(URL, options);
    if (result.ok) {
      const post = await result.json();
      const updatedPost = allPosts.findIndex((x) => x.id === oldPost.id);
      allPosts[updatedPost] = post;
      setPosts(allPosts.slice());
    }
  };

  const deletePost = (id) => {
    const options = {
      method: "DELETE",
      headers: new Headers(),
    };
    fetch(URL + `/${id}`, options);

    setPosts(allPosts.filter((x) => x.id !== id));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div class="posts">
      <div class="child">
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#bbbbbb",
            textAlign: "center",
            margin: "20px 0",
            textTransform: "uppercase",
          }}
        >
          Posts creation
        </p>
        <div>
          <input
            id="header"
            type="text"
            class="inputPostCreation"
            placeholder="Enter title..."
          />
        </div>
        <div
          style={{
            marginBottom: "10px",
            border: "2px solid #cccccc40",
            borderRadius: "5px",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          <textarea
            id="text"
            class="textareaPostCreation"
            placeholder="Enter text..."
          />
        </div>
        <button onClick={() => addPost()}>Add post</button>
      </div>
      <div>
        {allPosts.map((x) => (
          <PostItem
            key={x.id}
            post={x}
            deleteAction={deletePost}
            updateAction={updatePost}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;

const PostItem = ({ post, deleteAction, updateAction }) => {
  return (
    <div class="postitems">
      <h2>{post.header}</h2>
      <p>{post.text}</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{ marginRight: "5px" }}
          onClick={() => deleteAction(post.id)}
        >
          Delete
        </button>
        <BasicModal>
          <div>
            <div>
              <input
                id="header"
                class="inputPostCreation"
                type="text"
                defaultValue={post.header}
                onChange={(e) => (post.header = e.target.value)}
              />
            </div>
            <div style={{ marginTop: "6px" }}>
              <textarea
                id="text"
                class="textareaPostCreation"
                defaultValue={post.text}
                onChange={(e) => (post.text = e.target.value)}
                style={{ marginBottom: "10px", resize: "none" }}
              />
            </div>
            <button type="button" onClick={() => updateAction(post)}>
              Update post
            </button>
          </div>
        </BasicModal>
      </div>
    </div>
  );
};

function BasicModal({ children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Update
      </button>
      <Modal isOpen={open} onClose={handleClose}>
        <>{children}</>
      </Modal>
    </div>
  );
}

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      // onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "black",
          margin: "auto",
          padding: "15px",
          border: "2px solid #333333",
          borderRadius: "8px",
          boxShadow: "2px solid black",
          transform: "translateX(-75%)",
        }}
      >
        {children}
        <button style={{ marginTop: "5px" }} type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

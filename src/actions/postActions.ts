import axios from "axios";
import shortid from "shortid";
import { FireStorage, FiredbRef } from "../app/firebaseConfig";
import { serverUrl } from "../app/info";
import { ADD_POST, SET_POSTS, SET_POSTS_ERROR, SET_POSTS_LOADING, SET_POSTS_UPLOADING } from "./types";
import { TypePost, TypeUser } from "../data/dbType";

export const addNewPost = (post: TypePost, images: FileList, user: TypeUser) => async (dispatch) => {
  const id = shortid.generate(); // 게시글 id

  delete user.password;

  try {
    dispatch({
      type: SET_POSTS_UPLOADING,
    });

    const imageRef = FireStorage.ref(`${post.location}/${post.category}/images`).child(post.title);

    await imageRef
      .put(images[0])
      .then(() => console.info("success upload image!"))
      .catch((err) => console.error(err));

    await imageRef.getDownloadURL().then((url) => {
      post.imageUrls.push(url);
    });

    // * json-server
    // await axios
    //   .post(`${serverUrl}/posts`, {
    //     id,
    //     ...post,
    //     cost: Number(post.cost),
    //     size: Number(post.size),
    //     seller: user,
    //   })
    //   .then((res) => {
    //     dispatch({
    //       type: ADD_POST,
    //       payload: res.data,
    //     });
    //   });

    // * firebase
    await FiredbRef.child("/posts/" + id)
      .set({
        ...post,
        cost: Number(post.cost),
        size: Number(post.size),
        seller: user,
      })
      .then((res) => {
        dispatch({
          type: ADD_POST,
          payload: res,
        });
      })
      .catch((err) => {
        console.error(err);
        throw new Error("게시물 저장에 실패했습니다.");
      });
  } catch (err) {
    console.error(err);
    dispatch({
      type: SET_POSTS_ERROR,
      payload: err,
    });
  }
};

// 게시물 조회
export const getPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_POSTS_LOADING,
    });

    // * json-server
    // const res = await axios.get(`${serverUrl}/posts`);

    // * firebase
    const snapshot = await FiredbRef.child("posts/").get();
    if (!snapshot.exists()) throw new Error("게시물이 존재하지 않습니다.");

    let res = Object.entries(snapshot.val()).map(([key, value]) => {
      return value;
    });

    dispatch({
      type: SET_POSTS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: SET_POSTS_ERROR,
      payload: err,
    });
  }
};
export const setLoading = () => async (dispatch) => {};

import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataItem, deleteItem } from "../atoms/dataAtom";
import Comment from "./Comment";
import AddComment from "./AddComment";

const Body = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "comments"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <Wrapper>
      {comments?.map((comment) => {
        return (
          <Comment key={comment.id} id={comment.id} comment={comment.data()} />
        );
      })}
      <AddComment />
    </Wrapper>
  );
};

const Wrapper = tw.div`
    space-y-4 md:space-y-0 flex flex-col items-center
    justify-center px-[1rem] md:px-[10rem] lg:px-[22rem]
`;
export default Body;

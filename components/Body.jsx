import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataItem, deleteItem } from "../atoms/dataAtom";
import Comment from "./Comment";
import AddComment from "./AddComment";
import Delete from "./Delete";

const Body = () => {
  const [comments, setComments] = useRecoilState(dataItem);
  const deleted = useRecoilValue(deleteItem);
  return (
    <Wrapper>
      {/* {deleted ? <Delete /> : null} */}
      {comments.map((res) => {
        return <Comment key={res.id} {...res} />;
      })}
      <AddComment />
    </Wrapper>
  );
};

const Wrapper = tw.div`
    space-y-4 md:space-y-0 flex flex-col items-center
    justify-center px-[1rem] md:px-[10rem] lg:px-[24rem]
`;
export default Body;

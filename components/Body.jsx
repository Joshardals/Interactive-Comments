import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import { dataItem } from "../atoms/dataAtom";
import Comment from "./Comment";
import AddComment from "./AddComment";

const Body = () => {
  const [comments, setComments] = useRecoilState(dataItem);
  console.log(comments);
  return (
    <Wrapper>
      {comments[1]?.comments.map((res) => {
        return <Comment key={res.id} {...res} />;
      })}
      <AddComment />
    </Wrapper>
  );
};

const Wrapper = tw.div`
    py-[3rem] space-y-4 flex flex-col items-center
    justify-center px-[1rem] md:px-[10rem] lg:px-[24rem]
`;
export default Body;

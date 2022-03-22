import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { data } from "../data";
import Comment from "./Comment";

const Body = () => {
  const [comments, setComments] = useState(data[1]?.comments);
  console.log(comments);
  return (
    <Wrapper>
      {/* {data.map((res) => {
        const { id, content, createdAt } = res;
        return <div key={id}>{id}</div>;
      })} */}
      <Comment />
      <Comment />
    </Wrapper>
  );
};

const Wrapper = tw.div`
    py-[3rem] space-y-4 flex flex-col items-center
    justify-center px-[1rem] md:px-[10rem] lg:px-[24rem]
`;
export default Body;

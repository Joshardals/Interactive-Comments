import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { data } from "../data";
import Comment from "./Comment";

const Body = () => {
  const [comments, setComments] = useState(data);
  console.log(comments);
  return (
    <Wrapper>
      {/* {data.map((res) => {
        return <h1>Hello World!</h1>;
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

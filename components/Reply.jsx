import React, { useState } from "react";
import tw from "tailwind-styled-components";

const Reply = () => {
  const [reply, setReply] = useState("");
  const handleReply = (e) => {
    setReply(e.target.value);
  };
  return (
    <Wrapper>
      <ProfileImg src="/avatars/image-amyrobson.png" />
      <TextArea
        placeholder="Reply message"
        value={reply}
        onChange={handleReply}
      />
      <ReplyButton>Reply</ReplyButton>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    mt-4  bg-white p-[1rem] h-auto rounded-md
    w-auto flex items-start relative space-x-4
`;
const ProfileImg = tw.img`
    object-contain h-8 w-8
`;
const TextArea = tw.textarea`
    text-dark text-sm flex-1 p-4
`;
const ReplyButton = tw.button`
    bg-[#5457b6] w-[5rem] h-[2.3rem] rounded-md
    hover:opacity-50 transition-all ease-in text-white
`;
export default Reply;

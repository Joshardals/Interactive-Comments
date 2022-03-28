import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import { dataItem } from "../atoms/dataAtom";

const AddComment = () => {
  const [reply, setReply] = useState("");
  const [comments, setComments] = useRecoilState(dataItem);
  const handleReply = (e) => {
    setReply(e.target.value);
  };
  const addCmt = (e) => {
    e.preventDefault();
    setComments([
      ...comments,
      {
        id: new Date().getTime().toString(),
        content: reply,
        createdAt: "16 seconds ago",
        score: 0,
        user: {
          image: {
            png: "/avatars/image-juliusomo.png",
            webp: "/avatars/image-juliusomo.webp",
          },
          username: "joshardals",
          you: "you",
        },
        replies: [],
      },
    ]);
    setReply("");
  };
  return (
    <Wrapper>
      <ProfileImg src="/avatars/image-juliusomo.png" />
      <TextArea
        placeholder="Send message"
        value={reply}
        onChange={handleReply}
      />
      <ReplyButton onClick={addCmt} disabled={!reply.trim()}>
        Send
      </ReplyButton>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    mt-4  bg-white p-[1rem] h-auto rounded-md
    w-full flex items-start relative space-x-4
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
    disabled:opacity-50
`;
export default AddComment;

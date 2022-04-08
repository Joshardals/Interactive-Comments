import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataItem, replyItem } from "../atoms/dataAtom";
import tw from "tailwind-styled-components";

const Reply = ({ id, user, replies }) => {
  const { data: session } = useSession();
  const [reply, setReply] = useState("");
  const [comments, setComments] = useRecoilState(dataItem);
  const [replyContent, setReplyContent] = useRecoilState(replyItem);
  const handleReply = (e) => {
    setReply(e.target.value);
  };
  const addReply = (e) => {
    e.preventDefault();
    setReplyContent([
      ...replyContent,
      {
        id: new Date().getTime().toString(),
        content: reply,
        createdAt: "16 seconds ago",
        score: 0,
        replyingTo: user.username,
        user: {
          image: {
            png: "/avatars/image-juliusomo.png",
            webp: "/avatars/image-juiliusomo.webp",
          },
          username: "joshardals",
          you: "you",
        },
      },
    ]);
    setReply("");
  };
  return (
    <Wrapper>
      <ProfileImg src={session.user.image} />
      <TextArea
        placeholder="Reply message"
        value={reply}
        autoFocus
        onChange={handleReply}
      />
      <ReplyButton disabled={!reply.trim()} onClick={addReply}>
        Reply
      </ReplyButton>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    mt-4  bg-white p-5 md:p-[1rem] h-auto rounded-md
    w-auto flex items-start relative space-x-4
`;
const ProfileImg = tw.img`
    object-contain h-8 w-8 rounded-full
`;
const TextArea = tw.textarea`
    text-dark text-sm flex-1 p-4
`;
const ReplyButton = tw.button`
    bg-[#5457b6] w-[5rem] h-[2.3rem] rounded-md
    hover:opacity-50 transition-all ease-in text-white
    disabled:opacity-50
`;
export default Reply;

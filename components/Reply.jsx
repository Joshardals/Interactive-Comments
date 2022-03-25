import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { dataItem } from "../atoms/dataAtom";
import tw from "tailwind-styled-components";

const Reply = () => {
  const [reply, setReply] = useState("");
  const [comments, setComments] = useRecoilState(dataItem);
  console.log(comments.map((res) => res.replies));
  const handleReply = (e) => {
    setReply(e.target.value);
  };
  const addReply = (e) => {
    e.preventDefault();
    comments.map((res) => {
      if (res.id === res.id) {
        setComments([
          ...comments,
          {
            replies: [
              {
                id: new Date().getTime().toString(),
                content: reply,
                createdAt: "16 seconds ago",
                score: 0,
                replyingTo: "",
                user: {
                  image: {
                    png: "/avatars/image-juliusomo.png",
                    webp: "/avatars/image-juliusomo.webp",
                  },
                  username: "juliusomo",
                },
              },
            ],
          },
        ]);
        console.log(res.replies);
      }
    });
    // setComments([
    //   ...comments,
    //   {
    //     replies: [
    //       {
    //         id: new Date().getTime().toString(),
    //         content: reply,
    //         createdAt: "16 seconds ago",
    //         score: 0,
    //         replyingTo:
    //       },
    //     ],
    //   },
    // ]);
  };
  return (
    <Wrapper>
      <ProfileImg src="/avatars/image-amyrobson.png" />
      <TextArea
        placeholder="Reply message"
        value={reply}
        onChange={handleReply}
      />
      <ReplyButton disabled={!reply.trim()} onClick={addReply}>
        Reply
      </ReplyButton>
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
    disabled:opacity-50
`;
export default Reply;

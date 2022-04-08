import React, { useState } from "react";
import { useSession } from "next-auth/react";
import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import { dataItem } from "../atoms/dataAtom";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";

const AddComment = () => {
  const { data: session } = useSession();
  const [reply, setReply] = useState("");
  const [comments, setComments] = useRecoilState(dataItem);
  const [loading, setLoading] = useState(false);
  const handleReply = (e) => {
    setReply(e.target.value);
  };
  const addCmt = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(collection(db, "comments"), {
      id: session?.user?.uuid,
      content: reply,
      timestamp: serverTimestamp(),
      score: 0,
      user: {
        username: session?.user?.name,
        userImg: session?.user?.image,
        tag: session?.user?.tag,
        you: "you",
      },
      replies: [],
    });
    setReply("");
    setLoading(false);
  };
  return (
    <Wrapper>
      <ProfileImg src={session?.user?.image} />
      <TextArea
        placeholder="Add a comment"
        value={reply}
        onChange={handleReply}
      />
      <ReplyButton
        className={`${loading ? "opacity-50" : null}`}
        onClick={addCmt}
        disabled={!reply.trim()}
      >
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
export default AddComment;

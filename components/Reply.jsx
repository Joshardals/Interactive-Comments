import React, { useState } from "react";
import { useSession } from "next-auth/react";
import tw from "tailwind-styled-components";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";

const Reply = ({ id }) => {
  const { data: session } = useSession();
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReply = (e) => {
    setReply(e.target.value);
  };
  const addReply = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(collection(db, "comments", id, "replies"), {
      id: session?.user?.uid,
      content: reply,
      timestamp: serverTimestamp(),
      score: 0,
      username: session?.user?.name,
      userImg: session?.user?.image,
      tag: session?.user?.tag,
      you: "you",
    });
    setReply("");
    setLoading(false);
  };
  return (
    <Wrapper>
      <ProfileImg src={session?.user?.image} />
      <TextArea
        placeholder="Reply message"
        value={reply}
        autoFocus
        onChange={handleReply}
      />
      <ReplyButton disabled={!reply.trim() || loading} onClick={addReply}>
        {loading ? "Replying" : "Reply"}
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

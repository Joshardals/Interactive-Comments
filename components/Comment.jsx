import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import { replyItem } from "../atoms/dataAtom";
import Reply from "./Reply";
import ReplyText from "./ReplyText";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";

const Comment = ({ id, comment }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [vote, setVote] = useState(comment?.score);
  const [reply, setReply] = useState(false);
  const replyContent = useRecoilValue(replyItem);
  console.log(comment);
  const upVote = () => {
    if (vote >= 0) {
      setVote(vote + 1);
    }
  };
  const downVote = () => {
    if (vote > 0) {
      setVote(vote - 1);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Votes>
          <Add onClick={upVote}>+</Add>
          <Value>{vote}</Value>
          <Subtract onClick={downVote}>-</Subtract>
        </Votes>
        <Header>
          <Top>
            <Profile>
              <ProfileImg src={`${comment?.user?.userImg}`} />
              <Username>{comment?.user?.username}</Username>
              {session?.user?.name === comment?.user?.username ? (
                <You>{comment?.user?.you}</You>
              ) : null}
              <Time>{comment?.timestamp?.seconds}</Time>
            </Profile>
            <div className="flex space-x-4">
              <ReplyButton
                className={`${reply && "opacity-50"}`}
                onClick={() => setReply(!reply)}
              >
                <ReplyIcon src="/icon-reply.svg" />
                <ReplyMsg>Reply</ReplyMsg>
              </ReplyButton>

              {session?.user?.uid === comment?.id ? (
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDoc(doc(db, "comments", id));
                    router.push("/");
                  }}
                >
                  <DeleteIcon src="/icon-delete.svg" />
                  <DeleteMsg>Delete</DeleteMsg>
                </DeleteButton>
              ) : null}
            </div>
          </Top>
          <Body>{comment?.content}</Body>
        </Header>
        <MobileContent>
          <MobileVote>
            <Add onClick={upVote}>+</Add>
            <Value>{vote}</Value>
            <Subtract onClick={downVote}>-</Subtract>
          </MobileVote>
          <div className="flex space-x-4">
            <MobileReplyButton
              className={`${reply && "opacity-50"}`}
              onClick={() => setReply(!reply)}
            >
              <ReplyIcon src="/icon-reply.svg" />
              <ReplyMsg>Reply</ReplyMsg>
            </MobileReplyButton>
            {session?.user?.uid === comment?.id ? (
              <MobileDeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDoc(doc(db, "comments", id));
                  router.push("/");
                }}
              >
                <DeleteIcon src="/icon-delete.svg" />
                <DeleteMsg>Delete</DeleteMsg>
              </MobileDeleteButton>
            ) : null}
          </div>
        </MobileContent>
      </Wrapper>
      {/* {replyContent.map((res) => {
        if (res.replyingTo === user.username) {
          return <ReplyText key={res.id} id={res.id} {...res} />;
        }
      })} */}
      {reply ? <Reply id={id} /> : null}
    </Container>
  );
};

const Container = tw.div`
    border-b-2 border-b-gray-300 md:p-4 
    w-full
`;
const MobileContent = tw.div`
    md:hidden flex justify-between mt-4 items-center 
`;
const MobileVote = tw.div`
    bg-[#eaecf1] flex justify-center px-2 py-1 h-auto rounded-lg
    w-[6rem] space-x-5
`;
const Wrapper = tw.div`
    bg-white p-5 md:p-[1rem] h-auto rounded-md
    w-auto md:flex md:space-x-4 items-start
`;
const Votes = tw.div`
    bg-[#eaecf1] flex-col justify-center px-2 py-1 h-auto rounded-lg
    hidden md:inline-flex
`;
const Add = tw.button` 
    inputButton
`;
const Value = tw.div`
    font-bold text-[#5457b6] text-center
`;
const Subtract = tw.button`
    inputButton
`;
const Header = tw.div`
   flex flex-col space-y-2 w-full
`;
const Top = tw.div`
    flex w-full justify-between
`;
const Body = tw.div`
    text-sm opacity-60
`;
const Profile = tw.div`
    flex items-center space-x-4
`;
const ProfileImg = tw.img`
    object-contain h-8 w-8 rounded-full
`;
const Username = tw.div`
    font-bold text-sm
`;
const Time = tw.div`
    text-sm opacity-50 font-bold
`;
const You = tw.div`
    bg-[#5457b6] text-white font-bold 
    text-sm w-[2rem] text-center rounded-sm
`;
const ReplyButton = tw.button`
    flex items-center space-x-2 text-sm hover:opacity-50 
    transition-all ease-in hidden md:inline-flex
`;
const ReplyIcon = tw.img``;
const ReplyMsg = tw.div`
    font-bold text-[#5457b6] inline-flex md:hidden lg:inline-flex
`;
const DeleteButton = tw.button`
  flex items-center space-x-2 text-sm hover:opacity-50 
  transition-all ease-in hidden md:inline-flex
`;
const DeleteIcon = tw.img``;
const DeleteMsg = tw.div`
  font-bold text-[#ed6468] inline-flex md:hidden lg:inline-flex
`;

const MobileReplyButton = tw.button`
    flex items-center space-x-2 text-sm hover:opacity-50 
    transition-all ease-in md:hidden
`;
const MobileDeleteButton = tw.button`
    flex items-center space-x-2 text-sm hover:opacity-50 
    transition-all ease-in md:hidden
`;
export default Comment;

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import tw from "tailwind-styled-components";
import Reply from "./Reply";
import { useRecoilState, useRecoilValue } from "recoil";
import { replyItem, deleteItem, confirmDelete } from "../atoms/dataAtom";
import Delete from "./Delete";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
  getDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { db } from "../firebase";

const ReplyText = ({ id, replyId, replys, replyingTo }) => {
  const { data: session } = useSession();
  const [vote, setVote] = useState(0);
  const [reply, setReply] = useState(false);
  const [replyContent, setReplyContent] = useRecoilState(replyItem);
  const [deleted, setDeleted] = useRecoilState(deleteItem);
  console.log("ReplyId", "==>", replyId);
  console.log("CommentId", "==>", id);
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
  const handleDelete = (e) => {
    e.preventDefault(); e.stopPropagation();
    deleteDoc(doc(db, "comments", id, "replies", replyId));
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
              <ProfileImg src={`${replys?.userImg}`} />
              <Username>{replys?.username}</Username>
              {session?.user?.name === replys?.username ? (
                <You>{replys?.you}</You>
              ) : null}
              <Time>{replys?.timestamp?.seconds}</Time>
            </Profile>
            <div className="flex space-x-4">
              <DeleteButton
                onClick={handleDelete}
              >
                <DeleteIcon src="/icon-delete.svg" />
                <DeleteMsg>Delete</DeleteMsg>
              </DeleteButton>
              <EditButton>
                <EditIcon src="icon-edit.svg" />
                <EditMsg>Edit</EditMsg>
              </EditButton>
            </div>
          </Top>
          <Body>
            <span className="font-bold text-[#5457b6] opacity-100">
              @{replyingTo}{" "}
            </span>
            <span className="opacity-60">{replys?.content}</span>
          </Body>
        </Header>
        <MobileContent>
          <MobileVote>
            <Add onClick={upVote}>+</Add>
            <Value>{vote}</Value>
            <Subtract onClick={downVote}>-</Subtract>
          </MobileVote>
          <div className="flex space-x-4">
            <MobileDeleteButton onClick={handleDelete}>
              <DeleteIcon src="/icon-delete.svg"></DeleteIcon>
              <DeleteMsg>Delete</DeleteMsg>
            </MobileDeleteButton>
            <MobileEditButton>
              <EditIcon src="icon-edit.svg" />
              <EditMsg>Edit</EditMsg>
            </MobileEditButton>
          </div>
        </MobileContent>
      </Wrapper>
      <Line></Line>
      {deleted ? <Delete id={id} /> : null}
    </Container>
  );
};

const Container = tw.div`
    relative border w-full
`;
const Line = tw.div`
    absolute top-0 left-0 md:left-8 bg-gray-300 w-[2px] h-full
`;
const Wrapper = tw.div`
    bg-white p-[0.8rem] md:p-[1rem] h-auto rounded-md
    w-auto md:flex space-x-4 items-start relative mt-4
    md:ml-14 ml-5
`;
const MobileContent = tw.div`
    md:hidden flex justify-between mt-4 items-center 
`;
const MobileVote = tw.div`
    bg-[#eaecf1] flex justify-center px-2 py-1 h-auto rounded-lg
    w-[6rem] space-x-5
`;
const MobileReplyButton = tw.button`
    flex items-center space-x-2 text-sm hover:opacity-50 
    transition-all ease-in md:hidden
`;
const MobileDeleteButton = tw.button`
  flex items-center space-x-2 text-sm hover:opacity-50 
  transition-all ease-in md:hidden
`;
const MobileEditButton = tw.button`
  flex items-center space-x-2 text-sm hover:opacity-50 
  transition-all ease-in md:hidden
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
    text-sm
`;
const Profile = tw.div`
    flex items-center space-x-3 
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
    font-bold text-[#5457b6]
`;
const DeleteButton = tw.button`
  flex items-center space-x-2 text-sm hover:opacity-50 
  transition-all ease-in hidden md:inline-flex
`;
const DeleteIcon = tw.img``;
const DeleteMsg = tw.div`
  font-bold text-[#ed6468]
`;
const EditButton = tw.button`
  flex items-center space-x-2 text-sm hover:opacity-50 
  transition-all ease-in hidden md:inline-flex
`;
const EditIcon = tw.img``;
const EditMsg = tw.div`
  font-bold text-[#5457b6]
`;
export default ReplyText;

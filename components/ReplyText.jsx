import React, { useState } from "react";
import tw from "tailwind-styled-components";

const ReplyText = ({ content, createdAt, score, replyingTo, user }) => {
  const [vote, setVote] = useState(score);
  const [reply, setReply] = useState(false);
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
              <ProfileImg src={`${user?.image.png}`} />
              <Username>{user?.username}</Username>
              <Time>{createdAt}</Time>
            </Profile>
            <ReplyButton
              className={`${reply && "opacity-50"}`}
              onClick={() => setReply(!reply)}
            >
              <ReplyIcon src="/icon-reply.svg" />
              <ReplyMsg>Reply</ReplyMsg>
            </ReplyButton>
          </Top>
          <Body>
            <span className="font-bold text-[#5457b6] opacity-100">@{replyingTo} </span>
            <span className="opacity-60">{content}</span>
          </Body>
        </Header>
      </Wrapper>
      <Line></Line>
    </Container>
  );
};

const Container = tw.div`
    relative border
`;
const Line = tw.div`
    absolute top-0 left-8 bg-black w-[2px] h-full
    opacity-10
`;
const Wrapper = tw.div`
    bg-white p-[1rem] h-[14rem] md:h-auto rounded-md
    w-auto flex space-x-4 items-start relative mt-4
    ml-14
`;
const Votes = tw.div`
    bg-[#eaecf1] flex md:flex-col
    justify-center px-2 py-1 h-auto rounded-lg
    md:inline-flex absolute md:relative bottom-4
    md:bottom-0 md:w-auto w-[6rem] space-x-5 md:space-x-0
`;
const Add = tw.button`
    text-[#5457b6] opacity-50 hover:opacity-100 transition-all ease-in font-bold
`;
const Value = tw.div`
    font-bold text-[#5457b6] text-center 
`;
const Subtract = tw.button`
    text-[#5457b6] opacity-50 hover:opacity-100 transition-all ease-in font-bold
`;
const Header = tw.div`
   flex flex-col space-y-2
`;
const Top = tw.div`
    flex w-full justify-between
`;
const Body = tw.div`
    text-sm
`;
const Profile = tw.div`
    flex items-center space-x-4 
`;
const ProfileImg = tw.img`
    object-contain h-8 w-8
`;
const Username = tw.div`
    font-bold text-sm
`;
const Time = tw.div`
    text-sm opacity-50 font-bold
`;
const ReplyButton = tw.button`
    flex items-center space-x-2 text-sm
    md:inline-flex absolute md:relative 
    right-4 bottom-4 md:bottom-0 hover:opacity-50 
    transition-all ease-in
`;
const ReplyIcon = tw.img``;
const ReplyMsg = tw.div`
    font-bold text-[#5457b6]
`;

export default ReplyText;

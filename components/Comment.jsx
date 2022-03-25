import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Reply from "./Reply";
import ReplyText from "./ReplyText";

const Comment = ({ id, content, createdAt, score, user, replies }) => {
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
              <You>{user?.you}</You>
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
          <Body>{content}</Body>
        </Header>
        <MobileContent>
          <MobileVote>
            <Add onClick={upVote}>+</Add>
            <Value>{vote}</Value>
            <Subtract onClick={downVote}>-</Subtract>
          </MobileVote>
          <MobileReplyButton
            className={`${reply && "opacity-50"}`}
            onClick={() => setReply(!reply)}
          >
            <ReplyIcon src="/icon-reply.svg" />
            <ReplyMsg>Reply</ReplyMsg>
          </MobileReplyButton>
        </MobileContent>
      </Wrapper>
      {replies.map((res) => {
        return <ReplyText key={res.id} {...res} />;
      })}
      {reply ? <Reply /> : null}
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
    bg-white p-[0.8rem] md:p-[1rem] h-auto rounded-md
    w-full md:flex space-x-4 items-start
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
    object-contain h-8 w-8
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
const MobileReplyButton = tw.button`
    flex items-center space-x-2 text-sm hover:opacity-50 
    transition-all ease-in md:hidden
`;
export default Comment;

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import moment from "moment";
import tw from "tailwind-styled-components";
import Reply from "./Reply";
import ReplyText from "./ReplyText";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  setDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { db } from "../firebase";

const Comment = ({ id, comment }) => {
  const { data: session } = useSession();
  const [reply, setReply] = useState(false);
  const [votes, setVotes] = useState([]);
  const [replyContent, setReplyContent] = useState([]);

  const upVote = async () => {
    await setDoc(doc(db, "comments", id, "score", session?.user?.uid), {
      username: session?.user?.name,
    });
  };
  const downVote = async () => {
    await deleteDoc(doc(db, "comments", id, "score", session?.user?.uid));
  };

  useEffect(() => {
    onSnapshot(collection(db, "comments", id, "score"), (snapshot) => {
      setVotes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "comments", id, "replies"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setReplyContent(snapshot.docs);
      }
    );
  }, [db, id]);
  return (
    <Container>
      <Wrapper>
        <Votes>
          <Add onClick={upVote}>+</Add>
          <Value>{votes.length}</Value>
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
              <Time>
                {/* <Moment fromNow>{comment?.timestamp?.toDate()}</Moment> */}
                {
                  moment(comment?.timestamp?.toDate()).fromNow()
                }
              </Time>
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
            <Value>{votes.length}</Value>
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
      {replyContent.map((res) => {
        return (
          <ReplyText
            key={res.id}
            id={id}
            replyId={res.id}
            replys={res.data()}
            replyingTo={comment?.user?.username}
          />
        );
      })}
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

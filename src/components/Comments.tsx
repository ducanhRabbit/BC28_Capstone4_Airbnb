import React, { useState, createElement } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip } from 'antd';
import { Button, Form, Input, List } from 'antd';
import { Rate } from 'antd';
import moment from 'moment';

type Props = {};

export default function Comments({}: Props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  const { TextArea } = Input;

  interface CommentItem {
    author: string;
    avatar: string;
    content: React.ReactNode;
    datetime: string;
  }

  interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
  }

  const CommentList = ({ comments }: { comments: CommentItem[] }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );

  const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment('2016-11-22').fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="detail_comment row">
      <div className="detail_comment-rate">
        <Rate className="detail_rate-star" allowHalf defaultValue={4.8} />
        <span className="ms-2 rate_title">4,80</span>
        <li className="ms-3 rate_title">222 đánh giá</li>
      </div>
      <div className="col-6">
        <div className="detail_comment-process">
          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Mức độ sạch sẽ</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '95%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Giao tiếp</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '100%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Nhận phòng</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '80%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-6">
        <div className="detail_comment-process">
          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Mức độ sạch sẽ</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '95%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Giao tiếp</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '100%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Nhận phòng</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '80%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-6">
        <Comment
          className="detail_comment-item"
          actions={actions}
          author={<a className="detail_comment-item-name">Han Solo</a>}
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          content={
            <p className="detail_comment-item-text">
              We supply a series of design principles, practical patterns and high quality design resources (Sketch and
              Axure), to help people create their product prototypes beautifully and efficiently.
            </p>
          }
          datetime={
            <Tooltip title="2022-10-01 11:22:33">
              <span>8 hours ago</span>
            </Tooltip>
          }
        />
      </div>

      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={<Editor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />}
      />
    </div>
  );
}

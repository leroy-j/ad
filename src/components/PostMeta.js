import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const PostMeta = (props) => {
  const { user, time } = props
  const avatar = user.avatarURL === '' ? 'https://placeholdit.imgix.net/~text?txtsize=20&txt=User&w=128&h=130"' : user.avatarURL
  return (
    <div className="meta">
      <div className="user-details">
        <img src={avatar} alt={user.name} className="user-icon" />
        <span className="by">Question by {user.name}</span>
        <span className="time">Posted {moment(time).fromNow()}</span>
      </div>
    </div>
  )
}

function mapStoreToComponent ({ users }, { userId }) {
  return {
    user: users[userId]
  }
}

export default connect(mapStoreToComponent)(PostMeta)
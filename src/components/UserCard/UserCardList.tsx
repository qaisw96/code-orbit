import React from 'react';
import UserCard from './UserCard';
import { IUserCardProps } from './UserCard.types';

interface UserCardListProps {
  users: IUserCardProps[];
}

const UserCardList: React.FC<UserCardListProps> = ({ users }) => (
  <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
    {users.map((user) => (
      <UserCard key={user.id} {...user} />
    ))}
  </div>
);

export default UserCardList;

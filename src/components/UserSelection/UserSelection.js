import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import userService from '../../services/userService';
import { useUser } from './UserContext';

const UserSelection = () => {
    const [user1, setUser1] = useState(null);
    const [user2, setUser2] = useState(null);
    const { setUser } = useUser();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const [user1Response, user2Response] = await Promise.all([
                    userService.fetchUser1(),
                    userService.fetchUser2()
                ]);
                setUser1(user1Response.data.data);
                setUser2(user2Response.data.data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };
        fetchUsers();
    }, []);

    const handleUserSelect = (user) => {
        setUser(user);
    };

    return (
        <div className="flex flex-wrap justify-center items-center bg-gray-100 w-full">
            {user1 && <UserCard user={user1} onSelect={handleUserSelect} />}
            {user2 && <UserCard user={user2} onSelect={handleUserSelect} />}
        </div>
    );
};

export default UserSelection;

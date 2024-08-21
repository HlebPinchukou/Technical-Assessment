import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, onSelect }) => {
    const navigate = useNavigate();

    const handleSelect = () => {
        onSelect(user);
        navigate('/dashboard');
    };

    return (
        <div
            className="bg-white shadow-lg rounded-lg p-6 w-80 m-4 flex flex-col items-center cursor-pointer"
            onClick={handleSelect}
        >
            <img src={user.profile_picture_url} alt="Profile" className="rounded-full w-24 h-24 mb-4" />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center mt-4">
                <img src={user.current_organisation.logo_url} alt="Organization" className="w-12 h-12 mr-2" />
                <p className="text-gray-800">{user.current_organisation.name}</p>
            </div>
            <p className="text-gray-500 text-sm mt-2">{user.current_organisation.is_personal ? 'Personal User' : 'Managed User'}</p>
        </div>
    );
};

export default UserCard;


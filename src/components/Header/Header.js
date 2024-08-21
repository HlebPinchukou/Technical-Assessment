import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from './icons/Arrow.svg';
import Download from './icons/Download.svg';
import {useUser} from "../UserSelection/UserContext";

const Header = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef(null);
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsPopupOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="w-full h-[64px] flex items-center justify-end border-b border-[#D0D2D6] relative">
            <button
                onClick={togglePopup}
                className={`w-[151px] h-[40px] relative bg-transparent text-inherit text-[14px] font-normal flex items-center justify-center flex-wrap mr-[32px] rounded-[5px] border ${
                    isPopupOpen
                        ? 'border-[#007BFF] bg-[#f0f0f0]'
                        : 'border-white hover:bg-[#f0f0f0] hover:border-[#007BFF] active:bg-[#e0e0e0] active:border-[#0056b3]'
                }`}
            >
                <div className="flex items-center">
                    {user?.profile_picture_url ? (
                        <img
                            src={user.profile_picture_url}
                            alt="User Avatar"
                            className="w-[24px] h-[24px] rounded-full m-[8px]"
                        />
                    ) : (
                        <div className="w-[24px] h-[24px] bg-[#67e121] rounded-full m-[8px]"></div>
                    )}
                    <p className="text-left">
                        {user ? user.name : 'User'}
                    </p>
                    <div className="m-[8px]">
                        <img src={Arrow} alt="Arrow" className="w-4 h-4" />
                    </div>
                </div>
            </button>

            {isPopupOpen && (
                <div
                    ref={popupRef}
                    className="absolute top-[60px] right-[32px] w-[272px] h-[168px] bg-white shadow-md p-4 rounded-[5px]"
                >
                    <div className="w-[248px] h-[72px] p-[12px] flex items-center">
                        {user?.profile_picture_url ? (
                            <img
                                src={user.profile_picture_url}
                                alt="User Avatar"
                                className="w-[48px] h-[48px] rounded-full"
                            />
                        ) : (
                            <div className="w-[48px] h-[48px] bg-[#67e121] rounded-full p-[8px]"></div>
                        )}
                        <div className="w-[160px] h-[48px] ml-[16px]">
                            <p className="font-proxima text-heading-five font-heading-five leading-heading-five text-left">
                                {user ? user.name : 'User'}
                            </p>
                            <p>
                                {user && user.current_organisation ? user.current_organisation.name : 'No Organization'}
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-[#E8E9EB] mt-[12px] mb-[12px]"></div>
                    <div className="w-[248px] h-[40px] flex flex-row justify-start items-center cursor-pointer" onClick={handleLogout}>
                        <img src={Download} alt="Log out" className="m-[12px]" />
                        <p className="text-meta font-meta leading-meta text-left">
                            Log out
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

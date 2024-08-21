import HomeIcon from './icons/HomeIcon.svg';
import DocumentIcon from './icons/DocumentIcon.svg';
import SettingsIcon from './icons/SettingsIcon.svg';
import LampIcon from './icons/LampIcon.svg';
import ShieldIcon from './icons/ShieldIcon.svg';
import { useUser } from '../UserSelection/UserContext';

const Sidebar = () => {
    const { user } = useUser();

    return (
        <aside className="w-[60px] h-screen bg-[#151F32] text-white flex flex-col items-center">
            <div className="flex flex-col items-center h-full">
                <div className="w-[60px] h-[60px] flex items-center justify-center mt-2">
                    {user?.profile_picture_url ? (
                        <img
                            src={user.profile_picture_url}
                            alt="User Avatar"
                            className="w-[40px] h-[40px] rounded-full"
                        />
                    ) : (
                        <div className="w-[40px] h-[40px] bg-white rounded-full m-[10px]"></div>
                    )}
                </div>
                <div className="mt-[28px] flex flex-col items-center w-full h-full">
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <img src={HomeIcon} alt="Home" className="w-6 h-6" />
                    </div>
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <img src={DocumentIcon} alt="Documents" className="w-6 h-6" />
                    </div>
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <img src={LampIcon} alt="Lamp" className="w-6 h-6" />
                    </div>
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <img src={ShieldIcon} alt="Shield" className="w-6 h-6" />
                    </div>
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <img src={SettingsIcon} alt="Settings" className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

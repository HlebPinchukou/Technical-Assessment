import ProgressCard from './ProgressCard';
import DocumentsList from './DocumentsList';
import { useUser } from '../UserSelection/UserContext';

const Dashboard = () => {
    const { user } = useUser();

    const isPersonalUser = user?.current_organisation?.is_personal;

    return (
        <div className="container mx-auto mt-[48px] w-[1092px]">
            <header className="mb-8">
                <p className="text-2xl font-size-[50px] font-semibold">
                    Hi, {user ? user.name : 'User'} 👋
                </p>
                <p className="text-gray-600 mt-[8px]">
                    {isPersonalUser
                        ? 'Manage your documents.'
                        : 'Manage your documents issued by SMU Academy or track your career goal.'}
                </p>
            </header>

            <div className="flex flex-row align-center mt-[56px]">
                {!isPersonalUser && <ProgressCard />}
                <DocumentsList />
            </div>
        </div>
    );
};

export default Dashboard;



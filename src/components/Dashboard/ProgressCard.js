import { useState, useEffect } from 'react';
import goalService from '../../services/GoalService';

const ProgressCard = () => {
    const [goal, setGoal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoalData = async () => {
            try {
                const response = await goalService.fetchGoals();
                setGoal(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching goal data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGoalData();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="mr-[32px]">
            <h2 className="text-lg font-semibold mb-4">Career Goal</h2>
            <div className="p-6 bg-white shadow rounded-lg w-[292px] h-[433px] flex flex-col items-center">
                <div className="text-center mb-8">
                    <p className="text-gray-500 text-base font-medium">Your Progress</p>
                </div>
                <div className="relative w-32 h-32 mb-8">
                    <svg className="w-full h-full transform rotate-[-90deg]">
                        <circle
                            className="text-gray-200"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="58"
                            cx="50%"
                            cy="50%"
                        />
                        <circle
                            className="text-[#6366F1]"
                            strokeWidth="8"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="58"
                            cx="50%"
                            cy="50%"
                            strokeDasharray="365"
                            strokeDashoffset={365 - (goal.progress / 100) * 365}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#6366F1]">{goal.progress}%</span>
                    </div>
                </div>
                <p className="text-center text-gray-700 text-sm">
                    I want to become a
                </p>
                <span className="font-semibold text-black text-lg mb-6">{goal.name}</span>
                <a href="#" className="text-[#6366F1] text-base font-medium">View Insights</a>
            </div>
        </div>
    );
};

export default ProgressCard;

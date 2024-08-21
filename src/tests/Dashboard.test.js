import { render, screen } from '@testing-library/react';
import { UserProvider } from '../components/UserSelection/UserContext';
import Dashboard from '../components/Dashboard/Dashboard';

const mockUser = {
    name: 'John Smith',
    current_organisation: {
        is_personal: false
    }
};

const renderDashboardWithUser = (user) => {
    return render(
        <UserProvider value={{ user }}>
            <Dashboard />
        </UserProvider>
    );
};

test('renders the user name and appropriate text for non-personal user', () => {
    renderDashboardWithUser(mockUser);

    expect(screen.getByText(/Hi, John Smith 👋/)).toBeInTheDocument();
    expect(screen.getByText(/Manage your documents issued by SMU Academy or track your career goal./)).toBeInTheDocument();
});

test('does not render ProgressCard for personal users', () => {
    const personalUser = { ...mockUser, current_organisation: { is_personal: true } };
    renderDashboardWithUser(personalUser);

    expect(screen.getByText(/Hi, John Smith 👋/)).toBeInTheDocument();
    expect(screen.getByText(/Manage your documents./)).toBeInTheDocument();
    expect(screen.queryByText(/Career Goal/)).not.toBeInTheDocument();
});

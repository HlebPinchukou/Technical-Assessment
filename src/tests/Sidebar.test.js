import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserProvider } from '../components/UserSelection/UserContext';
import Sidebar from "../components/Sidebar/Sidebar";

jest.mock('./icons/LampIcon.svg', () => 'LampIcon');
jest.mock('./icons/ShieldIcon.svg', () => 'ShieldIcon');

const renderSidebarWithUser = (user) => {
    return render(
        <UserProvider value={{ user }}>
            <Sidebar />
        </UserProvider>
    );
};

test('renders user profile picture if available', () => {
    const mockUser = {
        profile_picture_url: 'https://placehold.co/600x400.png',
    };

    renderSidebarWithUser(mockUser);

    expect(screen.getByAltText('User Avatar')).toHaveAttribute('src', mockUser.profile_picture_url);
});

test('renders default avatar if no profile picture URL is available', () => {
    const mockUser = {
        profile_picture_url: null,
    };

    renderSidebarWithUser(mockUser);

    expect(screen.getByAltText('User Avatar')).toHaveClass('bg-white');
});

test('renders all sidebar icons', () => {
    const mockUser = { profile_picture_url: null };

    renderSidebarWithUser(mockUser);

    expect(screen.getByAltText('Home')).toBeInTheDocument();
    expect(screen.getByAltText('Documents')).toBeInTheDocument();
    expect(screen.getByAltText('Lamp')).toBeInTheDocument();
    expect(screen.getByAltText('Shield')).toBeInTheDocument();
    expect(screen.getByAltText('Settings')).toBeInTheDocument();
});
